import styles from "./Donate.module.css";
import Link from "next/link";

const amounts = ["$20", "$50", "$100", "$250"];

export default function Donate() {
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
          {amounts.map((amt, i) => (
            <button
              key={amt}
              className={`${styles.amountBtn} ${i === 1 ? styles.amountBtnActive : ""}`}
            >
              {amt}
            </button>
          ))}
        </div>

        <div className={styles.donateActions}>
          <Link href="/donate" className={styles.donateBtn}>Donate $50</Link>
          <span className={styles.secureNote}>Secure payment via Razorpay</span>
        </div>
      </div>
    </section>
  );
}
