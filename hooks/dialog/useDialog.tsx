import { useRef } from "react";

export default function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function Dialog({ children }: { children: React.ReactNode }) {
    return (
      <dialog ref={dialogRef} className="m-auto max-h-2/3  overflow-auto">
        {children}
      </dialog>
    );
  }

  return {
    Dialog,
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
    },
  } as const;
}
