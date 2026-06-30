import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const stories = [
  {
    id: 1,
    emoji: "🐕",
    species: "Dog",
    animalName: "Bruno",
    type: "Dog",
    condition: "Injured",
    title: "Found him shivering on a highway — now he owns my couch",
    excerpt:
      "Bruno was trembling on the highway median with a deep cut on his right paw. He was terrified of humans. The first week was tough — he wouldn't eat unless I turned away. Today he demands belly rubs every morning.",
    author: "Rahul M.",
    date: "Jun 2026",
  },
  {
    id: 2,
    emoji: "🐈",
    species: "Cat",
    animalName: "Luna",
    type: "Cat",
    condition: "Stray",
    title: "She adopted me, honestly. I just opened the window.",
    excerpt:
      "Luna was a rooftop stray who kept showing up at my office window. After a week of pretending I didn't want a cat, I brought her in for 'just one night'. That was eight months ago.",
    author: "Priya S.",
    date: "May 2026",
  },
  {
    id: 3,
    emoji: "🐕",
    species: "Dog",
    animalName: "Milo",
    type: "Dog",
    condition: "Malnourished",
    title: "Skin and bones. Now he's the healthiest dog in our colony.",
    excerpt:
      "Milo was so thin you could count every rib. He had mange on his back and was too weak to stand. Three months of vet care, cooked food, and love — he now runs circles around every dog at the park.",
    author: "Ankit V.",
    date: "Apr 2026",
  },
  {
    id: 4,
    emoji: "🐇",
    species: "Rabbit",
    animalName: "Pebble",
    type: "Rabbit",
    condition: "Abandoned",
    title: "Someone left her in a cardboard box outside the market",
    excerpt:
      "Pebble was in a damp cardboard box with no food or water. She was completely still — we thought the worst. The vet said dehydration. After a few days of care she started thumping around the flat like she owned it.",
    author: "Sneha K.",
    date: "Mar 2026",
  },
  {
    id: 5,
    emoji: "🐈",
    species: "Cat",
    animalName: "Shadow",
    type: "Cat",
    condition: "Injured",
    title: "One eye, zero regrets — Shadow is the most loving cat I know",
    excerpt:
      "Shadow lost his left eye to an infection before I found him. The surgery was expensive but worth every rupee. He now sleeps on my pillow and chirps at birds from the window — loudly and aggressively, every single morning.",
    author: "Kavita R.",
    date: "Feb 2026",
  },
  {
    id: 6,
    emoji: "🐕",
    species: "Dog",
    animalName: "Golu",
    type: "Dog",
    condition: "Stray",
    title: "He followed my scooter for 2 km. I stopped. The rest is history.",
    excerpt:
      "Golu started chasing my scooter near the market. I sped up, he kept pace. Slowed down, he trotted alongside. At the red light he sat and looked at me. I loaded him up and went straight to the vet.",
    author: "Dev P.",
    date: "Jan 2026",
  },
];

const featured = {
  emoji: "🐕",
  species: "Dog",
  animalName: "Koko",
  type: "Dog",
  condition: "Serious injuries",
  title: "Koko was hit by a car and left on the road. Three surgeries later, she's teaching kids about kindness.",
  excerpt:
    "I got a call from a stranger who found Koko unconscious near the toll booth. Both back legs were injured. The vets said the recovery would take months and might be incomplete. Koko proved them wrong — six months of physio, three surgeries, and sheer stubbornness got her walking again. She now visits schools with us as a therapy dog. Kids who are scared of dogs leave wanting to hug her. She has taught more people about resilience than any lesson plan ever could.",
  author: "Meera J.",
  date: "Jun 2026",
};

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroTag}>
          <span className={styles.heroTagDot} />
          Adoption stories
        </div>
        <h1 className={styles.heroTitle}>
          Every rescue has a story worth telling
        </h1>
        <p className={styles.heroDesc}>
          Real people. Real animals. Read how stray, injured, and abandoned animals
          found their forever home — and changed the lives of the humans who opened
          the door.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>1,240+</span>
            <span className={styles.statLabel}>Animals rehomed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>860+</span>
            <span className={styles.statLabel}>Stories shared</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4.9 ★</span>
            <span className={styles.statLabel}>Average experience</span>
          </div>
        </div>
      </section>

      {/* ── Featured story ── */}
      <section className={styles.featured}>
        <div className={styles.featuredCard}>
          <div className={styles.featuredImageWrap}>
            <div className={styles.featuredPlaceholder}>
              <span className={styles.featuredEmoji}>{featured.emoji}</span>
            </div>
            <span className={styles.featuredBadge}>Featured story</span>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.featuredMeta}>
              <span className={`${styles.badge} ${styles.badgeAnimal}`}>{featured.type}</span>
              <span className={`${styles.badge} ${styles.badgeCondition}`}>{featured.condition}</span>
            </div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.authorRow} style={{ marginBottom: "20px" }}>
              <div className={styles.avatar}>{featured.author[0]}</div>
              <span className={styles.authorName}>{featured.author}</span>
              <span className={styles.cardDate}>{featured.date}</span>
            </div>
            <a href="#" className={styles.readMoreBtn}>Read full story →</a>
          </div>
        </div>
      </section>

      {/* ── Story grid ── */}
      <section className={styles.storiesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>All stories</h2>
            <p className={styles.sectionSub}>From scared strays to forever family members</p>
          </div>
          <a href="#share" className={styles.shareBtn}>Share your story ↓</a>
        </div>

        <div className={styles.grid}>
          {stories.map((s) => (
            <div key={s.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.animalEmoji}>{s.emoji}</span>
                <span className={styles.animalSpecies}>{s.animalName} · {s.species}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={`${styles.badge} ${styles.badgeAnimal}`}>{s.type}</span>
                  <span className={`${styles.badge} ${styles.badgeCondition}`}>{s.condition}</span>
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardExcerpt}>{s.excerpt}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.authorRow}>
                    <div className={styles.avatar}>{s.author[0]}</div>
                    <span className={styles.authorName}>{s.author}</span>
                  </div>
                  <span className={styles.cardDate}>{s.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Share story form ── */}
      <section className={styles.shareSection} id="share">
        <div className={styles.shareCard}>
          <div className={styles.shareHeader}>
            <h2 className={styles.shareTitle}>Share your adoption story</h2>
            <p className={styles.shareSubtitle}>
              Tell us how you found your animal, what condition they were in, how they behaved at first,
              and how things are now. Your story could inspire the next adoption.
            </p>
          </div>

          <form>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Your name</label>
                <input className={styles.input} type="text" placeholder="Priya Sharma" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Your email</label>
                <input className={styles.input} type="email" placeholder="priya@gmail.com" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Animal name</label>
                <input className={styles.input} type="text" placeholder="e.g. Bruno" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Animal type</label>
                <select className={styles.select}>
                  <option value="">Select type...</option>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Rabbit</option>
                  <option>Bird</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Condition when found</label>
                <select className={styles.select}>
                  <option value="">Select condition...</option>
                  <option>Stray (healthy)</option>
                  <option>Malnourished</option>
                  <option>Injured</option>
                  <option>Abandoned</option>
                  <option>Sick</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Initial behaviour</label>
                <select className={styles.select}>
                  <option value="">Select behaviour...</option>
                  <option>Friendly and calm</option>
                  <option>Shy and scared</option>
                  <option>Aggressive at first</option>
                  <option>Very weak / lethargic</option>
                </select>
              </div>

              <div className={styles.fieldFull}>
                <label className={styles.label}>Story title</label>
                <input className={styles.input} type="text" placeholder="One sentence that captures your story..." />
              </div>

              <div className={styles.fieldFull}>
                <label className={styles.label}>Your story</label>
                <textarea
                  className={styles.textarea}
                  placeholder="How did you find the animal? What was their condition? How did they behave in the first days? How are they now? Share as much or as little as you like..."
                />
              </div>

              <div className={styles.fieldFull}>
                <label className={styles.label}>Add photos (optional)</label>
                <div className={styles.uploadBox}>
                  <span className={styles.uploadIcon}>🐾</span>
                  <p className={styles.uploadText}>Upload photos of your animal</p>
                  <p className={styles.uploadHint}>JPG, PNG up to 10MB · Max 5 photos</p>
                </div>
              </div>
            </div>

            <div className={styles.formFooter}>
              <button type="submit" className={styles.submitBtn}>
                Submit story →
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
