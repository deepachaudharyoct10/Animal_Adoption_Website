import styles from "./Animals.module.css";
import Link from "next/link";

const animals = [
  { id: 1, name: "Biscuit", location: "Portland", type: "Dog", breed: "Golden Retriever", age: "2 yrs", gender: "Male", trait: "Good with kids", image: "photo · golden retriever" },
  { id: 2, name: "Luna",    location: "Austin",   type: "Cat", breed: "Tabby",            age: "1 yr",  gender: "Female", trait: "House-trained",  image: "photo · grey tabby cat" },
  { id: 3, name: "Clover",  location: "Denver",   type: "Rabbit", breed: "Lop",           age: "8 mo",  gender: "Female", trait: "Loves cuddles",  image: "photo · lop-eared rabbit" },
  { id: 4, name: "Rusty",   location: "Seattle",  type: "Dog", breed: "Beagle mix",       age: "4 yrs", gender: "Male",   trait: "House-trained",  image: "photo · beagle mix dog" },
  { id: 5, name: "Mochi",   location: "Chicago",  type: "Cat", breed: "Calico",           age: "6 mo",  gender: "Female", trait: "Shy & sweet",    image: "photo · calico kitten" },
  { id: 6, name: "Pip",     location: "Boston",   type: "Bird", breed: "Cockatiel",       age: "2 yrs", gender: "Male",   trait: "Hand-tame",      image: "photo · grey cockatiel" },
];

const filters = ["All animals", "Dogs", "Cats", "Rabbits", "Birds"];

export default function Animals() {
  return (
    <section className={styles.section}>
      <p className={styles.sectionTag}>Ready for Adoption</p>
      <h2 className={styles.sectionTitle}>Meet the ones looking for you</h2>
      <Link href="/adopt" className={styles.seeAll}>See all animals →</Link>

      <div className={styles.filters}>
        {filters.map((f, i) => (
          <button key={f} className={`${styles.filterBtn} ${i === 0 ? styles.filterBtnActive : ""}`}>
            {f}
          </button>
        ))}
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
    </section>
  );
}
