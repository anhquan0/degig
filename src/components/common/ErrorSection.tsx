import { Info } from "lucide-react";

export function ErrorSection({ title, message }: { title?: string; message?: string }) {
  return (
    <div className="flex min-h-[92vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Info size={96} className="text-slate-500" />
        <span className="mt-2 text-lg font-bold text-slate-500">{title || "Something went wrong!"}</span>
        <span className="mt-2 text-slate-500">{message || "There seems to be an error. Contact support to get help"}</span>
      </div>
    </div>
  );
}
