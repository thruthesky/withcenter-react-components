import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>InvoiceGen AI</h1>
      <h2>Welcome Text</h2>
      <img src="/path/to/image.png" alt="Welcome Image" />
      <h3>What do you want to build?</h3>

      <h2>Choose what you want to build:</h2>
      <ul>
        <li>
          <Link href="/chat/chatgpt">ChatGPT</Link>
        </li>
        <li>
          <Link href="/chat/dalle">DALL·E</Link>
        </li>
        <li>
          <Link href="/chat/whisper">Whisper</Link>
        </li>
        <li>
          <Link href="/chat/text-to-speech">Text to Speech</Link>
        </li>
        <li>
          <Link href="/chat/text-to-image">Text to Image</Link>
        </li>
      </ul>
      <div>
        <button>Social app</button>
        <button>Chat app</button>
        <button>Shopping mall</button>
        <button>Game app</button>
      </div>
      <h3>Or write down your needs.</h3>
      <input type="text" placeholder="Write your needs here..." />
      <button>Send</button>
    </>
  );
}
