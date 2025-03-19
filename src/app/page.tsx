"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  function openChat({ type }: { type: string }) {
    router.push("/chat?type=" + type);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt") as string;
    router.push(`/chat?ask=${prompt}`);
  }
  return (
    <>
      <h1>InvoiceGen AI</h1>
      <h2>Welcome Text</h2>

      <h3>What do you want to build?</h3>

      <h2>Choose what you want to build:</h2>

      <nav>
        <button onClick={() => openChat({ type: "social-app" })}>Social app</button>
        <button onClick={() => openChat({ type: "chat-app" })}>Chat app</button>
        <button onClick={() => openChat({ type: "shopping-mall-app" })}>Shopping mall</button>
        <button onClick={() => openChat({ type: "game-app" })}>Game app</button>
      </nav>

      <section className="mt-8">
        <h3 className="h3">Or write down your needs.</h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input name="prompt" type="text" placeholder="Write your needs here..." />
          <button>Send</button>
        </form>
      </section>
    </>
  );
}
