import { FileUploadData } from "@/lib/firebase/firebase.functions";
import { Part, FileData } from "firebase/vertexai";

export interface ChatHistory {
  role: string;
  text: string;
  files?: FileData[];
  parts?: Array<string | Part>;
  hide?: boolean;
}

export interface ChatState {
  history: ChatHistory[];
  loading: boolean;
  invoiceChunck: string;
  analyzeChunck: string;
  prompt: string;
  files: FileUploadData[];
  progress: number;
  analysisLoading: boolean;
  dragging: boolean;
}

export const chatInitialState: ChatState = {
  history: [],
  invoiceChunck: "",
  analyzeChunck: "",
  prompt: "",
  files: [],
  progress: 0,
  loading: false,
  analysisLoading: false,
  dragging: false,
};

export function chatReducer(
  state: ChatState,
  action: {
    type: string;
    // eslint-disable-next-line
    [key: string]: any;
  }
) {
  switch (action.type) {
    case "addInvoiceChunk": {
      return { ...state, invoiceChunck: state.invoiceChunck + action.chunk };
    }
    case "resetInvoiceChunk":
      return { ...state, invoiceChunck: "" };
    case "addAnalyzeChunk": {
      return { ...state, analyzeChunck: state.analyzeChunck + action.chunk };
    }
    case "resetAnalyzeChunk":
      return { ...state, analyzeChunck: "" };
    case "showAnalysis": {
      const newHistory = [...state.history];
      newHistory[action.index].hide = true;
      return { ...state, history: newHistory };
    }
    case "hideAnalysis": {
      const newHistory = [...state.history];
      newHistory[action.index].hide = false;
      return { ...state, history: newHistory };
    }
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
    case "setDragging": {
      return { ...state, dragging: action.dragging };
    }

    case "reset":
      return chatInitialState;
    default:
      return state;
  }
}

export function addInvoiceChunk(chunk: string) {
  return { type: "addInvoiceChunk", chunk };
}
export function resetInvoiceChunk() {
  return { type: "resetInvoiceChunk" };
}
export function addAnalyzeChunk(chunk: string) {
  return { type: "addAnalyzeChunk", chunk };
}
export function showAnalysis(index: number) {
  return { type: "showAnalysis", index };
}
export function hideAnalysis(index: number) {
  return { type: "hideAnalysis", index };
}
export function resetAnalyzeChunk() {
  return { type: "resetAnalyzeChunk" };
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
export function addFile(file: FileUploadData) {
  return { type: "addFile", file };
}
export function removeFile(file: FileUploadData) {
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

export function setDragging(dragging: boolean) {
  return { type: "setDragging", dragging };
}
