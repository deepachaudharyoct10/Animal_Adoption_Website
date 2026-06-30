import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const values = [
  { icon: "🐾", title: "Every life matters",    desc: "We believe every animal, regardless of age or breed, deserves love, safety, and a permanent home." },
  { icon: "🤝", title: "Community first",       desc: "We build bridges between animals in need and the compassionate people who can give them a forever home." },
  { icon: "❤️", title: "Transparent care",      desc: "Every donation and adoption fee goes directly to veterinary care, food, and shelter for rescued animals." },
];

const team = [
  { name: "Priya Sharma",   role: "Founder & Director" },
  { name: "Arjun Mehta",   role: "Head of Rescue Ops" },
  { name: "Sneha Iyer",    role: "Adoption Coordinator" },
  { name: "Rahul Verma",   role: "Vet & Animal Care" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Our story
        </div>
        <h1 className={styles.title}>Built for the ones who can&apos;t speak</h1>
        <p className={styles.desc}>
          Haven started in 2019 with one rescued dog and a small apartment. Today
          we&apos;ve rehomed 1,800+ animals across India — and we&apos;re just getting started.
        </p>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionImg}>photo · rescue team in action</div>
        <div>
          <span className={styles.missionTag}>Our Mission</span>
          <h2 className={styles.missionTitle}>Rescue. Rehabilitate. Rehome.</h2>
          <p className={styles.missionDesc}>
            We rescue stray and abandoned animals from the streets, provide them with
            medical care, and find them loving families. Our network of volunteers and
            foster homes ensures every animal gets the care and attention they deserve
            before finding their forever home.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>What we stand for</h2>
        <div className={styles.valuesGrid}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Meet the team</h2>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.teamAvatar}></div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
