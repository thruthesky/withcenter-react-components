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
  analysisLoadingOn,
  analysisLoadingOff,
  setDragging,
} from "./chat.reducer";
import UploadImageButton from "@/components/UploadImageButton";
import { FileUploadData, uploadFiles } from "@/lib/firebase/firebase.functions";
import { INVOICE_SCHEMA } from "@/config/schema";
import {
  IMAGE_AND_PDF_EXTRACTION_INSTRUCTION,
  SYSTEM_INSTRUCTION,
} from "@/config/instruction";
import Link from "next/link";
import InvoiceBubble from "@/components/InvoiceBubble";
import UserBubble from "@/components/UserBubble";
import ExtractAIBubble from "@/components/ExtractAIBubble";
import UploadedChatFiles from "@/components/UploadedChatFiles";

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

  const newGeminiModel = "gemini-2.5-pro-exp-03-25";
  // const oldGeminiModel = "gemini-2.0-flash";

  useEffect(() => {
    if (!initialized.current) {
      // Initialize the generative model
      model.current = getGenerativeModel(getVertexAI(), {
        model: newGeminiModel,
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
      // console.log("submitFilePrompt", message);
      await submitFilePrompt(message);
    } else {
      // console.log("submitFilePrompt", message);
      await submitPrompt(message);
    }
  }

  async function submitFilePrompt(message: string): Promise<void> {
    dispatch(analysisLoadingOn());
    const userPrompt: ChatHistory = { role: "user", text: message };

    // console.log("submitFilePrompt", userPrompt);

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

    for (const file of state.files as FileUploadData[]) {
      parts.push({
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.fileUri,
        } as FileData,
      } as FileDataPart);
    }

    userPrompt.files = state.files;
    userPrompt.parts = parts;
    dispatch(addChatHistory(userPrompt));
    dispatch(resetFiles());

    const fileModel = getGenerativeModel(getVertexAI(), {
      model: newGeminiModel,
      systemInstruction: IMAGE_AND_PDF_EXTRACTION_INSTRUCTION,
      // generationConfig: {
      //   responseMimeType: "application/json",
      //   responseSchema: FILE_EXTRACTION_SCHEMA,
      // },
    });
    const result = await fileModel.generateContent(parts);
    const resultText = result.response.text();
    // console.log("res::", resultText);
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


      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block e.g. <pre>, <code> \'\'\'markdown"
      Also make sure that the price is in KRW
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

  async function onDeleteFeature(feature: string): Promise<void> {
    const userPrompt: ChatHistory = {
      role: "user",
      text: "Deleting the feature . . .",
    };
    dispatch(addChatHistory(userPrompt));

    console.log("onDeleteFeature", feature);

    const request: string = `
      Delete the feature: ${feature} from the invoice.

      <RECAP>
      You should base your answer from the given <DATA>.
      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"
      If the feature is not in the invoice, please ignore it.
      If the feature is deleted recently, tell the user that the feature is deleted recently.
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

  /*
  * 
  *
  */

  async function onPublish() {
    dispatch(loadingOn());
    const finalizedInvoice = await getFinalizeInvoice();
    // console.log("finalized::", finalizedInvoice);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: newGeminiModel,
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

  async function handleDeleteImage(file: FileUploadData) {
    // console.log("handleDeleteImage", image);
    const res = confirm(`Delete uploaded image?`);
    if (!res) return;
    dispatch(removeFile(file));
  }

  function handleDropFiles(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(setDragging(false));
    console.log(e.dataTransfer.files);
    const files = Array.from(e.dataTransfer.files);

    uploadFiles(files, {
      onUpload: (data) => {
        dispatch(addFile(data));
      },
      progress: (percent) => {
        dispatch(setProgress(percent));
      },
    });
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(setDragging(true));
  }

  function handleDragLeave(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(setDragging(false));
  }

  return (
    <section className="h-screen flex flex-col gap-4">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1>
          <Link href="/">InvoiceGen</Link>
        </h1>
        <nav className="flex gap-3">
          <button className="button" onClick={onReset}>
            Reset
          </button>
          <button className="button" onClick={onPublish}>
            {state.loading ? <Spinner /> : "Publish"}
          </button>
        </nav>
      </header>
      <section
        className={`p-5 relative ${styles.chatMessages}`}
        onDrop={(e) => handleDropFiles(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        {state.dragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-75 z-10 h-full w-full">
            <p className="text-blue-500 font-bold text-lg">
              Add files or photos here
            </p>
          </div>
        )}
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
            <React.Fragment key={index}>
              {content.role === "user" && <UserBubble content={content} />}
              {content.role === "model" && (
                <InvoiceBubble
                  content={content}
                  onDeleteFeature={onDeleteFeature}
                />
              )}
              {content.role === "file" && (
                <ExtractAIBubble
                  content={content}
                  onClick={() => {
                    // console.log("onClick", content.hide);
                    dispatch(
                      content.hide ? hideAnalysis(index) : showAnalysis(index)
                    );
                  }}
                />
              )}
            </React.Fragment>
          ))}
      </section>
      <UploadedChatFiles files={state.files} onDelete={handleDeleteImage} />
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
            onUpload={async (data) => dispatch(addFile(data))}
            progress={(percent) => {
              // console.log("progress", percent);
              dispatch(setProgress(percent));
            }}
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



