"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { JobFormValues, useJobBuilderForm } from "./hooks/job-builder";
import Image from "next/image";
import { DateTimePicker } from "../ui/datetime-picker";
import dayjs from "dayjs";
import { SkillsSelect } from "./form/SkillsSelectNew";
import { MinimalTiptapEditor } from "../tiptap";
export default function JobBuilderForm({
  initialData,
  onSubmit,
}: {
  initialData?: Partial<JobFormValues>;
  onSubmit: (values: JobFormValues) => void;
}) {
  const { form, remainingChars } = useJobBuilderForm(initialData);

  return (
    <div className="bg-background flex min-h-screen flex-col justify-between">
      <div className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-5xl space-y-8 px-8 py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
                <div className="md:col-span-6 space-y-6">
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2">
                        <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                          Title
                        </FormLabel>
                        <div className="flex w-full rounded-md border">
                          <FormControl>
                            <Input className="mt-0 border-none focus-visible:ring-0" {...field} />
                          </FormControl>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <FormMessage />
                          <div className="shrink-0 text-right text-xs whitespace-nowrap text-slate-400">{remainingChars} characters left</div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applylink"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2">
                        <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                          Apply Link
                        </FormLabel>
                        <div className="flex w-full rounded-md border">
                          <FormControl>
                            <Input className="mt-0 border-none focus-visible:ring-0" placeholder="https://" {...field} />
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
                      <FormItem className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                            Description
                          </FormLabel>
                        </div>
                        <div className="ring-primary flex rounded-md border has-focus:ring-1">
                          <MinimalTiptapEditor
                            value={field.value}
                            onChange={field.onChange}
                            output="html"
                            placeholder="Enter your description..."
                            autofocus={true}
                            editable={true}
                            className="min-h-[60vh] w-full border-0 text-sm"
                            editorContentClassName="p-4 px-2 h-full"
                            editorClassName="focus:outline-hidden h-full"
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-3 space-y-6">
                  {/* Rewards Field */}

                  <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-full justify-start p-0">
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
                                  {/* <span className="text-sm font-medium text-gray-700">ADA</span> */}
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

                  {/* Deadline Field */}
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2">
                        <FormLabel className="">Deadline (in {Intl.DateTimeFormat().resolvedOptions().timeZone})</FormLabel>
                        <div className="ring-primary flex rounded-md border has-focus:ring-1 has-[data-[state=open]]:ring-1">
                          <DateTimePicker
                            value={field.value ? new Date(field.value) : undefined}
                            onChange={(date) => {
                              if (date) {
                                const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                                const localFormat = formattedDate.replace("Z", "");
                                field.onChange(localFormat);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                            use12HourFormat
                            hideSeconds
                            classNames={{
                              trigger: "border-0",
                            }}
                            minDateTooltipContent="Deadline cannot be in the past"
                            maxDateTooltipContent="Cannot extend deadline more than 2 weeks from original deadline"
                          />
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Skills Field */}
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2">
                        <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*'] text-[0.85rem] text-slate-600 sm:text-[0.9rem]">
                          Skills Needed
                        </FormLabel>
                        <SkillsSelect
                          defaultValue={field.value || []}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("skills");
                          }}
                          className="w-full"
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="poc"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col gap-2">
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
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="px-8">
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
