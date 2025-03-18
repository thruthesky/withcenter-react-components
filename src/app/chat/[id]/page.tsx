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
    const result = await model.current.generateContent(message);

    const response = result.response;
    const text = response.text();
    console.log(text);
  }
  return (
    <>
      <p>Chat ID: {id}</p>
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
