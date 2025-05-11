"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponseInterface } from "@/interface";
import useSWR from "swr";
// import { useWallet } from "@/hooks/use-wallet";
import Loading from "@/components/common/loading";
import { ErrorSection } from "@/components/common/ErrorSection";
import { parseError } from "@/utils/parse-error";
import { get } from "@/lib/axios";
import { useParams } from "next/navigation";
import { chat } from "@/services/dispute/chat";
import { useWallet } from "@/hooks/use-wallet";
import { DisputeMessage } from "@prisma/client";
import { cn } from "@/utils";
import { shortenString } from "@/utils/shorten-string";
import { ExternalLink, X } from "lucide-react";
import CopyButton from "@/components/common/copy-button";
import DecisionButton from "@/components/dispute-page/DecisionButton";
import ViewDetailButton from "@/components/contract-page/ViewDetailButton";
import ViewSubmissionButton from "@/components/contract-page/ViewSubmissionButton";

export default function ChatInterface() {
  const params = useParams<{ id: string }>();

  const [input, setInput] = useState("");

  const { data, error, isLoading, mutate } = useSWR<ApiResponseInterface>(`/dispute/` + params.id, get);
  const { address } = useWallet();
  if (isLoading) return <Loading />;
  if (error) return <ErrorSection title={parseError(error)} />;
  const { data: dispute } = data || { data: null };
  const { messages } = dispute || { messages: [] };

  const handleChat = async () => {
    try {
      if (!input || !address) {
        return;
      }
      const { result, message } = await chat({
        id: params.id,
        content: input,
        walletAddress: address,
      });

      if (!result) {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      mutate();
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <h1 className="text-sm font-medium">{dispute.reason}</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-y-scroll">
              <div className="space-y-4">
                {messages.map((message: DisputeMessage, index: number) => (
                  <div key={index} className={cn("flex gap-2 max-w-[80%]", message.author === address ? "ml-auto flex-row-reverse" : "mr-auto")}>
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                    <div className="space-y-2">
                      <div className={cn("flex items-center gap-2", message.author === address && "justify-end")}>
                        <span className="text-sm font-medium">{shortenString(message.author || "")}</span>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {/* {message.author !== address && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[44px] max-h-32" />
                <Button className="px-8" onClick={handleChat}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l h-full">
          <div className="h-14 px-4 flex items-center border-b">
            <h2 className="font-medium">Contract details</h2>
          </div>
          <div className="p-4">
            {/* Contract Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Transaction Hash</h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm mr-2">{shortenString(dispute.txHash)}</p>
                  <CopyButton content={dispute.txHash} />
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Party A</h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm mr-2">{shortenString(dispute.partyA)}</p>
                  <CopyButton content={dispute.partyA} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Party B</h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm mr-2">{shortenString(dispute.partyB)}</p>
                  <CopyButton content={dispute.partyB} />
                </div>
              </div>

              {/* Content and Submission in the same row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center mt-1">
                    <ViewDetailButton contract={dispute} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mt-1">
                    <ViewSubmissionButton contract={dispute} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 pt-0 mt-2">{address != dispute.partyA && address != dispute.partyB && <DecisionButton />}</div>
        </div>
      </div>
    </div>
  );
}
