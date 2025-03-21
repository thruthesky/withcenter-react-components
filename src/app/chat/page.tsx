"use client";

import { useEffect, useRef, useState } from "react";
import { getVertexAI, getGenerativeModel, GenerativeModel, ChatSession } from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter, useSearchParams } from "next/navigation";

import {
  INVOICE_SCHEMA,
  SYSTEM_INSTRUCTION,
} from "../config";

import styles from "./page.module.css";
import { useInvoiceSetData } from "@/components/ContextProvider";
import Spinner from "@/components/Spinner";


interface ChatHistory {
  role: string;
  text: string;
}

export default function ChatPage() {
  const router = useRouter();
  const setInvoice = useInvoiceSetData();

  const params = useSearchParams();
  const type = params.get("type");
  const ask = params.get("ask");

  const [prompt, setPrompt] = useState("");
  const model = useRef({} as GenerativeModel);

  const chat = useRef({} as ChatSession);
  const [chunk, setChunck] = useState("");
  const [response, setResponse] = useState("");
  const [jsonInvoice, setJsonInvoice] = useState("");

  const initialized = useRef(false);

  const [history, setHistory] = useState<ChatHistory[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      // Initialize the generative model
      model.current = getGenerativeModel(getVertexAI(), {
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });
      chat.current = model.current.startChat();


      if (ask) {
        console.log("ask::", ask);
        submitPrompt(ask);
      } else if (type) {
        const p = "I want to build a " + type;
        console.log("type::", p);
        // setPrompt(p);
        submitPrompt(p);
      }
      initialized.current = true;
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    console.log("Message sent:", message);

    setPrompt("");

    await submitPrompt(message);
  }

  async function submitPrompt(message: string): Promise<void> {
    setChunck("");
    // To generate text output, call generateContent with the text input
    const userPrompt: ChatHistory = { role: "user", text: message };
    setHistory((v) => [userPrompt, ...v]);
    const result = await chat.current.sendMessageStream(`
      ${message}
      <RECAP>
      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"
      </RECAP>
      `);
    let modelRes = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      modelRes += chunkText;
      console.log(chunkText);
      setChunck((v) => v + chunkText);
    }
    setChunck('');
    setHistory((v) => [{ role: "model", text: modelRes }, ...v]);
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

  async function onGenerateJson(): Promise<void> {
    setJsonInvoice("");
    // const history = await chat.current.getHistory();
    // const lastMessage = history[history.length - 1].parts.reduce((acc, part) => acc + part.text, "");
    // console.log("lastMessage::", lastMessage);

    const finalizedInvoice = await getFinalizeInvoice();
    console.log("finalized::", finalizedInvoice);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
      }
    });
    const result = await publishInvoiceModel.generateContent(finalizedInvoice);
    const res = result.response.text();
    console.log("res::", res);
    setJsonInvoice(res);
  }

  async function onPublish() {
    setLoading(true);
    const finalizedInvoice = await getFinalizeInvoice();
    console.log("finalized::", finalizedInvoice);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
      }
    });
    const result = await publishInvoiceModel.generateContent(finalizedInvoice);
    const res = result.response.text();
    console.log("res::", res);
    setInvoice(res);
    setLoading(false);
    router.push('/invoice');
  }

  async function onReset(): Promise<void> {
    setResponse("");
    setChunck("");
    setHistory([]);
    setPrompt("");
    setJsonInvoice("");
    chat.current = model.current.startChat();
    console.log("chat::", await chat.current.getHistory());
  }
  return (
    <section className="h-screen flex flex-col gap-4">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1>InvoiceGen</h1>
        <nav className="flex gap-3">

          <button className="button" onClick={onReset}>Reset</button>

          <button className="button" onClick={onGenerateJson}>Get JSON</button>

          <button className="button" onClick={onPublish}>{loading ? <Spinner /> : 'Publish'}</button>

        </nav>
      </header>
      <section className={`p-5 ${styles.chatMessages}`}>
        {jsonInvoice && (
          <data className="pt-6">
            <h2 className="h2">JSON data</h2>
            <div className="max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{jsonInvoice}</Markdown>
            </div>
          </data>)}
        {response && (
          <article className="pt-6">
            <h2 className="h2">Response data</h2>
            <div className="max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
            </div>
          </article>)}

        {chunk && (
          <article className={`flex flex-col`}>
            <h3 className={`flex text-sm text-gray-500 `}>Ai</h3>
            <section className="flex" >
              <data className="bg-green-100 w-11/12 p-4 rounded-md mb-4">
                <Markdown remarkPlugins={[remarkGfm]}>{chunk}</Markdown>
                <Spinner />
              </data>
            </section>
          </article>)}
        {
          history.length > 0 && history.map((content, index) => (
            <article key={index} className={`flex flex-col`}>
              <h3 className={`flex text-sm text-gray-500 ${content.role === "user" && " justify-end"}`}>{content.role === "user" ? "You" : "Ai"}</h3>
              <section className={`flex  ${content.role === "user" && " justify-end"}`} >
                <data className={`${content.role === "user" ? "bg-blue-100 max-w-11/12" : "bg-green-100 w-11/12"} p-4 rounded-md mb-4`}>
                  <Markdown remarkPlugins={[remarkGfm]}>{content.text}</Markdown>
                </data>
              </section>
            </article>
          ))
        }

      </section>
      <footer className="px-5 pt-3 pb-15">
        <form onSubmit={onSubmit}>
          <input
            name="message"
            className="border border-slate-400 p-2 rounded-md w-full"
            type="text"
            placeholder="Type your message here..."
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </form>
      </footer>

    </section>
  );
}
