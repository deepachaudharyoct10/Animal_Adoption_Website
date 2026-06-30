import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBg} />
        <h2 className={styles.ctaTitle}>A home is waiting to be filled</h2>
        <p className={styles.ctaDesc}>
          Adopt, foster, donate or volunteer — every small act gives an animal a second chance.
        </p>
        <Link href="/adopt" className={styles.ctaBtn}>Start adopting today</Link>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>H</div>
              <span className={styles.footerLogoName}>Haven</span>
            </Link>
            <p>A community rescue connecting animals with the people who&apos;ll love them.</p>
          </div>

          <div className={styles.footerCol}>
            <h4>Adopt</h4>
            <ul>
              <li><Link href="/adopt/dogs">Dogs</Link></li>
              <li><Link href="/adopt/cats">Cats</Link></li>
              <li><Link href="/adopt/small-animals">Small animals</Link></li>
              <li><Link href="/adopt/faq">Adoption FAQ</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Get involved</h4>
            <ul>
              <li><Link href="/report">Report a stray</Link></li>
              <li><Link href="/donate">Donate</Link></li>
              <li><Link href="/volunteer">Volunteer</Link></li>
              <li><Link href="/foster">Foster</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Haven</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/stories">Success stories</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/login">Log in</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.copyright}>© 2026 Haven Animal Rescue. Made with care.</span>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
