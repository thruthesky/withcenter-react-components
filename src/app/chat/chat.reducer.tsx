export interface ChatHistory {
  role: string;
  text: string;
  imageUrls?: string[];
}

export interface State {
  history: ChatHistory[];
  loading: boolean;
  chunk: string;
  prompt: string;
  imageUrls: string[];
  progress: number;
}

// interface ChatAction {
//   type: | "addChunk" | "setLoading" | "setPrompt" | "addChatHistory" | "reset";
//   chunk?: string;
//   loading?: boolean;
//   prompt?: string;
//   history?: ChatHistory[];
// }

export const chatInitialState: State = {
  history: [],
  loading: false,
  chunk: "",
  prompt: "",
  imageUrls: [],
  progress: 0,
};

export function chatReducer(
  state: State,
  action: {
    type: string;
    // eslint-disable-next-line
    [key: string]: any;
  }
) {
  console.log("chatReducer", action.type, action);
  switch (action.type) {
    case "addChunk":
      return { ...state, chunk: state.chunk + action.chunk };
    case "resetChunk":
      return { ...state, chunk: "" };
    case "loadingOn":
      return { ...state, loading: true };
    case "loadingOff":
      return { ...state, loading: false };
    case "setPrompt":
      return { ...state, prompt: action.prompt };
    case "resetPrompt":
      return { ...state, prompt: "" };
    case "addImageUrl":
      console.log("addImageUrl", action, action.imageUrl);
      return {
        ...state,
        imageUrls: [...state.imageUrls, action.imageUrl],
        progress: 0,
      };
    case "removeImageUrl":
      return {
        ...state,
        imageUrls: state.imageUrls.filter((url) => url !== action.imageUrl),
      };
    case "resetImageUrls":
      return { ...state, imageUrls: [] };
    case "setProgress":
      return { ...state, progress: action.progress };
    case "addChatHistory":
      return { ...state, history: [action.history, ...state.history] };
    case "reset":
      return chatInitialState;
    default:
      return state;
  }
}

export function addChunk(chunk: string) {
  return { type: "addChunk", chunk };
}
export function resetChunk() {
  return { type: "resetChunk" };
}
export function loadingOn() {
  return { type: "loadingOn" };
}
export function loadingOff() {
  return { type: "loadingOff" };
}
export function setPrompt(prompt: string) {
  return { type: "setPrompt", prompt };
}
export function resetPrompt() {
  return { type: "resetPrompt" };
}
export function addImageUrl(imageUrl: string) {
  return { type: "addImageUrl", imageUrl };
}
export function removeImageUrl(imageUrl: string) {
  return { type: "removeImageUrl", imageUrl };
}
export function resetImageUrls() {
  return { type: "resetImageUrls" };
}
export function setProgress(progress: number) {
  return { type: "setProgress", progress };
}
export function addChatHistory(history: ChatHistory) {
  return { type: "addChatHistory", history };
}
export function reset() {
  return { type: "reset" };
}
