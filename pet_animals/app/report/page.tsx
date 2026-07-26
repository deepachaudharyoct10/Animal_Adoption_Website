"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { apiFetch, isLoggedIn } from "@/lib/apiClient";

const steps = [
  { num: "1", text: "Snap a photo of the animal" },
  { num: "2", text: "Share the location" },
  { num: "3", text: "Our team responds fast" },
];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ReportPage() {
  const router = useRouter();

  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(await fileToDataUrl(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    if (!animalType || !description || !street || !city || !reporterName || !reporterPhone || !photoFile) {
      setError("Please fill in all required fields and upload a photo.");
      return;
    }

    setSubmitting(true);
    try {
      const photo = photoPreview || (await fileToDataUrl(photoFile));
      await apiFetch("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          reporterName,
          reporterPhone,
          animalType,
          description,
          location: `${street}, ${city}${pincode ? " " + pincode : ""}`,
          photo,
        }),
      });
      setSuccess("Report submitted! Our rescue team has been notified.");
      setAnimalType("");
      setDescription("");
      setStreet("");
      setCity("");
      setPincode("");
      setReporterName("");
      setReporterPhone("");
      setPhotoFile(null);
      setPhotoPreview("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

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
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Animal details</span>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Animal type</label>
                  <select className={styles.select} value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
                    <option value="">Select type...</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Rabbit</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Description &amp; condition</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Describe what you saw, the animal's condition and behaviour — the more detail, the better our team can help..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Location</span>
              <div className={styles.field}>
                <label className={styles.label}>Street / area</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="e.g. Near Andheri station, platform 2 exit"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>City</label>
                  <input className={styles.input} type="text" placeholder="Mumbai" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Pincode</label>
                  <input className={styles.input} type="text" placeholder="400058" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Upload photo</span>
              <label className={styles.uploadBox} style={{ display: "block" }}>
                <span className={styles.uploadIcon}>📷</span>
                <p className={styles.uploadText}>{photoFile ? photoFile.name : "Tap to upload a photo"}</p>
                <p className={styles.uploadHint}>JPG, PNG up to 10MB</p>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
              </label>
              {photoPreview && (
                <img src={photoPreview} alt="preview" style={{ marginTop: 12, maxHeight: 160, borderRadius: 10 }} />
              )}
            </div>

            <div className={styles.divider} />

            <div className={styles.formSection}>
              <span className={styles.sectionLabel}>Your contact details</span>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Your name</label>
                  <input className={styles.input} type="text" placeholder="Deepa" value={reporterName} onChange={(e) => setReporterName(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone number</label>
                  <input className={styles.input} type="tel" placeholder="+91 98765 43210" value={reporterPhone} onChange={(e) => setReporterPhone(e.target.value)} />
                </div>
              </div>
            </div>

            {error && <p style={{ color: "#E8553A", fontSize: 13 }}>{error}</p>}
            {success && <p style={{ color: "#6A9A5A", fontSize: 13 }}>{success}</p>}

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit report →"}
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
