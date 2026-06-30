import styles from "./ReportStray.module.css";
import Link from "next/link";

const steps = [
  { num: "1", title: "Snap a photo",  desc: "Help the team identify the animal." },
  { num: "2", title: "Drop a pin",    desc: "Share the location so we can find them." },
  { num: "3", title: "We respond",    desc: "Track the rescue status from your dashboard." },
];

export default function ReportStray() {
  return (
    <section className={styles.section}>
      <div className={styles.bgGlow} />
      <div className={styles.left}>
        <span className={styles.sectionTag}>See something? Say something.</span>
        <h2 className={styles.title}>Found a stray or injured animal?</h2>
        <p className={styles.desc}>
          Report it in under a minute with a photo and location. Our rescue team
          takes it from there — any hour, any day.
        </p>
        <Link href="/report" className={styles.reportBtn}>Report an animal</Link>
      </div>

      <div className={styles.right}>
        {steps.map((step) => (
          <div key={step.num} className={styles.stepCard}>
            <h4 className={styles.stepTitle}>{step.num} · {step.title}</h4>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
