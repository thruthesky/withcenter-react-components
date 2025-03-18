"use client";

import { use, useRef } from "react";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

export default function ChatPage({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = use(params);

  const model = useRef(getGenerativeModel(getVertexAI(), { model: "gemini-2.0-flash" }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    console.log("Message sent:", message);
    // To generate text output, call generateContent with the text input
    const result = await model.current.generateContent(message);

    const response = result.response;
    const text = response.text();
    console.log(text);
  }
  return (
    <>
      <h2>Chat Page</h2>
      <p>Chat ID: {id}</p>
      <p>Chat Name: {id}</p>
      <p>Chat Type: {id}</p>

      <form onSubmit={onSubmit}>
        <input
          name="message"
          className="border border-slate-400 p-2 rounded-md w-full"
          type="text"
          placeholder="Type your message here..."
        />
      </form>
    </>
  );
}
