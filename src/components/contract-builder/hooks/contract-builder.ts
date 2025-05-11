"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const contractFormSchema = z.object({
  partyA: z.string().min(1, { message: "Party A is required" }),
  partyB: z.string().min(1, { message: "Party B is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  termsAndConditions: z.string().min(1, { message: "Terms and conditions are required" }),
  reward: z.number().min(0),
  poc: z.string().min(1, { message: "Point of contact is required" }),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

export function useContractBuilderForm(initialData?: Partial<ContractFormValues>) {
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      partyA: "",
      partyB: "",
      description: initialData?.description || "",
      termsAndConditions: initialData?.termsAndConditions || "",
      reward: parseInt(initialData?.reward?.toString() || "0"),
      poc: initialData?.poc || "",
    },
  });

  return {
    form,
  };
}
