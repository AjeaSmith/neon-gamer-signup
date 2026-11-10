// app/actions.ts
"use server";
import z from "zod";
import { formSchema, SignupValues } from "@/schema";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

export async function postFormData(formData: SignupValues) {
  const result = formSchema.safeParse(formData);
  if (!result.success)
    return { success: false, errors: z.treeifyError(result.error) };

  const { callsign, email, password } = result.data;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    // save to DB
    await sql`
      INSERT INTO gamers (callsign, email, password_hash)
      VALUES (${callsign}, ${email}, ${hashPassword})
      RETURNING id, callsign, email, created_at;
    `;
    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Failed to create user record.",
      dbError: err,
    };
  }
}
