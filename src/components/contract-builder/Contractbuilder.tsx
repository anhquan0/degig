"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type ContractFormValues, useContractBuilderForm } from "./hooks/contract-builder";
import Image from "next/image";
import { useWallet } from "@/hooks/use-wallet";
import { DescriptionUI } from "../layout/job-details/DescriptionUI";
import { MinimalTiptapEditor } from "../tiptap";
import { cn } from "@/utils";
import { useEffect } from "react";

export default function ContractBuilderForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<ContractFormValues>;
  onSubmit: (values: ContractFormValues) => void;
}) {
  const { form } = useContractBuilderForm(initialData);
  const { address } = useWallet();

  useEffect(() => {
    if (address) {
      form.setValue("partyA", address);
    }
  }, [address, form]);

  return (
    <div className="bg-background flex min-h-screen flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-5xl space-y-8 px-8 py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 ">
                {/* Party A Field */}
                <FormField
                  control={form.control}
                  name="partyA"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-2">
                      <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                        Party A(You):
                      </FormLabel>
                      <div className="flex w-full rounded-md border">
                        <FormControl>
                          <Input className="mt-0 border-none focus-visible:ring-0" {...field} readOnly />
                        </FormControl>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Party B Field */}
                <FormField
                  control={form.control}
                  name="partyB"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-2">
                      <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                        Party B:
                      </FormLabel>
                      <div className="flex w-full rounded-md border">
                        <FormControl>
                          <Input className="mt-0 border-none focus-visible:ring-0" placeholder="addr..." {...field} />
                        </FormControl>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                          Job Description
                        </FormLabel>
                      </div>
                      <div className="border rounded-md p-2">
                        <DescriptionUI description={field.value} />
                      </div>
                      <FormMessage />
                    </div>
                  )}
                />

                {/* Terms and Conditions Field */}
                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-2 py-4">
                      <div className="flex items-center justify-between">
                        <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                          Terms and conditions
                        </FormLabel>
                      </div>
                      <div className="ring-primary flex rounded-md border has-focus:ring-1">
                        <MinimalTiptapEditor
                          value={field.value}
                          onChange={field.onChange}
                          output="html"
                          placeholder="Enter your Terms and conditions description..."
                          autofocus={true}
                          editable={true}
                          className="min-h-[30vh] w-full border-0 text-sm"
                          editorContentClassName="p-4 px-2 h-full"
                          editorClassName="focus:outline-hidden h-full"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rewards Field */}
                <FormField
                  control={form.control}
                  name="reward"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex w-full flex-col gap-2 py-2">
                        <div className="flex w-full flex-col group items-start gap-1.5 ">
                          <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                            Reward (in ADA)
                          </FormLabel>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                              <div className="flex items-center gap-2">
                                <Image
                                  alt="ADA"
                                  className="mr-1 block"
                                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <Input
                              type="number"
                              className={cn("pl-10 h-12 text-base font-medium rounded-md border-gray-200")}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                            />
                          </div>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Point of Contact Field */}
                <FormField
                  control={form.control}
                  name="poc"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-2 py-2">
                      <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                        Point of Contact (TG / X / Email)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://t.me/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="px-8">
                  Create Contract
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
