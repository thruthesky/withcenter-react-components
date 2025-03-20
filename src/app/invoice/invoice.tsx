import { useRouter } from "next/router";

export default function InvoicePage() {
    const router = useRouter();
    const data = router.query;
    console.log("InvoicePage data", data);
    return (
        <>
        </>);
}