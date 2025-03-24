
import { createSlice } from "@reduxjs/toolkit";

export interface InvoiceSchema {
    project: string;
    invoice: {
        feature: string;
        description: string;
        amount: string;
        duration: string;
    }[];
    invoiceGroup: [
        {
            category: string;
            items: {
                feature: string;
                description: string;
                amount: string;
                duration: string;
                pages: number;
                category: string;
            }[];
        }
    ];
    total: {
        amount: number;
        duration: number;
        pages: number;
    };
}

interface InvoiceState {
    json: InvoiceSchema;
}

const invoiceState: InvoiceState = {
    json: {} as InvoiceSchema,
};


const invoiceSlice = createSlice({
    name: "invoice",
    initialState: invoiceState,
    reducers: {
        setInvoice: (state, action) => {

            state.json = action.payload;
        },
        resetInvoice: (state) => {
            state.json = {} as InvoiceSchema;
        },
    },
});

export const { setInvoice, resetInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;