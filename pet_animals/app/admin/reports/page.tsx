"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { apiFetch } from "@/lib/apiClient";
import { RescueReport } from "@/lib/types";

const badgeByStatus: Record<string, string> = {
  pending: "badgePending",
  rescued: "badgeRescued",
  "not rescued": "badgeNotRescued",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<RescueReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  function load() {
    setLoading(true);
    apiFetch("/api/reports")
      .then((data) => setReports(data.reports ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, rescueStatus: string) {
    setUpdatingId(id);
    try {
      await apiFetch(`/api/reports/${id}`, { method: "PUT", body: JSON.stringify({ rescueStatus }) });
      load();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Rescue reports</h1>
      <p className={styles.pageSubtitle}>Track and update the status of reported strays.</p>

      <div className={styles.card}>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : reports.length === 0 ? (
          <p className={styles.muted}>No rescue reports yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Reporter</th>
                  <th>Animal type</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r._id}>
                    <td><img src={r.photo} alt="report" className={styles.thumb} /></td>
                    <td>
                      {r.reporterName}
                      <br />
                      <a href={`tel:${r.reporterPhone}`} style={{ color: "#999" }}>{r.reporterPhone}</a>
                    </td>
                    <td>{r.animalType}</td>
                    <td>{r.location}</td>
                    <td style={{ maxWidth: 260 }}>{r.description}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[badgeByStatus[r.rescueStatus]]}`} style={{ marginBottom: 6, display: "inline-block" }}>
                        {r.rescueStatus}
                      </span>
                      <br />
                      <select
                        className={styles.select}
                        value={r.rescueStatus}
                        disabled={updatingId === r._id}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="rescued">Rescued</option>
                        <option value="not rescued">Not rescued</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
