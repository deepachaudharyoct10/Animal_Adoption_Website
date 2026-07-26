"use client";

import { useState } from "react";
import styles from "./Donate.module.css";
import Link from "next/link";

const amounts = [500, 1000, 2000, 5000];

export default function Donate() {
  const [selected, setSelected] = useState(amounts[1]);

  return (
    <section className={styles.section}>
      <div className={styles.imagePlaceholder}>
        photo · volunteer feeding rescues
      </div>

      <div className={styles.right}>
        <p className={styles.sectionTag}>Support the work</p>
        <h2 className={styles.title}>Your gift feeds, heals and shelters a rescue</h2>
        <p className={styles.desc}>
          Every donation goes straight to food, medical treatment and warm
          beds for animals waiting for their forever home.
        </p>

        <div className={styles.amounts}>
          {amounts.map((amt) => (
            <button
              key={amt}
              className={`${styles.amountBtn} ${amt === selected ? styles.amountBtnActive : ""}`}
              onClick={() => setSelected(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <div className={styles.donateActions}>
          <Link href={`/donate?amount=${selected}`} className={styles.donateBtn}>Donate ₹{selected}</Link>
          <span className={styles.secureNote}>Secure payment via Razorpay</span>
        </div>
      </div>
    </section>
  );
}
