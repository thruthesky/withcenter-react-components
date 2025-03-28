import { ChatHistory } from "@/app/chat/chat.reducer";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function InvoiceBubble({ content }: { content: ChatHistory }) {
  return (
    <article className={`flex flex-col`}>
      <h3 className={`flex text-sm text-gray-500}`}>Invoice AI</h3>
      <section className="flex">
        <data className={`bg-green-100 w-11/12 p-4 rounded-md mb-4`}>
          <Markdown remarkPlugins={[remarkGfm]}>{content.text}</Markdown>
        </data>
      </section>
    </article>
  );
}
