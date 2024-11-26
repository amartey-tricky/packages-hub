"use client";

import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/schema";
import type { SignUpData } from "@/utils/schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  })

  const submitSignUp = async (data: SignUpData) => {
    try {
      const { data: responseData, error} = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.username
      });

      if (error) {
        toast.error(error.message || "Sign up failed");
        return;
      }

      toast.success("Sign up successful");
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitSignUp)} className={styles.form}>
      <div>
        <Image src="" alt="Packages Hub Logo" width={100} height={100} className={styles.logo} />
        <h1 className={styles.title}>Sign Up</h1>
      </div>
      <div className={styles.form_body}>
        <div className={styles.form_username}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" autoComplete="off" placeholder="username" {...register("username")} required />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>
        <div className={styles.form_email}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoComplete="off" placeholder="your@email.com" {...register("email")} required />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <div className={styles.form_password}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" autoComplete="off" placeholder="********" {...register("password")} required />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <div className={styles.form_confirm_password}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" autoComplete="off" placeholder="********" {...register("confirmPassword")} required />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </div>
      <div className={styles.form_footer}>
        <div className={styles.footer_text}>
          <span>Already have an account?</span>
          <Link href="/login" title="Login" className={styles.footer_link}>Login</Link>
        </div>
      </div>
    </form>
  )
}
