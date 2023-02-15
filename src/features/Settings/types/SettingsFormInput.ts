import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const PrimaryContact = z.object({
  name: z.string().max(70),
  number: z.string().refine(
    val => {
      return isValidPhoneNumber(`+63${val}`, "PH") || val === "911";
    },
    { message: "Please enter a valid phone number or enter 911 instead." }
  )
});
export const SettingsFormResolver = z.object({
  threshold: z.number().gte(300),
  primaryContact: PrimaryContact
});

export type SettingsFormInput = z.infer<typeof SettingsFormResolver>;
