"use client";

import { use, useEffect, useRef, useState } from "react";
import {
  getVertexAI,
  getGenerativeModel,
  GenerativeModel,
  ChatSession,
} from "firebase/vertexai";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function ChatPage({
  params,
}: Readonly<{
  params: Promise<{
    id: string;
  }>;
}>) {
  const { id } = use(params);
  const [prompt, setPrompt] = useState("");
  const model = useRef({} as GenerativeModel);

  const chat = useRef({} as ChatSession);

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
      6. If "PUBLISH INVOICE" is mentioned, response in json format with the invoice details.
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
        "to_do_list_app": {
    "price": "100,000 WON",
    "description": "A simple task manager with CRUD operations",
    "duration": "3 days"
  },
  "weather_app": {
    "price": "150,000 WON",
    "description": "Fetch and display weather data using an API",
    "duration": "4 days"
  },
  "calculator_app": {
    "price": "80,000 WON",
    "description": "A basic arithmetic calculator with a clean UI",
    "duration": "2 days"
  },
  "blog_website": {
    "price": "200,000 WON",
    "description": "A simple blog with post creation and comments",
    "duration": "5 days"
  },
  "recipe_app": {
    "price": "180,000 WON",
    "description": "A collection of recipes with search and filter functionality",
    "duration": "4 days"
  },
  "expense_tracker": {
    "price": "250,000 WON",
    "description": "Track daily expenses with a summary dashboard",
    "duration": "6 days"
  },
  "qr_code_generator": {
    "price": "120,000 WON",
    "description": "Generate QR codes for links or text input",
    "duration": "3 days"
  },
  "portfolio_website": {
    "price": "220,000 WON",
    "description": "A personal portfolio with projects and contact info",
    "duration": "5 days"
  },
  "e_commerce_website": {
    "price": "500,000 WON",
    "description": "A basic store with product listings, cart, and checkout",
    "duration": "10 days"
  },
  "chat_app": {
    "price": "400,000 WON",
    "description": "Real-time messaging with Firebase or WebSockets",
    "duration": "8 days"
  },
  "news_aggregator": {
    "price": "300,000 WON",
    "description": "Pull news from APIs and display by category",
    "duration": "7 days"
  },
  "habit_tracker": {
    "price": "280,000 WON",
    "description": "Track daily habits and show progress visually",
    "duration": "6 days"
  },
  "movie_database_app": {
    "price": "350,000 WON",
    "description": "Fetch movie data from an API and allow user ratings",
    "duration": "7 days"
  },
  "event_booking_app": {
    "price": "450,000 WON",
    "description": "Book and manage events with seat selection",
    "duration": "9 days"
  },
  "fitness_tracker": {
    "price": "400,000 WON",
    "description": "Log workouts, set goals, and visualize progress",
    "duration": "8 days"
  },
  "online_quiz_app": {
    "price": "300,000 WON",
    "description": "A trivia quiz with a timer and scoring system",
    "duration": "6 days"
  },
  "ai_powered_chatbot": {
    "price": "700,000 WON",
    "description": "A chatbot that uses NLP for customer service",
    "duration": "12 days"
  },
  "stock_market_tracker": {
    "price": "600,000 WON",
    "description": "Display real-time stock data with historical charts",
    "duration": "10 days"
  },
  "social_media_platform": {
    "price": "1,200,000 WON",
    "description": "Users can post, like, comment, and follow others",
    "duration": "20 days"
  },
  "task_management_app": {
    "price": "900,000 WON",
    "description": "Drag-and-drop task management with team collaboration",
    "duration": "15 days"
  },
  "streaming_service": {
    "price": "1,500,000 WON",
    "description": "A video/audio streaming platform with user subscriptions",
    "duration": "25 days"
  },
  "real_estate_app": {
    "price": "1,000,000 WON",
    "description": "List, filter, and book real estate properties",
    "duration": "18 days"
  },
  "ai_powered_resume_builder": {
    "price": "800,000 WON",
    "description": "Generate resumes based on user input and AI suggestions",
    "duration": "14 days"
  },
  "virtual_classroom": {
    "price": "1,300,000 WON",
    "description": "Online learning platform with video calls and quizzes",
    "duration": "22 days"
  }
      </DATA>      

      `,
    });
    chat.current = model.current.startChat();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    console.log("Message sent:", message);
    setResponse('');
    setPrompt('');
    // To generate text output, call generateContent with the text input
    const result = await chat.current.sendMessageStream(message);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      setResponse((v) => v + chunkText);
    }


    const res = await result.response;
    setResponse(res.text);
    console.log(res, prompt);
  }
  return (
    <>
      <h2>Chat Page</h2>
      <p>Chat ID: {id}</p>
      <p>Chat Name: {id}</p>
      <p>Chat Type: {id}</p>

      <form onSubmit={onSubmit}>
        <input
          name="message"
          className="border border-slate-400 p-2 rounded-md w-full"
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
      </form>

      {response && <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>}


    </>
  );
}
