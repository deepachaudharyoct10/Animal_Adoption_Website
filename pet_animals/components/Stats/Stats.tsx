import styles from "./Stats.module.css";

const stats = [
  { number: "1,840", label: "Animals rescued" },
  { number: "1,520", label: "Adopted & home" },
  { number: "210",   label: "Active volunteers" },
  { number: "$96k",  label: "Raised for care" },
];

export default function Stats() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stats}>
        {stats.map((stat, i) => (
          <>
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statNumber}>{stat.number}</span>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
            {i < stats.length - 1 && <div key={`d-${i}`} className={styles.divider} />}
          </>
        ))}
      </div>
    </div>
  );
}
