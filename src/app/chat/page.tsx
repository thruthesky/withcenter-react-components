"use client";

import React, { useEffect, useReducer, useRef } from "react";
import {
  getVertexAI,
  getGenerativeModel,
  GenerativeModel,
  ChatSession,
  Part,
  FileDataPart,
  FileData,
} from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import Spinner from "@/components/Spinner";
import { useDispatch } from "react-redux";
import { setInvoice } from "@/store/invoice.slice";
import {
  addChatHistory,
  addInvoiceChunk,
  addFile,
  analysisLoadingOn,
  ChatHistory,
  chatInitialState,
  chatReducer,
  loadingOff,
  loadingOn,
  removeFile,
  reset,
  resetInvoiceChunk,
  resetFiles,
  resetPrompt,
  setProgress,
  setPrompt,
  showAnalysis,
  hideAnalysis,
  analysisLoadingOff,
} from "./chat.reducer";
import UploadImageButton from "@/components/UploadImageButton";
import Image from "next/image";
import { getMimeType } from "@/lib/firebase/firebase.functions";
import { INVOICE_SCHEMA } from "@/config/schema";
import {
  IMAGE_AND_PDF_EXTRACTION_INSTRUCTION,
  SYSTEM_INSTRUCTION,
} from "@/config/instruction";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter();
  const storeDispatch = useDispatch();
  const [state, dispatch] = useReducer(chatReducer, chatInitialState);

  const params = useSearchParams();
  const type = params.get("type");
  const ask = params.get("ask");

  const model = useRef({} as GenerativeModel);
  const chat = useRef({} as ChatSession);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Initialize the generative model
      model.current = getGenerativeModel(getVertexAI(), {
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });
      chat.current = model.current.startChat();

      if (ask) {
        submitPrompt(ask);
      } else if (type) {
        const p = "I want to build a " + type;
        submitPrompt(p);
      }
      initialized.current = true;
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (!message && state.files.length == 0) return;
    // console.log("Message sent:", message);

    dispatch(resetPrompt());
    if (state.files.length > 0) {
      console.log("submitFilePrompt", message);
      await submitFilePrompt(message);
    } else {
      console.log("submitFilePrompt", message);
      await submitPrompt(message);
    }
  }

  async function submitFilePrompt(message: string): Promise<void> {
    dispatch(analysisLoadingOn());
    const userPrompt: ChatHistory = { role: "user", text: message };

    console.log("submitFilePrompt", userPrompt);

    const parts: Array<string | Part> = [
      `
      ${message}

      <RECAP>
      Extract the features from the image and pdf files.
      Analyze the image and pdf files section by section.
      Identify the purpose of each section and summarize its content.
      Look for any technical requirements, user needs, or design specifications mentioned in the document.
      If the image is like widget or UI, categorize the image and pdf files to what kind of widget or UI it is.
      If the image is a screenshot, identify the purpose of each section and summarize its content.
      If the image is a screenshot of another website, identify what are the features of the website.
      If the image is a screenshot of a UI, identify the purpose of each section and summarize its content.
      Provide a meaningful feature name and description for each feature.
      <RECAP/>
      `,
    ];

    for (const file of state.files) {
      parts.push({
        fileData: file,
      } as FileDataPart);
    }

    userPrompt.files = state.files;
    userPrompt.parts = parts;
    dispatch(addChatHistory(userPrompt));
    dispatch(resetFiles());

    const fileModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: IMAGE_AND_PDF_EXTRACTION_INSTRUCTION,
      // generationConfig: {
      //   responseMimeType: "application/json",
      //   responseSchema: FILE_EXTRACTION_SCHEMA,
      // },
    });
    const result = await fileModel.generateContent(parts);
    const resultText = result.response.text();
    console.log("res::", resultText);
    const filePrompt: ChatHistory = {
      role: "file",
      text: resultText,
      hide: true,
    };
    dispatch(addChatHistory(filePrompt));
    dispatch(analysisLoadingOff());

    // const result = await fileModel.generateContentStream(parts);
    // let fileModelRes = "";
    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   fileModelRes += chunkText;
    //   // console.log(chunkText);

    //   dispatch(addAnalyzeChunk(chunkText));
    // }
    // const filePrompt: ChatHistory = {
    //   role: "file",
    //   text: fileModelRes,
    //   hide: true,
    // };
    // dispatch(addChatHistory(filePrompt));
    // dispatch(resetAnalyzeChunk());
    // dispatch(analysisLoadingOff());

    await send(`
      ${resultText}

      <RECAP>
      Base from the information above, add related features to the invoice.
      If the features are already in the invoice, please ignore them.
      If the features are not in the invoice, please add them to the invoice.
      If the features has no related features, please add them to the invoice, but put (contact admin) in the price and duration.

      Base from the missing features look for the features that are not in the invoice and add them to the invoice.


      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"
      </RECAP>
      `);
  }

  async function submitPrompt(message: string): Promise<void> {
    const userPrompt: ChatHistory = { role: "user", text: message };
    dispatch(addChatHistory(userPrompt));
    const request: string = `
      ${message}
      <RECAP>
      You should base your answer from the given <DATA>.
      Dont add any random price, duration and pages to features that are not available in the <DATA>. Instead if <DATA> has no information about the features, add the features to invoice and put (contact admin) in the price,duration and pages.
      
      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"
      </RECAP>
      `;
    await send(request);
  }

  async function send(request: string): Promise<void> {
    const result = await chat.current.sendMessageStream(request);
    let modelRes = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      modelRes += chunkText;
      // console.log(chunkText);

      dispatch(addInvoiceChunk(chunkText));
    }

    dispatch(resetInvoiceChunk());
    dispatch(addChatHistory({ role: "model", text: modelRes }));
  }

  async function getFinalizeInvoice(): Promise<string> {
    // To generate text output, call generateContent with the text input
    const finalizedInvoiceChat = model.current.startChat({
      history: await chat.current.getHistory(),
    });

    const result = await finalizedInvoiceChat.sendMessage(`
      Finalized the invoice in table format. You should base your answer from the given <DATA>. If <DATA> has no information about the features, add the features to invoice and put (contact admin) in the price,duration,pages. Total the price, duration and pages that has valid data. Please use markdown format for the invoice. but dont add code block \'\'\'markdown".
      `);

    return result.response.text();
  }

  async function onPublish() {
    dispatch(loadingOn());
    const finalizedInvoice = await getFinalizeInvoice();
    console.log("finalized::", finalizedInvoice);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
      },
    });
    const result = await publishInvoiceModel.generateContent(`
      ${finalizedInvoice}

      <RECAP>
      Please generate the invoice in JSON format. If the data is incomplete, please put (contact admin) in the price,duration,pages and for category you can put *Request*. Total the price, duration and pages that has valid data.
      <RECAP/>
      `);
    const res = result.response.text();
    console.log("res::", res);
    storeDispatch(setInvoice(JSON.parse(res)));
    /// set history for edit

    dispatch(loadingOff());
    router.push("/invoice");
  }

  async function onReset(): Promise<void> {
    dispatch(reset());
    chat.current = model.current.startChat();
  }

  async function handleDeleteImage(file: FileData) {
    // console.log("handleDeleteImage", image);
    const res = confirm(`Delete uploaded image?`);
    if (!res) return;
    dispatch(removeFile(file));
  }
  return (
    <section className="h-screen flex flex-col gap-4">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1>InvoiceGen</h1>
        <nav className="flex gap-3">
          <button className="button" onClick={onReset}>
            Reset
          </button>
          <button className="button" onClick={onPublish}>
            {state.loading ? <Spinner /> : "Publish"}
          </button>
        </nav>
      </header>
      <section className={`p-5 ${styles.chatMessages}`}>
        {state.analysisLoading && (
          <article className={`flex flex-col items-end`}>
            <h3 className={`flex text-sm text-gray-500`}>Analyzing...</h3>
            <section className="flex">
              <data className="bg-yellow-100 w-11/12 p-4 rounded-md mb-4 flex items-center">
                {/* <Markdown remarkPlugins={[remarkGfm]}>
                  {state.analyzeChunck}
                </Markdown> */}
                <Spinner />
              </data>
            </section>
          </article>
        )}
        {state.invoiceChunck && (
          <article className={`flex flex-col`}>
            <h3 className={`flex text-sm text-gray-500 `}>Invoice AI</h3>
            <section className="flex">
              <data className="bg-green-100 w-11/12 p-4 rounded-md mb-4">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {state.invoiceChunck}
                </Markdown>
                <Spinner />
              </data>
            </section>
          </article>
        )}
        {state.history.length > 0 &&
          state.history.map((content: ChatHistory, index) => (
            <article key={index} className={`flex flex-col`}>
              <h3
                className={`flex text-sm text-gray-500 ${
                  (content.role === "user" || content.role === "file") &&
                  " justify-end"
                }`}
              >
                {content.role === "user"
                  ? "You"
                  : content.role === "file"
                  ? "Extract AI"
                  : "Invoice AI"}
              </h3>
              <section
                className={`flex ${
                  (content.role === "user" || content.role === "file") &&
                  " justify-end"
                }`}
              >
                <data
                  className={`${
                    content.role === "user"
                      ? "bg-blue-100 max-w-11/12"
                      : content.role === "file"
                      ? "bg-yellow-100 max-w-11/12 flex items-end flex-col"
                      : "bg-green-100 w-11/12"
                  } p-4 rounded-md mb-4`}
                >
                  {content.role === "file" && (
                    <button
                      className="text-sm"
                      onClick={() => {
                        dispatch(
                          content.hide
                            ? hideAnalysis(index)
                            : showAnalysis(index)
                        );
                      }}
                    >
                      {content.hide ? "Show" : "Hide"}
                    </button>
                  )}
                  <article
                    className={`${
                      content.role === "file" && content.hide
                        ? "hidden"
                        : "flex flex-col"
                    }`}
                  >
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {content.text}
                    </Markdown>
                  </article>

                  {content.files &&
                    content.files.map((file, i) => (
                      <React.Fragment key={i}>
                        {file.mimeType.startsWith("image/") && (
                          <Image
                            src={file.fileUri}
                            width={154}
                            height={154}
                            alt="Upload"
                            className="w-auto h-full"
                            style={{ width: "auto", height: "auto" }}
                          />
                        )}
                        {file.mimeType.endsWith("/pdf") && (
                          <section className="flex flex-col items-center justify-center w-24 h-24 border rounded-md">
                            <Link href={file.fileUri} target="_blank">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                                />
                              </svg>{" "}
                              PDF File
                            </Link>
                          </section>
                        )}
                      </React.Fragment>
                    ))}
                </data>
              </section>
            </article>
          ))}
      </section>
      {state.files && state.files.length > 0 && (
        <section className="flex flex-wrap justify-end gap-3 px-5">
          {state.files.map((file, index) => (
            <data
              key={"imageUrls" + index}
              className="relative flex min-w-24 min-h-24"
            >
              <button
                onClick={() => handleDeleteImage(file)}
                className="absolute top-0 right-0 p-2 cursor-pointer "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              {file.mimeType.startsWith("image/") && (
                <Image
                  src={file.fileUri}
                  width={154}
                  height={154}
                  alt="Upload"
                  className="w-auto h-full"
                  style={{ width: "auto", height: "auto" }}
                />
              )}
              {file.mimeType.endsWith("/pdf") && (
                <section className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                    />
                  </svg>
                </section>
              )}
            </data>
          ))}
        </section>
      )}
      <footer className="px-5 pt-3 pb-15">
        {state.progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
              style={{
                width: (state.progress > 20 ? state.progress : 20) + "%",
              }}
            ></div>
          </div>
        )}
        <form className="flex gap-3" onSubmit={onSubmit}>
          <UploadImageButton
            onUpload={async (url) => (
              console.log("onUpload", url),
              dispatch(
                addFile({
                  fileUri: url,
                  mimeType: (await getMimeType(url)) ?? "",
                })
              )
            )}
            progress={(percent) => {
              // console.log("progress", percent);
              dispatch(setProgress(percent));
            }}
            // accept="image/png, image/jpeg, image/jpg, application/pdf"
            accept=""
          />
          <input
            name="message"
            className="border border-slate-400 p-2 rounded-md w-full"
            type="text"
            placeholder="Type your message here..."
            // onChange={(e) => setPrompt(e.target.value)}
            onChange={(e) => dispatch(setPrompt(e.target.value))}
            value={state.prompt}
          />

          <button type="submit" className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </footer>
    </section>
  );
}
