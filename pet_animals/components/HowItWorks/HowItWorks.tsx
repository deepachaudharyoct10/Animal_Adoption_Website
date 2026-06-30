import styles from "./HowItWorks.module.css";

const steps = [
  { num: "1", title: "Browse & match",  desc: "Filter by type, age and temperament to find an animal that fits your home." },
  { num: "2", title: "Apply online",    desc: "Fill out a short adoption form. We review every request with care." },
  { num: "3", title: "Meet & greet",    desc: "Visit the shelter and spend time together to make sure it's the right fit." },
  { num: "4", title: "Welcome home",    desc: "Finalize, and bring your new companion home to start their next chapter.", active: true },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <p className={styles.sectionTag}>Simple & Kind</p>
      <h2 className={styles.sectionTitle}>How adoption works</h2>

      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.num} className={styles.step}>
            <div className={`${styles.stepNumber} ${step.active ? styles.active : ""}`}>
              {step.num}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
