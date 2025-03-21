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
    <section >
      <header className="flex justify-start gap-5 items-center p-4 bg-gray-800 text-white" >
        <h1>InvoiceGen</h1>
      </header >
      <section className="flex flex-col gap-5 p-5">
        <h2>Welcome to InvoiceGen</h2>

        <h3>What do you want to build?</h3>

        <h2>Choose what you want to build:</h2>

        <nav className="flex gap-3">
          <button onClick={() => openChat({ type: "forum-app" })}>forum app</button>
          <button onClick={() => openChat({ type: "chat-app" })}>Chat app</button>
          <button onClick={() => openChat({ type: "shopping-mall-app" })}>Shopping mall</button>
          <button onClick={() => openChat({ type: "game-app" })}>Game app</button>
          <button onClick={() => openChat({ type: "fitness-app" })}>Fitness app</button>
        </nav>

        <section className="mt-12">
          <h3 className="h3">Or write down your needs.</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input name="prompt" type="text" placeholder="Write your needs here..." />
            <button>Send</button>
          </form>
        </section>
      </section>
    </section >
  );
}
