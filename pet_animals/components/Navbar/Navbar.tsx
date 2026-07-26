"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";

interface StoredUser {
  role: "user" | "admin";
  email?: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    // Client-only auth check: intentionally patches state after mount to avoid
    // an SSR/client hydration mismatch (localStorage isn't available on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(stored ? JSON.parse(stored) : null);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

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
        {user ? (
          <>
            {user.role === "admin" && (
              <Link href="/admin" className={styles.loginLink}>Admin</Link>
            )}
            <button onClick={handleLogout} className={styles.signupBtn}>Log out</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.loginLink}>Log in</Link>
            <Link href="/register" className={styles.signupBtn}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
