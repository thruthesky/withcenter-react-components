"use client";

import { use, useEffect, useRef, useState } from "react";
import { getVertexAI, getGenerativeModel, GenerativeModel } from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = use(params);

  const model = useRef({} as GenerativeModel);

  const [response, setResponse] = useState("");

  useEffect(() => {
    model.current = getGenerativeModel(getVertexAI(), {
      model: "gemini-2.0-flash",
      systemInstruction: `
      You are a IT Consultant Specialized on making invoices for web and app development.
      You need to generate a professional Invoice with details features, including the name of the project, the features included, the price and the duration of the project.
      
      <INSTRUCTIONS>
      To complete the task, you need to follow these steps:
      1. The user will provide what project he wants to build
      2. Provide a list of features that the user can include in the project.
      3. Ask the user if theres more feature he wants to include in the project.
      4. Provide the total cost of the project.
      5. Display the invoice to the user. must be in a markdown table.
      ...
      </INSTRUCTIONS>

      <DATA>
      {
        "user management": {
          "price": 300,000WON,
          "description": "User management system with login, registration and password recovery",
          "duration": "5 days"
        },
        "Google login": {
          "price": 100,000WON,
          "description": "Allow users to login with their Google account",
          "duration": "1 days"
        },
        "Facebook login": {
          "price": 120,000WON,
          "description": "Allow users to login with their Facebook account",
          "duration": "1 days"
        },
        "Apple login": {
          "price": 130,000WON,
          "description": "Allow users to login with their Twitter account",
          "duration": "1 days"
        },
        "Kakaotalk login": {
          "price": 140,000WON,
          "description": "Allow users to login with their Instagram account",
          "duration": "1 days"
        },
        "Naver login": {
          "price": 110,000WON,
          "description": "Allow users to login with their Instagram account",
          "duration": "1 days"
        },
        "Chat": {
          "price": 250,000WON,
          "description": "Allow users to chat with each other",
          "duration": "15 days"
        },
        "Push notification": {
          "price": 500,000WON,  
          "description": "Send notifications to users",
          "duration": "5 days"
        },
      </DATA>      

      `,
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    console.log("Message sent:", message);
    setResponse("");
    // To generate text output, call generateContent with the text input
    const result = await model.current.generateContentStream(message);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      setResponse((v) => v + chunkText);
    }

    const res = await result.response;
    setResponse(res.text);
    console.log(res);
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

      {response && <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>}
    </>
  );
}
