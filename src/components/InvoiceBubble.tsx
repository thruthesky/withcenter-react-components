import { ChatHistory } from "@/app/chat/chat.reducer";
import Markdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function InvoiceBubble({ content }: { content: ChatHistory }) {
  const components: Components = {
    button({ node, ...props }) {
      return (
        <button
          {...props}
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
          onClick={() => {
            console.log("Button clicked", props);
          }}
        >
          {props.children}
        </button>
      );
    },
  };

  const example = `
| Feature                    | Description                                                                                           | Amount      | Duration   | Actions                 |
| :------------------------- | :---------------------------------------------------------------------------------------------------- | :---------- | :--------- | :---------------------- |
| Sign up/Log in             | ID creation/login is possible, and ID/PW search is also included. (Can also be created in email format).| 1,500,000   | 22 days    | <button>Delete</button> |
| Post feed                  | Post screen similar to Instagram, Facebook, Kakao Story, Naver Band, etc.                           | 1,500,000   | 7 days     | <button>Delete</button> |
| Comment                    | When there is a function to comment on posts or items.                                               | 300,000     | 18 days    | <button>Delete</button> |
| Basic management screen    | Basic administrator screen for operating web/app services such as notices, banners, member management | 5,000,000   | 12 days    | <button>Delete</button> |
| Bulletin Board / Permissions | Implementation of community group entry, group bulletin board, and group permission consent functions. | 2,000,000   | 27 days    | <button>Delete</button> |
| **Total**                  |                                                                                                      | **11,300,000** | **86 days**  |                       |
`;

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
