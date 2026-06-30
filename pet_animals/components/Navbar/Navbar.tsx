import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>H</div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>Haven</span>
          <span className={styles.logoSub}>Animal Rescue</span>
        </div>
      </Link>

      <ul className={styles.navLinks}>
        <li><Link href="/adopt">Adopt</Link></li>
        <li><Link href="/report">Report a stray</Link></li>
        <li><Link href="/donate">Donate</Link></li>
        <li><Link href="/stories">Stories</Link></li>
      </ul>

      <div className={styles.navActions}>
        <Link href="/login" className={styles.loginLink}>Log in</Link>
        <Link href="/register" className={styles.signupBtn}>Sign up</Link>
      </div>
    </nav>
  );
}
