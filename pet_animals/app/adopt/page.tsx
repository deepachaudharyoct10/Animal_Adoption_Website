"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Animal } from "@/lib/types";

const genders = ["male", "female"];
const ageRanges = ["Under 1 year", "1–3 years", "3–7 years", "7+ years"];

function ageBucket(age?: number): string | null {
  if (age == null) return null;
  if (age < 1) return "Under 1 year";
  if (age <= 3) return "1–3 years";
  if (age <= 7) return "3–7 years";
  return "7+ years";
}

export default function AdoptPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sort, setSort] = useState("Newest first");

  useEffect(() => {
    fetch("/api/pets")
      .then((res) => res.json())
      .then((data) => setAnimals((data.animal ?? []).filter((a: Animal) => a.status === "available")))
      .catch(() => setAnimals([]))
      .finally(() => setLoading(false));
  }, []);

  const types = useMemo(() => Array.from(new Set(animals.map((a) => a.type))), [animals]);
  const locations = useMemo(() => Array.from(new Set(animals.map((a) => a.location))), [animals]);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    let result = animals.filter((a) => {
      const matchesSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.breed ?? "").toLowerCase().includes(search.toLowerCase()) ||
        a.type.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(a.type);
      const matchesGender = !selectedGender || a.gender === selectedGender;
      const matchesAge = selectedAges.length === 0 || selectedAges.includes(ageBucket(a.age) ?? "");
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(a.location);
      return matchesSearch && matchesType && matchesGender && matchesAge && matchesLocation;
    });

    if (sort === "Name A–Z") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Oldest first") {
      result = [...result].sort(
        (a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
      );
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
      );
    }

    return result;
  }, [animals, search, selectedTypes, selectedGender, selectedAges, selectedLocations, sort]);

  function clearFilters() {
    setSearch("");
    setSelectedTypes([]);
    setSelectedGender(null);
    setSelectedAges([]);
    setSelectedLocations([]);
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Ready for adoption
        </div>
        <h1 className={styles.title}>Find your perfect companion</h1>
        <p className={styles.subtitle}>Browse {animals.length} animals waiting for their forever home</p>

        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name or breed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Animal type</h3>
            <div className={styles.filterOptions}>
              {types.map((t) => (
                <label key={t} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(t)}
                    onChange={() => toggle(selectedTypes, t, setSelectedTypes)}
                  />
                  <span className={styles.filterOptionLabel}>
                    {t}
                    <span className={styles.filterCount}>{animals.filter((a) => a.type === t).length}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Gender</h3>
            <div className={styles.filterOptions}>
              {genders.map((g) => (
                <label key={g} className={styles.filterOption}>
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === g}
                    onChange={() => setSelectedGender(selectedGender === g ? null : g)}
                  />
                  <span className={styles.filterOptionLabel}>
                    {g}
                    <span className={styles.filterCount}>{animals.filter((a) => a.gender === g).length}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Age range</h3>
            <div className={styles.filterOptions}>
              {ageRanges.map((a) => (
                <label key={a} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={selectedAges.includes(a)}
                    onChange={() => toggle(selectedAges, a, setSelectedAges)}
                  />
                  <span className={styles.filterOptionLabel}>{a}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Location</h3>
            <div className={styles.filterOptions}>
              {locations.map((c) => (
                <label key={c} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(c)}
                    onChange={() => toggle(selectedLocations, c, setSelectedLocations)}
                  />
                  <span className={styles.filterOptionLabel}>
                    {c}
                    <span className={styles.filterCount}>{animals.filter((a) => a.location === c).length}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className={styles.clearBtn} onClick={clearFilters}>Clear all filters</button>
        </aside>

        <main className={styles.main}>
          <div className={styles.topBar}>
            <p className={styles.resultCount}><span>{filtered.length}</span> animals found</p>
            <select className={styles.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Name A–Z</option>
            </select>
          </div>

          {loading ? (
            <p>Loading animals...</p>
          ) : filtered.length === 0 ? (
            <p>No animals match your filters.</p>
          ) : (
            <div className={styles.grid}>
              {filtered.map((animal) => (
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
        </main>
      </div>

      <Footer />
    </div>
  );
}
