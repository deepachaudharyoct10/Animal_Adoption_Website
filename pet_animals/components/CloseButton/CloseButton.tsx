"use client";

import styles from "./CloseButton.module.css";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  return (
    <button className={styles.closeBtn} onClick={() => router.back()} aria-label="Close">
      ✕
    </button>
  );
}
