"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { skillsArraySchema } from "@/interface/skills";
import dayjs from "dayjs";
export const jobFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  reward: z.number().min(0),
  deadline: z
    .string()
    .trim()
    .datetime({
      message: "Required",
      local: true,
      offset: true,
    })
    .refine((date) => dayjs(date).isAfter(dayjs()), {
      message: "Deadline cannot be in the past",
    }),
  skills: skillsArraySchema,
  poc: z.string().min(5, {
    message: "Contact information must be at least 5 characters.",
  }),
  applylink: z.string().url().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

export function useJobBuilderForm(initialData?: Partial<JobFormValues>) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [openSkillsCombobox, setOpenSkillsCombobox] = useState(false);

  const suggestedSkills = ["Frontend", "Backend", "UI/UX Design", "Writing", "Digital Marketing", "Community Manager"];

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      reward: parseInt(initialData?.reward?.toString() || "0"),
      deadline: initialData?.deadline || dayjs().add(7, "day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]").replace("Z", ""),
      skills: initialData?.skills || [],
      poc: initialData?.poc || "",
      applylink: initialData?.applylink || "",
    },
  });

  const titleLength = form.watch("title")?.length || 0;
  const remainingChars = 100 - titleLength;

  return {
    form,
    selectedSkills,
    setSelectedSkills,
    openSkillsCombobox,
    setOpenSkillsCombobox,
    suggestedSkills,
    remainingChars,
  };
}
