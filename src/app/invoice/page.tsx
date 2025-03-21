"use client"
import { useInvoiceData } from "@/components/ContextProvider";
import Link from "next/link";
import styles from "./page.module.css";

interface INVOICE_SCHEMA {
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

export default function InvoicePage() {
    const invoice = useInvoiceData();
    console.log("invoice::", invoice);
    const data: INVOICE_SCHEMA = invoice ? JSON.parse(invoice) : null;
    return (
        <section className="flex flex-col gap-4">
            <header className="flex justify-start gap-5 items-center p-4 bg-gray-800 text-white">
                <h1><Link href="/">InvoiceGen</Link></h1>
                <nav className="flex gap-3">
                    <Link className="button" href="/">Home</Link>
                </nav>
            </header>
            {data && (<article className="printing p-5 max-w-7xl mx-auto">
                <h3>Project name: {data.project}</h3>
                <table className={`w-full ${styles.table}`}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>Category</th>
                            <th>Feature</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Duration</th>
                            <th>Pages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.invoiceGroup.map((group, i) => (
                            <>
                                {group.items.map((item, index) => (
                                    <tr key={`${group.category}${i}${index}`}>
                                        {index == 0 && <td rowSpan={group.items.length}>{group.category}</td>}
                                        <td >{item.feature}</td>
                                        <td >{item.description}</td>
                                        <td >{item.amount}</td>
                                        <td >{item.duration}</td>
                                        <td >{item.pages}</td>
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>Total</td>
                            <td>{data.total.amount}</td>
                            <td>{data.total.duration} days</td>
                            <td>{data.total.pages}</td>
                        </tr>
                    </tfoot>
                </table>
            </article>)}
        </section>);
}