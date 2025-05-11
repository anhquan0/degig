import { FeedLayout } from "@/components/layout/feed";
import "@/styles/globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FeedLayout>{children}</FeedLayout>;
}
