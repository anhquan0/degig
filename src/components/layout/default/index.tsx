import { Header } from "../common/header";
import { Footer } from "../common/footer";
import { cn } from "@/utils";

export function DefaultLayout({
  children,
  className,
  hideFooter = false,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
}>) {
  return (
    <div className={cn("flex min-h-screen flex-col justify-between", className)}>
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
}
