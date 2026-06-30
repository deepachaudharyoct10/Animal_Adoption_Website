import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const steps = [
  { num: "1", text: "Snap a photo of the animal" },
  { num: "2", text: "Share the location" },
  { num: "3", text: "Our team responds fast" },
];

export default function ReportPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Report a stray
        </div>
        <h1 className={styles.title}>Found a stray or injured animal?</h1>
        <p className={styles.desc}>
          Report it in under a minute. Our rescue team is on call any hour,
          any day — we&apos;ll take it from there.
        </p>

        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <span className={styles.stepText}>{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.formCard}>
          <form className={styles.form}>

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Animal details</span>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Animal type</label>
                  <select className={styles.select}>
                    <option value="">Select type...</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Rabbit</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Approximate age</label>
                  <select className={styles.select}>
                    <option value="">Select age...</option>
                    <option>Puppy / Kitten (under 6 months)</option>
                    <option>Young (6 months – 2 years)</option>
                    <option>Adult (2 – 7 years)</option>
                    <option>Senior (7+ years)</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Gender (if visible)</label>
                  <select className={styles.select}>
                    <option value="">Unknown</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Colour / markings</label>
                  <input className={styles.input} type="text" placeholder="e.g. brown with white patch" />
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Condition & behaviour</span>

              <div className={styles.field}>
                <label className={styles.label}>Physical condition</label>
                <select className={styles.select}>
                  <option value="">Select condition...</option>
                  <option>Appears healthy</option>
                  <option>Minor injuries</option>
                  <option>Serious injuries / bleeding</option>
                  <option>Very thin / malnourished</option>
                  <option>Unconscious / unresponsive</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Behaviour</label>
                <select className={styles.select}>
                  <option value="">Select behaviour...</option>
                  <option>Calm and approachable</option>
                  <option>Scared but not aggressive</option>
                  <option>Aggressive / biting</option>
                  <option>Very weak / cannot move</option>
                  <option>Running around / disoriented</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Additional description</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Describe what you saw — the more detail, the better our team can help..."
                />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Location</span>
              <div className={styles.field}>
                <label className={styles.label}>Street / area</label>
                <input className={styles.input} type="text" placeholder="e.g. Near Andheri station, platform 2 exit" />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>City</label>
                  <input className={styles.input} type="text" placeholder="Mumbai" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Pincode</label>
                  <input className={styles.input} type="text" placeholder="400058" />
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Upload photos</span>
              <div className={styles.uploadBox}>
                <span className={styles.uploadIcon}>📷</span>
                <p className={styles.uploadText}>Tap to upload photos</p>
                <p className={styles.uploadHint}>JPG, PNG up to 10MB · Max 5 photos</p>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Your contact details</span>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Your name</label>
                  <input className={styles.input} type="text" placeholder="Deepa" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone number</label>
                  <input className={styles.input} type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email (optional)</label>
                <input className={styles.input} type="email" placeholder="deepa@gmail.com" />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit report →
            </button>
          </form>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>What happens next?</h3>
            <ul className={styles.infoList}>
              <li>Your report is reviewed within 30 minutes</li>
              <li>A rescue volunteer is dispatched to the location</li>
              <li>The animal is assessed by our vet team</li>
              <li>You receive status updates via SMS/email</li>
              <li>The animal enters our care and rehoming program</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Tips for reporting</h3>
            <ul className={styles.infoList}>
              <li>Take photos from a safe distance</li>
              <li>Note nearby landmarks for accurate location</li>
              <li>Do not try to move a seriously injured animal</li>
              <li>Stay nearby if it is safe to do so</li>
            </ul>
          </div>

          <div className={styles.emergencyCard}>
            <h3 className={styles.emergencyTitle}>🚨 Emergency rescue</h3>
            <p className={styles.emergencyText}>
              Animal in immediate danger? Call us directly — we respond 24/7.
            </p>
            <span className={styles.emergencyNumber}>+91 98765 43210</span>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
