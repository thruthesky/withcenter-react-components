import Link from "next/link";

export default function Home() {
  return (
    <>
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
    </>
  );
}
