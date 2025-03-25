"use client";

import { useEffect, useReducer, useRef } from "react";
import {
  getVertexAI,
  getGenerativeModel,
  GenerativeModel,
  ChatSession,
  Part,
  FileDataPart,
} from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter, useSearchParams } from "next/navigation";

import { INVOICE_SCHEMA, SYSTEM_INSTRUCTION } from "../config";

import styles from "./page.module.css";
import Spinner from "@/components/Spinner";
import { useDispatch } from "react-redux";
import { setInvoice } from "@/store/invoice.slice";
import {
  addChatHistory,
  addChunk,
  addImageUrl,
  ChatHistory,
  chatInitialState,
  chatReducer,
  loadingOff,
  loadingOn,
  removeImageUrl,
  reset,
  resetChunk,
  resetImageUrls,
  resetPrompt,
  setProgress,
  setPrompt,
} from "./chat.reducer";
import UploadImageButton from "@/components/UploadImageButton";
import Image from "next/image";
import { getMimeType } from "@/lib/firebase/firebase.functions";

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

    // console.log("Message sent:", message);

    dispatch(resetPrompt());
    await submitPrompt(message);
  }

  async function submitPrompt(message: string): Promise<void> {
    dispatch(resetChunk());
    // To generate text output, call generateContent with the text input
    const userPrompt: ChatHistory = { role: "user", text: message };

    const parts: Array<string | Part> = [
      `
      ${message}
      <RECAP>
      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"


      If theres any images please identify what the image is about and look for related features and add them to the invoice.
      If the image is about chat screenshots, please add chat features to the invoice.
      If the image is about a website, please add website features to the invoice.
      If the image is about a mobile app, please add mobile app features to the invoice.
      If the image is about a game, please add game features to the invoice.
      If the image is about a fitness app, please add fitness app features to the invoice.
      If the image is about a shopping mall, please add shopping mall features to the invoice.
      If the image is about a forum, please add forum features to the invoice.
      If the image is about a social media, please add social media features to the invoice.
      If the image is about a blog, please add blog features to the invoice. 
      </RECAP>
      `,
    ];

    if (state.imageUrls && state.imageUrls.length > 0) {
      userPrompt.imageUrls = state.imageUrls;
      console.log("state.imageUrls.forEach1", parts);
      // state.imageUrls.forEach(async (url) => {
      //   const storageRef = ref(getStorage(), url);
      //   const meta = await getMetadata(storageRef);
      //   parts.push({
      //     fileData: {
      //       mimeType: meta.contentType,
      //       fileUri: url,
      //     },
      //   } as FileDataPart);
      // });

      for (const url of state.imageUrls) {
        parts.push({
          fileData: {
            mimeType: await getMimeType(url),
            fileUri: url,
          },
        } as FileDataPart);
        // console.log("state.imageUrls.forEach", url);
        console.log("state.imageUrls.forEach", parts);
      }

      console.log("state.imageUrls.forEach2", parts);
      dispatch(resetImageUrls());
    }
    userPrompt.parts = parts;
    dispatch(addChatHistory(userPrompt));
    console.log("parts3::", parts);
    const result = await chat.current.sendMessageStream(parts);
    let modelRes = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      modelRes += chunkText;
      // console.log(chunkText);

      dispatch(addChunk(chunkText));
    }
    console.log(
      "sendMessageStream::gethistory",
      await chat.current.getHistory()
    );

    dispatch(resetChunk());
    dispatch(addChatHistory({ role: "model", text: modelRes }));
  }

  async function getFinalizeInvoice(): Promise<string> {
    // To generate text output, call generateContent with the text input
    const finalizedInvoiceChat = model.current.startChat({
      history: await chat.current.getHistory(),
    });

    const result = await finalizedInvoiceChat.sendMessage(`
      Finalized the invoice in table format. Please use markdown format for the invoice. but dont add code block \'\'\'markdown".
      `);

    return result.response.text();
  }

  async function onPublish() {
    dispatch(loadingOn());
    const finalizedInvoice = await getFinalizeInvoice();
    // console.log("finalized::", finalizedInvoice);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
      },
    });
    const result = await publishInvoiceModel.generateContent(finalizedInvoice);
    const res = result.response.text();
    // console.log("res::", res);
    storeDispatch(setInvoice(JSON.parse(res)));
    /// set history for edit

    dispatch(loadingOff());
    router.push("/invoice");
  }

  async function onReset(): Promise<void> {
    dispatch(reset());
    chat.current = model.current.startChat();
    // console.log("chat::", await chat.current.getHistory());
  }

  async function handleDeleteImage(image: string) {
    // console.log("handleDeleteImage", image);
    const res = confirm(`Delete uploaded image?`);
    if (!res) return;
    dispatch(removeImageUrl(image));
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
        {state.chunk && (
          <article className={`flex flex-col`}>
            <h3 className={`flex text-sm text-gray-500 `}>Ai</h3>
            <section className="flex">
              <data className="bg-green-100 w-11/12 p-4 rounded-md mb-4">
                <Markdown remarkPlugins={[remarkGfm]}>{state.chunk}</Markdown>
                <Spinner />
              </data>
            </section>
          </article>
        )}
        {state.history.length > 0 &&
          state.history.map((content, index) => (
            <article key={index} className={`flex flex-col`}>
              <h3
                className={`flex text-sm text-gray-500 ${
                  content.role === "user" && " justify-end"
                }`}
              >
                {content.role === "user" ? "You" : "Ai"}
              </h3>
              <section
                className={`flex  ${content.role === "user" && " justify-end"}`}
              >
                <data
                  className={`${
                    content.role === "user"
                      ? "bg-blue-100 max-w-11/12"
                      : "bg-green-100 w-11/12"
                  } p-4 rounded-md mb-4`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {content.text}
                  </Markdown>
                </data>
              </section>
            </article>
          ))}
      </section>
      {state.imageUrls && state.imageUrls.length > 0 && (
        <section className="flex flex-wrap justify-end gap-3">
          {state.imageUrls.map((image, index) => (
            <data key={"imageUrls" + index} className="relative flex">
              <button
                onClick={() => handleDeleteImage(image)}
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
              <Image
                src={image}
                width={154}
                height={154}
                alt="Upload"
                className="w-auto h-full"
                style={{ width: "auto", height: "auto" }}
              />
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
            onUpload={(url) => (
              console.log("onUpload", url), dispatch(addImageUrl(url))
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
