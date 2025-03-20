"use client"
import { useInvoiceData } from "@/components/ContextProvider";
import Link from "next/link";


interface INVOICE_SCHEMA {
    project: string;
    invoice: {
        feature: string;
        description: string;
        amount: string;
        duration: string;
    }[];
    total: {
        amount: string;
        duration: string;
    };
}

export default function InvoicePage() {
    const invoice = useInvoiceData();
    console.log("invoice::", invoice);
    const data: INVOICE_SCHEMA = invoice ? JSON.parse(invoice) : {};
    return (
        <section className="flex flex-col gap-4">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1>InvoiceGen</h1>
                <nav className="flex gap-3">
                    <Link className="button" href="/">home</Link>
                </nav>
            </header>
            <article className="p-5">
                <h3>Project name: {data.project}</h3>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.invoice.map((item, index) => (
                            <tr key={index}>
                                <td>{item.feature}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>{data.total.amount}</td>
                            <td>{data.total.duration}</td>
                        </tr>
                    </tfoot>
                </table>
            </article>
        </section>);
}