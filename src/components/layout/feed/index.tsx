import { DefaultLayout } from "../default";

export function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}>) {
  return <DefaultLayout className="mx-auto w-full max-w-7xl">{children}</DefaultLayout>;
}
