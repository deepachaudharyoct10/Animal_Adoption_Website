"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
import { Animal } from "@/lib/types";

export default function Hero() {
  const [featured, setFeatured] = useState<Animal | null>(null);

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data) => {
        const available = (data.animal ?? []).filter((a: Animal) => a.status === "available" && a.images?.[0]);
        setFeatured(available[0] ?? null);
      })
      .catch(() => setFeatured(null));
  }, []);

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
            {featured ? (
              <>
                <div className={styles.cardImagePlaceholder} style={{ padding: 0 }}>
                  <img
                    src={featured.images![0]}
                    alt={featured.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfoAvatar}></div>
                  <div className={styles.cardInfoText}>
                    <strong>{featured.name}</strong>
                    <span>{[featured.breed, featured.location].filter(Boolean).join(" · ")}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
