"use client";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const InvoiceContext = createContext("");
const InvoiceDispatchContext = createContext<Dispatch<SetStateAction<string>>>(() => { });


export function useInvoiceData() {
    return useContext(InvoiceContext);
}

export function useInvoiceSetData() {
    return useContext(InvoiceDispatchContext);
}

export default function ContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [invoice, setInvoice] = useState<string>("");
    return <>

        <InvoiceContext value={invoice}>
            <InvoiceDispatchContext value={setInvoice}>
                {children}
            </InvoiceDispatchContext>
        </InvoiceContext>

    </>;
}