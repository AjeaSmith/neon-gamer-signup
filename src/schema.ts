import z from "zod";

export const formSchema = z
  .object({
    callsign: z
      .string()
      .min(3, "Use at least 3 characters")
      .max(20, "Must be at most 20 characters."),
    email: z.email("Enter a valid email, like you@example.com"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string().min(1, "Passwords don't match"),
    terms: z
      .boolean()
      .refine((v) => v === true, "Accept the terms to continue"),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords don't match",
    // 2. Path points the error exactly to the confirmPassword input field
    path: ["confirm"],
  });

export const signupSchema = formSchema.refine((d) => d.confirm === d.password, {
  message: "Passwords don't match",
  path: ["confirm"],
});

export type SignupValues = z.infer<typeof signupSchema>;
