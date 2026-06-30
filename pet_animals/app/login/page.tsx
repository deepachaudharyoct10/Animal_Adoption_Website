import styles from "./page.module.css";
import Link from "next/link";
import CloseButton from "@/components/CloseButton/CloseButton";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CloseButton />

        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>H</div>
          <span className={styles.logoName}>Haven</span>
        </Link>

        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to continue your adoption journey</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="deepa@gmail.com" />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Password</label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input className={styles.input} type="password" placeholder="Your password" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
        </form>

        <p className={styles.footer}>
          Don&apos;t have an account? <Link href="/register">Sign up for free →</Link>
        </p>
      </div>
    </div>
  );
}
