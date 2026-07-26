"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { apiFetch } from "@/lib/apiClient";
import { Animal, AdoptionRequest, RescueReport, Donation } from "@/lib/types";

export default function AdminDashboardPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>([]);
  const [reports, setReports] = useState<RescueReport[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/pets"),
      apiFetch("/api/adoptions"),
      apiFetch("/api/reports"),
      apiFetch("/api/donations"),
    ])
      .then(([petsRes, adoptionsRes, reportsRes, donationsRes]) => {
        setAnimals(petsRes.animal ?? []);
        setAdoptions(adoptionsRes.adoptionRequests ?? []);
        setReports(reportsRes.reports ?? []);
        setDonations(donationsRes.donations ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  const stats = [
    { label: "Total animals", value: animals.length },
    { label: "Available", value: animals.filter((a) => a.status === "available").length },
    { label: "Adopted", value: animals.filter((a) => a.status === "adopted").length },
    { label: "Pending adoption requests", value: adoptions.filter((a) => a.status === "pending").length },
    { label: "Rescue reports", value: reports.length },
    { label: "Total donations", value: `₹${totalDonations}` },
  ];

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p className={styles.pageSubtitle}>Overview of animals, adoptions, rescues and donations.</p>

      {loading ? (
        <p className={styles.muted}>Loading...</p>
      ) : (
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
