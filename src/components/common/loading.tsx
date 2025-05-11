import { cn } from "@/utils";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid h-screen place-content-center px-4">
      <Loader2 className={cn("my-28 h-16 w-16 animate-spin text-primary/60")} />
    </div>
  );
}
