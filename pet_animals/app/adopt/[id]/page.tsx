"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Animal } from "@/lib/types";
import { apiFetch, isLoggedIn } from "@/lib/apiClient";

export default function AnimalDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/pets/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data.searchAnimal ?? null))
      .catch(() => setAnimal(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !phoneNumber || !address || !occupation || !previousExperience) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/api/adoptions", {
        method: "POST",
        body: JSON.stringify({
          animalId: id,
          fullName,
          email,
          phoneNumber,
          address,
          occupation,
          previousExperience,
        }),
      });
      setSuccess("Your adoption request has been submitted! We'll be in touch soon.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p style={{ color: "#fff", padding: 56 }}>Loading...</p>
        <Footer />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p style={{ color: "#fff", padding: 56 }}>Animal not found.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.content}>
        <div>
          <div className={styles.imageBox}>
            {animal.images?.[0] ? (
              <img src={animal.images[0]} alt={animal.name} />
            ) : (
              `photo · ${animal.name}`
            )}
          </div>

          <div className={styles.badges}>
            <span className={styles.typeBadge}>{animal.type}</span>
            <span className={styles.statusBadge}>{animal.status}</span>
          </div>

          <h1 className={styles.name}>{animal.name}</h1>
          <p className={styles.location}>{animal.location}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Breed</span>
              <span className={styles.infoValue}>{animal.breed || "Unknown"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Age</span>
              <span className={styles.infoValue}>{animal.age ? `${animal.age} yrs` : "Unknown"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gender</span>
              <span className={styles.infoValue}>{animal.gender || "Unknown"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Health status</span>
              <span className={styles.infoValue}>{animal.healthStatus || "Not specified"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Vaccination</span>
              <span className={styles.infoValue}>{animal.vaccinationStatus || "Not specified"}</span>
            </div>
          </div>

          {animal.rescueStory && (
            <div className={styles.storyBox}>
              <h3 className={styles.storyTitle}>Rescue story</h3>
              <p className={styles.storyText}>{animal.rescueStory}</p>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.adoptBtn}
              onClick={() => setShowForm(true)}
              disabled={animal.status !== "available"}
            >
              {animal.status === "available" ? `Adopt ${animal.name}` : "Already adopted"}
            </button>
            <Link href="/donate" className={styles.donateBtn}>Donate</Link>
          </div>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            {!isLoggedIn() ? (
              <p className={styles.loginPrompt}>
                Please <Link href="/login">log in</Link> to submit an adoption request.
              </p>
            ) : success ? (
              <p className={styles.success}>{success}</p>
            ) : (
              <>
                <h2 className={styles.formTitle}>Adopt {animal.name}</h2>
                <p className={styles.formSubtitle}>Fill out the form below and our team will review it.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full name</label>
                    <input className={styles.input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone number</label>
                    <input className={styles.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Address</label>
                    <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Occupation</label>
                    <input className={styles.input} value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Previous pet experience</label>
                    <textarea
                      className={styles.textarea}
                      value={previousExperience}
                      onChange={(e) => setPreviousExperience(e.target.value)}
                    />
                  </div>

                  {error && <p className={styles.error}>{error}</p>}

                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit request"}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
