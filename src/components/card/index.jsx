import styles from "./card.module.css";

export default function Card({ children }) {
  return <section className={styles.card}>{children}</section>;
}
