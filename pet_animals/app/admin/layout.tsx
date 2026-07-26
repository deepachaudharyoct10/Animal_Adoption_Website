"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./admin.module.css";
import { useAdminGuard } from "@/lib/useAdminGuard";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/animals", label: "Animals" },
  { href: "/admin/adoptions", label: "Adoptions" },
  { href: "/admin/reports", label: "Rescue reports" },
  { href: "/admin/donations", label: "Donations" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const ready = useAdminGuard();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }

  if (!ready) {
    return (
      <div className={styles.shell}>
        <p style={{ color: "#666", padding: 48 }}>Checking access...</p>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <header className={styles.mobileHeader}>
        <button className={styles.hamburger} onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          ☰
        </button>
        <span className={styles.logoName}>Haven Admin</span>
      </header>

      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <button className={styles.closeSidebarBtn} onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          ✕
        </button>

        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>H</div>
          <span className={styles.logoName}>Haven Admin</span>
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
