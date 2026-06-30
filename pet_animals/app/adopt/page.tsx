import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

const animals = [
  { id: 1,  name: "Biscuit", location: "Mumbai",   type: "Dog",    breed: "Golden Retriever", age: "2 yrs",  gender: "Male",   trait: "Good with kids",  image: "photo · golden retriever" },
  { id: 2,  name: "Luna",    location: "Delhi",     type: "Cat",    breed: "Tabby",            age: "1 yr",   gender: "Female", trait: "House-trained",   image: "photo · grey tabby cat" },
  { id: 3,  name: "Clover",  location: "Bengaluru", type: "Rabbit", breed: "Lop",              age: "8 mo",   gender: "Female", trait: "Loves cuddles",   image: "photo · lop rabbit" },
  { id: 4,  name: "Rusty",   location: "Chennai",   type: "Dog",    breed: "Beagle mix",       age: "4 yrs",  gender: "Male",   trait: "House-trained",   image: "photo · beagle mix" },
  { id: 5,  name: "Mochi",   location: "Hyderabad", type: "Cat",    breed: "Calico",           age: "6 mo",   gender: "Female", trait: "Shy & sweet",     image: "photo · calico kitten" },
  { id: 6,  name: "Pip",     location: "Pune",      type: "Bird",   breed: "Cockatiel",        age: "2 yrs",  gender: "Male",   trait: "Hand-tame",       image: "photo · grey cockatiel" },
  { id: 7,  name: "Max",     location: "Mumbai",    type: "Dog",    breed: "Labrador",         age: "3 yrs",  gender: "Male",   trait: "Energetic",       image: "photo · labrador" },
  { id: 8,  name: "Bella",   location: "Delhi",     type: "Cat",    breed: "Persian",          age: "2 yrs",  gender: "Female", trait: "Calm & gentle",   image: "photo · persian cat" },
  { id: 9,  name: "Oliver",  location: "Bengaluru", type: "Rabbit", breed: "Angora",           age: "1 yr",   gender: "Male",   trait: "Fluffy & playful",image: "photo · angora rabbit" },
];

const types   = ["Dog", "Cat", "Rabbit", "Bird"];
const genders = ["Male", "Female"];
const ages    = ["Under 1 year", "1–3 years", "3–7 years", "7+ years"];
const cities  = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Pune"];

export default function AdoptPage() {
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
          <input className={styles.searchInput} type="text" placeholder="Search by name or breed..." />
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
                  <input type="checkbox" />
                  <span className={styles.filterOptionLabel}>
                    {t}
                    <span className={styles.filterCount}>{animals.filter(a => a.type === t).length}</span>
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
                  <input type="radio" name="gender" />
                  <span className={styles.filterOptionLabel}>
                    {g}
                    <span className={styles.filterCount}>{animals.filter(a => a.gender === g).length}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Age range</h3>
            <div className={styles.filterOptions}>
              {ages.map((a) => (
                <label key={a} className={styles.filterOption}>
                  <input type="checkbox" />
                  <span className={styles.filterOptionLabel}>{a}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Location</h3>
            <div className={styles.filterOptions}>
              {cities.map((c) => (
                <label key={c} className={styles.filterOption}>
                  <input type="checkbox" />
                  <span className={styles.filterOptionLabel}>
                    {c}
                    <span className={styles.filterCount}>{animals.filter(a => a.location === c).length}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className={styles.clearBtn}>Clear all filters</button>
        </aside>

        <main className={styles.main}>
          <div className={styles.topBar}>
            <p className={styles.resultCount}><span>{animals.length}</span> animals found</p>
            <select className={styles.sortSelect}>
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Name A–Z</option>
            </select>
          </div>

          <div className={styles.grid}>
            {animals.map((animal) => (
              <div key={animal.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <div className={styles.cardBadges}>
                    <span className={styles.typeBadge}>{animal.type}</span>
                    <span className={styles.availBadge}>AVAILABLE</span>
                  </div>
                  {animal.image}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>
                    {animal.name}
                    <span className={styles.cardLocation}>{animal.location}</span>
                  </h3>
                  <p className={styles.cardMeta}>{animal.breed} · {animal.age} · {animal.gender}</p>
                  <div className={styles.cardTrait}>
                    <span className={styles.traitDot}>●</span>
                    {animal.trait}
                  </div>
                  <Link href={`/adopt/${animal.id}`} className={styles.meetBtn}>
                    Meet {animal.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
