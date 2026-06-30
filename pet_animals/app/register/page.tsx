import styles from "./page.module.css";
import Link from "next/link";
import CloseButton from "@/components/CloseButton/CloseButton";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CloseButton />

        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>H</div>
          <span className={styles.logoName}>Haven</span>
        </Link>

        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Join Haven and start your adoption journey</p>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>First name</label>
              <input className={styles.input} type="text" placeholder="Deepa" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Last name</label>
              <input className={styles.input} type="text" placeholder="Chaudhary" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="deepa@gmail.com" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <input className={styles.input} type="tel" placeholder="+91 9876543210" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" placeholder="Min. 8 characters" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create account
          </button>
        </form>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>Already have an account?</span>
          <div className={styles.dividerLine} />
        </div>

        <p className={styles.footer}>
          <Link href="/login">Log in instead →</Link>
        </p>
      </div>
    </div>
  );
}
