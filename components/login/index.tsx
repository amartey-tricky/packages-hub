"use client";

import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/schema";
import type { LoginData } from "@/utils/schema";

export function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const submitLogin = async (data: LoginData) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)} className={styles.form}>
      <div className={styles.logo_container}>
        <Image src="" alt="Packages Hub Logo" width={100} height={100} className={styles.logo} />
        <h1 className={styles.title}>Login</h1>
      </div>
      <div className={styles.form_body}>
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
        <button type="submit" className={styles.submit}>
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </div>
      <div className={styles.form_footer}>
        <div className={styles.footer_text}>
          <span>Don't have an account?</span>
          <Link href="/signup" className={styles.footer_link}>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}
