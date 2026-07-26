"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { apiFetch } from "@/lib/apiClient";
import { Animal } from "@/lib/types";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const emptyForm = {
  name: "",
  type: "",
  age: "",
  breed: "",
  gender: "",
  healthStatus: "",
  vaccinationStatus: "",
  rescueStory: "",
  location: "",
  status: "available",
};

export default function AdminAnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function loadAnimals() {
    setLoading(true);
    apiFetch("/api/pets")
      .then((data) => setAnimals(data.animal ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadAnimals();
  }, []);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setImage("");
    setError("");
    setShowForm(true);
  }

  function openEditForm(animal: Animal) {
    setEditingId(animal._id);
    setForm({
      name: animal.name,
      type: animal.type,
      age: animal.age?.toString() ?? "",
      breed: animal.breed ?? "",
      gender: animal.gender ?? "",
      healthStatus: animal.healthStatus ?? "",
      vaccinationStatus: animal.vaccinationStatus ?? "",
      rescueStory: animal.rescueStory ?? "",
      location: animal.location,
      status: animal.status,
    });
    setImage(animal.images?.[0] ?? "");
    setError("");
    setShowForm(true);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(await fileToDataUrl(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.type || !form.location) {
      setError("Name, type and location are required.");
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        name: form.name,
        type: form.type,
        age: form.age ? Number(form.age) : undefined,
        breed: form.breed || undefined,
        gender: form.gender || undefined,
        healthStatus: form.healthStatus || undefined,
        vaccinationStatus: form.vaccinationStatus || undefined,
        rescueStory: form.rescueStory || undefined,
        location: form.location,
        status: form.status,
        images: image ? [image] : [],
      };

      if (editingId) {
        await apiFetch(`/api/pets/${editingId}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiFetch("/api/pets", { method: "POST", body: JSON.stringify(body) });
      }

      setShowForm(false);
      loadAnimals();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this animal?")) return;
    await apiFetch(`/api/pets/${id}`, { method: "DELETE" });
    loadAnimals();
  }

  return (
    <div>
      <div className={styles.cardHeader}>
        <div>
          <h1 className={styles.pageTitle}>Animals</h1>
          <p className={styles.pageSubtitle}>Add, edit and manage animal records.</p>
        </div>
        <button className={styles.primaryBtn} onClick={openAddForm}>+ Add animal</button>
      </div>

      {showForm && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{editingId ? "Edit animal" : "Add animal"}</h2>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Type</label>
              <input className={styles.input} placeholder="Dog, Cat, Rabbit..." value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Age (years)</label>
              <input className={styles.input} type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Breed</label>
              <input className={styles.input} value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Gender</label>
              <select className={styles.input} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="">Unknown</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Location</label>
              <input className={styles.input} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Health status</label>
              <input className={styles.input} value={form.healthStatus} onChange={(e) => setForm({ ...form, healthStatus: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Vaccination status</label>
              <input className={styles.input} value={form.vaccinationStatus} onChange={(e) => setForm({ ...form, vaccinationStatus: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Adoption status</label>
              <select className={styles.input} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Photo</label>
              <input className={styles.input} type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className={`${styles.field} ${styles.fieldFull}`}>
              <label className={styles.label}>Rescue story</label>
              <textarea className={styles.textarea} value={form.rescueStory} onChange={(e) => setForm({ ...form, rescueStory: e.target.value })} />
            </div>

            {image && <img src={image} alt="preview" className={styles.thumb} style={{ width: 80, height: 80 }} />}

            <div className={styles.fieldFull} style={{ display: "flex", gap: 12 }}>
              <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                {submitting ? "Saving..." : editingId ? "Save changes" : "Add animal"}
              </button>
              <button type="button" className={styles.secondaryBtn} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.card}>
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal._id}>
                  <td>
                    {animal.images?.[0] ? (
                      <img src={animal.images[0]} alt={animal.name} className={styles.thumb} />
                    ) : (
                      <div className={styles.thumb} />
                    )}
                  </td>
                  <td>{animal.name}</td>
                  <td>{animal.type}</td>
                  <td>{animal.breed || "-"}</td>
                  <td>{animal.location}</td>
                  <td>
                    <span className={`${styles.badge} ${animal.status === "available" ? styles.badgeAvailable : styles.badgeAdopted}`}>
                      {animal.status}
                    </span>
                  </td>
                  <td>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditForm(animal)}>Edit</button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(animal._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
