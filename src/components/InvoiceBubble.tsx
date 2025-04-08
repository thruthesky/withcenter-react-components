import { ChatHistory } from "@/app/chat/chat.reducer";
import Markdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function InvoiceBubble({
  content,
  onDeleteFeature,
}: {
  content: ChatHistory;
  onDeleteFeature: (feature: string) => void;
}) {
  const components: Components = {
    button({ ...props }: { "data-feature"?: string; children?: React.ReactNode }) {
      const { "data-feature": dataFeature, children } = props; 
      return (
        <button
          data-feature={dataFeature}
          className="button"
          onClick={() => onDeleteFeature(dataFeature || "")}
        >
          {children}
        </button>
      );
    },
  };

  return (
    <article className={`flex flex-col`}>
      <h3 className={`flex text-sm text-gray-500}`}>Invoice AI</h3>
      <section className="flex">
        <data className={`bg-green-100 w-11/12 p-4 rounded-md mb-4`}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {content.text}
          </Markdown>
        </data>
      </section>
    </article>
  );
}
