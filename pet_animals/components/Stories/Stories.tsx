import styles from "./Stories.module.css";

const stories = [
  {
    quote: "\"We came in to 'just look' and left with Mango. Six months on, I can't imagine the house without her chaos.\"",
    name: "Priya & Arjun",
    sub: "adopted Mango, a tabby cat",
  },
  {
    quote: "\"Reporting an injured pup took two minutes. The team had him safe within the hour — now he's ours.\"",
    name: "Daniel R.",
    sub: "reported & adopted Scout, a mixed-breed dog",
  },
];

export default function Stories() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionTag}>Happy Tails</p>
      <h2 className={styles.sectionTitle}>Adoption stories</h2>

      <div className={styles.grid}>
        {stories.map((story) => (
          <div key={story.name} className={styles.card}>
            <p className={styles.quote}>{story.quote}</p>
            <div className={styles.author}>
              <div className={styles.avatar}></div>
              <div>
                <p className={styles.authorName}>{story.name}</p>
                <p className={styles.authorSub}>{story.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
