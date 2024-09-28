import styles from "./input.module.css";
import { forwardRef } from "react";
export default forwardRef(function Input({ error, ...rest }, ref) {
  return (
    <div className={styles.container}>
      <input
        {...rest}
        ref={ref}
        className={styles.input}
        aria-invalid={!!error}
      />
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
});
