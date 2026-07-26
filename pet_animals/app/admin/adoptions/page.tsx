"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { apiFetch } from "@/lib/apiClient";
import { AdoptionRequest } from "@/lib/types";

const badgeByStatus: Record<string, string> = {
  pending: "badgePending",
  approved: "badgeApproved",
  rejected: "badgeRejected",
};

export default function AdminAdoptionsPage() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  function load() {
    setLoading(true);
    apiFetch("/api/adoptions")
      .then((data) => setRequests(data.adoptionRequests ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setUpdatingId(id);
    try {
      await apiFetch(`/api/adoptions/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
      load();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Adoption requests</h1>
      <p className={styles.pageSubtitle}>Review, approve or reject adoption applications.</p>

      <div className={styles.card}>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : requests.length === 0 ? (
          <p className={styles.muted}>No adoption requests yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Animal</th>
                  <th>Occupation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.fullName}<br /><span className={styles.muted}>{r.address}</span></td>
                    <td>
                      <a href={`mailto:${r.email}`} style={{ color: "#E8553A" }}>{r.email}</a>
                      <br />
                      <a href={`tel:${r.phoneNumber}`} style={{ color: "#999" }}>{r.phoneNumber}</a>
                    </td>
                    <td>{r.animal?.name} ({r.animal?.type})</td>
                    <td>{r.occupation}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[badgeByStatus[r.status]]}`}>{r.status}</span>
                    </td>
                    <td>
                      {r.status === "pending" ? (
                        <>
                          <button
                            className={`${styles.actionBtn} ${styles.approveBtn}`}
                            disabled={updatingId === r._id}
                            onClick={() => updateStatus(r._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.rejectBtn}`}
                            disabled={updatingId === r._id}
                            onClick={() => updateStatus(r._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={styles.muted}>—</span>
                      )}
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
