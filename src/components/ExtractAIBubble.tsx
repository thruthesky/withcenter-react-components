import { ChatHistory } from "@/app/chat/chat.reducer";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ExtractAIBubble({
  content,
  onClick,
}: {
  content: ChatHistory;
  onClick: () => void;
}) {
  return (
    <article className={`flex flex-col`}>
      <h3 className="flex text-sm text-gray-500 justify-end">Extract AI</h3>
      <section className="flex justify-end">
        <data className="bg-yellow-100 max-w-11/12 flex items-end flex-col p-4 rounded-md mb-4">
          <button className="text-sm" onClick={onClick}>
            {content.hide ? "Show" : "Hide"}
          </button>
          <article className={`${content.hide ? "hidden" : "flex flex-col"}`}>
            <Markdown remarkPlugins={[remarkGfm]}>{content.text}</Markdown>
          </article>
        </data>
      </section>
    </article>
  );
}
