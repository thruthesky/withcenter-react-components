"use client";

import { useEffect, useRef, useState } from "react";
import { getVertexAI, getGenerativeModel, GenerativeModel, ChatSession } from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSearchParams } from "next/navigation";
import {
  INVOICE_SCHEMA,
  // INVOICE_SCHEMA, 
  SYSTEM_INSTRUCTION,
} from "../config";

export default function ChatPage() {
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
        setPrompt(p);
        submitPrompt(p);
      }
      initialized.current = true;
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    console.log("Message sent:", message);

    setPrompt("");

    await submitPrompt(message);
  }

  async function submitPrompt(message: string) {
    setChunck("");
    // To generate text output, call generateContent with the text input
    const result = await chat.current.sendMessageStream(`
      ${message}

      <RECAP>
      Please always include the invoice in table format at the end. Also Suggested additional features for the app that are not in the invoice yet. Please use markdown format for the invoice. but dont add code block \'\'\'markdown"
      </RECAP>
      
      `);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      setChunck((v) => v + chunkText);
    }

    // const res = await result.response;
    // setResponse(res.text);
    // console.log("res::", res, "mark down::", prompt);
  }

  async function onPublish() {
    setResponse("");

    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
      }
    });


    console.log("publishInvoiceModel::", await chat.current.getHistory());
    const publishInvoiceChat = publishInvoiceModel.startChat({
      history: await chat.current.getHistory(),
    });
    const result = await publishInvoiceChat.sendMessage("Generate the invoice to parsable JSON with the project,invoice and total. Reply with just the JSON data. Do not include any other text. The invoice should be in a JSON format.");
    console.log("result::invoice", result);
    setResponse(result.response.text());
  }


  async function onPublishGenerateJson() {
    setJsonInvoice("");
    const history = await chat.current.getHistory();
    const lastMessage = history[history.length - 1].parts.reduce((acc, part) => acc + part.text, "");
    console.log("lastMessage::", lastMessage);
    const publishInvoiceModel = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: INVOICE_SCHEMA,
        // temperature: 0.1,
      }
    });
    const result = await publishInvoiceModel.generateContent(lastMessage);
    const res = result.response.text();
    console.log("res::", res);
    setJsonInvoice(res);
  }
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1>InvoiceGen</h1>
        <nav className="flex gap-3">
          <button className="button" onClick={onPublish}>Publish</button>

          <button className="button" onClick={onPublishGenerateJson}>JSON</button>
        </nav>
      </header>

      <section className="pt-4">
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
      </section>

      <article className="pt-6">
        {chunk && (
          <article className="pt-6">
            {/* <h2 className="h2">Chunk data</h2> */}
            <div className="prose prose-slate max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{chunk}</Markdown>
            </div>
          </article>)}
      </article>
      <article className="pt-6">
        {response && (
          <article className="pt-6">
            <h2 className="h2">Response data</h2>
            <div className="prose prose-slate max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
            </div>
          </article>)}
      </article>
      {jsonInvoice && (
        <article className="pt-6">
          <h2 className="h2">JSON data</h2>
          <div className="prose prose-slate max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{jsonInvoice}</Markdown>
          </div>
        </article>)}
    </>
  );
}
