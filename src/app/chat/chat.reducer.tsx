import { Part, FileData } from "firebase/vertexai";

export interface ChatHistory {
  role: string;
  text: string;
  files?: FileData[];
  parts?: Array<string | Part>;
}

export interface State {
  history: ChatHistory[];
  loading: boolean;
  chunk: string;
  prompt: string;
  files: FileData[];
  progress: number;
  analysisLoading: boolean;
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
  chunk: "",
  prompt: "",
  files: [],
  progress: 0,
  loading: false,
  analysisLoading: false,
};

export function chatReducer(
  state: State,
  action: {
    type: string;
    // eslint-disable-next-line
    [key: string]: any;
  }
) {
  switch (action.type) {
    case "addChunk": {
      return { ...state, chunk: state.chunk + action.chunk };
    }

    case "resetChunk":
      return { ...state, chunk: "" };
    case "loadingOn":
      return { ...state, loading: true };
    case "loadingOff":
      return { ...state, loading: false };
    case "analysisLoadingOn":
      return { ...state, analysisLoading: true };
    case "analysisLoadingOff":
      return { ...state, analysisLoading: false };
    case "setPrompt":
      return { ...state, prompt: action.prompt };
    case "resetPrompt":
      return { ...state, prompt: "" };
    case "addFile":
      return {
        ...state,
        files: [...state.files, action.file],
        progress: 0,
      };
    case "removeFile":
      return {
        ...state,
        files: state.files.filter(
          (file) => file.fileUri !== action.file.fileUri
        ),
      };
    case "resetFiles":
      return { ...state, files: [] };
    case "setProgress":
      return { ...state, progress: action.progress };
    case "addChatHistory": {
      const newHistory = {
        ...state,
        history: [action.history, ...state.history],
      };
      console.log("newHistory", newHistory);
      return newHistory;
    }

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
export function analysisLoadingOn() {
  return { type: "analysisLoadingOn" };
}
export function analysisLoadingOff() {
  return { type: "analysisLoadingOff" };
}
export function setPrompt(prompt: string) {
  return { type: "setPrompt", prompt };
}
export function resetPrompt() {
  return { type: "resetPrompt" };
}
export function addFile(file: FileData) {
  return { type: "addFile", file };
}
export function removeFile(file: FileData) {
  return { type: "removeFile", file };
}
export function resetFiles() {
  return { type: "resetFiles" };
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
