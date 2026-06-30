import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroBg2} />

      <div className={styles.heroLeft}>
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Every animal deserves a home
        </div>

        <h1 className={styles.heroTitle}>
          Find a friend<br />
          who&apos;s been<br />
          <span className={styles.heroTitleAccent}>waiting</span> for<br />
          you all along.
        </h1>

        <p className={styles.heroDesc}>
          Browse rescued dogs, cats and small animals near you, start an
          adoption in minutes, or help a stray in trouble — all from one
          place.
        </p>

        <div className={styles.heroButtons}>
          <Link href="/adopt" className={styles.btnPrimary}>Browse animals</Link>
          <Link href="#how-it-works" className={styles.btnSecondary}>How it works</Link>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.statAvatars}>
            <div className={styles.statAvatar}></div>
            <div className={styles.statAvatar}></div>
            <div className={styles.statAvatar}></div>
          </div>
          <span className={styles.statsText}>
            <strong>320+ animals</strong> rehomed this year
          </span>
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardGlow} />
          <div className={styles.floatingBadge}>🐾 New arrivals today</div>
          <div className={styles.animalCard}>
            <span className={styles.cardBadge}>AVAILABLE NOW</span>
            <div className={styles.cardImagePlaceholder}>
              photo · golden retriever
            </div>
            <div className={styles.cardInfo}>
              <div className={styles.cardInfoAvatar}></div>
              <div className={styles.cardInfoText}>
                <strong>Biscuit</strong>
                <span>Found his family — 3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
