import Alert from "./Alert";

export default function Warning({ children }: { children: React.ReactNode }) {
  return <Alert type="warning">{children}</Alert>;
}
