"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { apiFetch } from "@/lib/apiClient";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { AdoptionRequest, RescueReport, Donation } from "@/lib/types";

const adoptionBadge: Record<string, string> = {
  pending: "badgePending",
  approved: "badgeApproved",
  rejected: "badgeRejected",
};

const reportBadge: Record<string, string> = {
  pending: "badgePending",
  rescued: "badgeRescued",
  "not rescued": "badgeNotRescued",
};

export default function DashboardPage() {
  const ready = useAuthGuard();

  const [adoptions, setAdoptions] = useState<AdoptionRequest[]>([]);
  const [reports, setReports] = useState<RescueReport[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    Promise.all([
      apiFetch("/api/adoptions"),
      apiFetch("/api/reports"),
      apiFetch("/api/donations"),
    ])
      .then(([adoptionsRes, reportsRes, donationsRes]) => {
        setAdoptions(adoptionsRes.adoptionRequests ?? []);
        setReports(reportsRes.reports ?? []);
        setDonations(donationsRes.donations ?? []);
      })
      .finally(() => setLoading(false));
  }, [ready]);

  if (!ready) {
    return (
      <div className={styles.page}>
        <Navbar />
        <p style={{ color: "#666", padding: 48 }}>Checking access...</p>
        <Footer />
      </div>
    );
  }

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <h1 className={styles.title}>My Dashboard</h1>
        <p className={styles.subtitle}>Track your adoption requests, rescue reports and donations.</p>
      </section>

      <div className={styles.content}>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{adoptions.length}</span>
                <span className={styles.statLabel}>Adoption requests</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{reports.length}</span>
                <span className={styles.statLabel}>Reports submitted</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>₹{totalDonated}</span>
                <span className={styles.statLabel}>Total donated</span>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>My Adoption Requests</h2>
              {adoptions.length === 0 ? (
                <p className={styles.muted}>You haven&apos;t submitted any adoption requests yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Animal</th>
                        <th>Submitted</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adoptions.map((a) => (
                        <tr key={a._id}>
                          <td>
                            {a.animal?.images?.[0] ? (
                              <img src={a.animal.images[0]} alt={a.animal.name} className={styles.thumb} />
                            ) : (
                              <div className={styles.thumb} />
                            )}
                          </td>
                          <td>{a.animal?.name} ({a.animal?.type})</td>
                          <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`${styles.badge} ${styles[adoptionBadge[a.status]]}`}>{a.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>My Reports</h2>
              {reports.length === 0 ? (
                <p className={styles.muted}>You haven&apos;t reported any strays yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Animal type</th>
                        <th>Location</th>
                        <th>Submitted</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r._id}>
                          <td><img src={r.photo} alt="report" className={styles.thumb} /></td>
                          <td>{r.animalType}</td>
                          <td>{r.location}</td>
                          <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`${styles.badge} ${styles[reportBadge[r.rescueStatus]]}`}>{r.rescueStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>My Donations</h2>
              {donations.length === 0 ? (
                <p className={styles.muted}>You haven&apos;t made any donations yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Purpose</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d._id}>
                          <td>₹{d.amount}</td>
                          <td>{d.purpose || "-"}</td>
                          <td>{d.transactionId}</td>
                          <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
