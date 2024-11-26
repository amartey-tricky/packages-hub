import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(15, "Username must be at most 15 characters"),
  email: z.string().email("Enter a valid email").min(1, "Enter a valid email").max(50, "Enter a valid email"),
  password: z.string().min(15, "Enter a valid password").max(15, "Password ahould be at least 15 characters").regex(/^[a-zA-Z0-9\W]{15}$/g, "Password must contain uppercase, lowercase, numbers and symbols"),
  confirmPassword: z.string().min(15, "Enter a valid password").max(15, "Password ahould be at least 15 characters").regex(/^[a-zA-Z0-9\W]{15}$/g, "Password must contain uppercase, lowercase, numbers and symbols")
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export type SignUpData = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Enter a valid email").max(50, "Enter a valid email"),
  password: z.string().min(15, "Enter a valid password").max(15, "Password ahould be at least 15 characters").regex(/^[a-zA-Z0-9\W]{15}$/g, "Password must contain uppercase, lowercase, numbers and symbols")
})

export type LoginData = z.infer<typeof loginSchema>
