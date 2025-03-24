"use client";
import { Provider } from "react-redux";
import { appStore } from "./app.store";

export default function AppStoreProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={appStore}>
            {children}
        </Provider>
    );
}