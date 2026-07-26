"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { apiFetch } from "@/lib/apiClient";
import { Donation } from "@/lib/types";

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/donations")
      .then((data) => setDonations(data.donations ?? []))
      .finally(() => setLoading(false));
  }, []);

  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const now = new Date();
  const thisMonth = donations
    .filter((d) => {
      const dt = new Date(d.createdAt);
      return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
    })
    .reduce((sum, d) => sum + d.amount, 0);

  const byMonth = donations.reduce<Record<string, number>>((acc, d) => {
    const key = monthKey(d.createdAt);
    acc[key] = (acc[key] ?? 0) + d.amount;
    return acc;
  }, {});

  return (
    <div>
      <h1 className={styles.pageTitle}>Donations</h1>
      <p className={styles.pageSubtitle}>Track donation records and contributions over time.</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>₹{total}</span>
          <span className={styles.statLabel}>Total raised</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>₹{thisMonth}</span>
          <span className={styles.statLabel}>This month</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{donations.length}</span>
          <span className={styles.statLabel}>Total donations</span>
        </div>
      </div>

      {Object.keys(byMonth).length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Monthly breakdown</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(byMonth).map(([month, amount]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>₹{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>All donations</h2>
        </div>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : donations.length === 0 ? (
          <p className={styles.muted}>No donations yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td>{d.donorName}</td>
                  <td>{d.email || "-"}</td>
                  <td>₹{d.amount}</td>
                  <td>{d.purpose || "-"}</td>
                  <td>{d.transactionId}</td>
                  <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
