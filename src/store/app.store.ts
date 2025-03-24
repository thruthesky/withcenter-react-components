import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice.slice";
import { useSelector } from "react-redux";
export const appStore = configureStore({
    reducer: {
        // Add your reducers here
        invoiceReducer,
        // chatReducer,
    },
});



export type RootState = ReturnType<typeof appStore.getState>;
// export type AppDispatch = typeof appStore.dispatch;



export function useInvoiceSelector() {
    return useSelector((state: RootState) => state.invoiceReducer);
    // return useSelector.withTypes<RootState>()(((state: RootState) => state.invoiceReducer));
}

