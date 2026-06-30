import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const info = [
  { icon: "📍", title: "Visit us",     text: "12 Rescue Lane, Andheri West\nMumbai, Maharashtra 400058" },
  { icon: "📧", title: "Email us",     text: "hello@havenrescue.in\nadopt@havenrescue.in" },
  { icon: "📞", title: "Call us",      text: "+91 98765 43210\nMon–Sat, 9am – 6pm" },
  { icon: "🕐", title: "Shelter hours", text: "Mon–Fri: 9am – 7pm\nSat–Sun: 10am – 5pm" },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Get in touch
        </div>
        <h1 className={styles.title}>We&apos;d love to hear from you</h1>
        <p className={styles.desc}>
          Have a question about adopting, fostering, or volunteering? Reach out — our team responds within 24 hours.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.infoSide}>
          {info.map((item) => (
            <div key={item.title} className={styles.infoCard}>
              <span className={styles.infoIcon}>{item.icon}</span>
              <div>
                <h3 className={styles.infoTitle}>{item.title}</h3>
                <p className={styles.infoText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Send us a message</h2>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>First name</label>
                <input className={styles.input} type="text" placeholder="Deepa" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last name</label>
                <input className={styles.input} type="text" placeholder="Chaudhary" />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" placeholder="deepa@gmail.com" />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Subject</label>
              <input className={styles.input} type="text" placeholder="I want to adopt a dog..." />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea className={styles.textarea} placeholder="Tell us how we can help..." />
            </div>

            <button type="submit" className={styles.submitBtn}>Send message</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
