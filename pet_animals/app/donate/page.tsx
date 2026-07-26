"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { apiFetch, isLoggedIn } from "@/lib/apiClient";
import { loadRazorpayScript } from "@/lib/loadRazorpayScript";

const presetAmounts = [500, 1000, 2000, 5000];

export default function DonatePage() {
  return (
    <Suspense fallback={null}>
      <DonateForm />
    </Suspense>
  );
}

function DonateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [amount, setAmount] = useState(Number(searchParams.get("amount")) || presetAmounts[1]);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      setEmail(user.email ?? "");
    }
  }, []);

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    if (!donorName || !email || !amount || amount <= 0) {
      setError("Please enter your name, email and a valid amount.");
      return;
    }

    setProcessing(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay checkout. Please check your connection.");
      }

      const order = await apiFetch("/api/donations/order", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      const razorpay = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Haven Animal Rescue",
        description: "Donation towards animal welfare",
        order_id: order.orderId,
        prefill: { name: donorName, email },
        theme: { color: "#E8553A" },
        handler: async (response) => {
          try {
            await apiFetch("/api/donations/verify", {
              method: "POST",
              body: JSON.stringify({
                ...response,
                amount,
                donorName,
                email,
                purpose: "General donation",
              }),
            });
            setSuccess(true);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed.");
          }
        },
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.tag}>
          <span className={styles.tagDot}></span>
          Support the work
        </div>
        <h1 className={styles.title}>Make a donation</h1>
        <p className={styles.desc}>
          Every rupee goes straight to food, medical treatment, shelter and rescue operations.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.formCard}>
          {success ? (
            <p className={styles.success}>
              Thank you, {donorName}! Your donation of ₹{amount} was received successfully.
            </p>
          ) : (
            <form onSubmit={handleDonate}>
              {error && <p className={styles.error}>{error}</p>}

              {!isLoggedIn() && (
                <p className={styles.error}>
                  Please <Link href="/login">log in</Link> to donate.
                </p>
              )}

              <div className={styles.amounts}>
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    className={`${styles.amountBtn} ${amt === amount ? styles.amountBtnActive : ""}`}
                    onClick={() => setAmount(amt)}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Custom amount (₹)</label>
                <input
                  className={styles.input}
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Your name</label>
                <input className={styles.input} value={donorName} onChange={(e) => setDonorName(e.target.value)} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={processing}>
                {processing ? "Processing..." : `Donate ₹${amount}`}
              </button>

              <p className={styles.secureNote}>Secure payment via Razorpay</p>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
