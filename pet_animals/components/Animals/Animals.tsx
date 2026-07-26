"use client";

import { useEffect, useState } from "react";
import styles from "./Animals.module.css";
import Link from "next/link";
import { Animal } from "@/lib/types";

const filters = ["All animals", "Dog", "Cat", "Rabbit", "Bird"];

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data) => setAnimals(data.animal ?? []))
      .catch(() => setAnimals([]))
      .finally(() => setLoading(false));
  }, []);

  const available = animals.filter((a) => a.status === "available");
  const visible = (
    activeFilter === "All animals"
      ? available
      : available.filter((a) => a.type === activeFilter)
  ).slice(0, 6);

  return (
    <section className={styles.section}>
      <p className={styles.sectionTag}>Ready for Adoption</p>
      <h2 className={styles.sectionTitle}>Meet the ones looking for you</h2>
      <Link href="/adopt" className={styles.seeAll}>See all animals →</Link>

      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${f === activeFilter ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading animals...</p>
      ) : visible.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <div className={styles.grid}>
          {visible.map((animal) => (
            <div key={animal._id} className={styles.card}>
              <div className={styles.cardImage}>
                <div className={styles.cardBadges}>
                  <span className={styles.typeBadge}>{animal.type}</span>
                  <span className={styles.availBadge}>AVAILABLE</span>
                </div>
                {animal.images?.[0] ? (
                  <img src={animal.images[0]} alt={animal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  `photo · ${animal.name}`
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>
                  {animal.name}
                  <span className={styles.cardLocation}>{animal.location}</span>
                </h3>
                <p className={styles.cardMeta}>
                  {[animal.breed, animal.age ? `${animal.age} yrs` : null, animal.gender]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <Link href={`/adopt/${animal._id}`} className={styles.meetBtn}>
                  Meet {animal.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
