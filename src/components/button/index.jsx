import styles from "./button.module.css";
import classNames from "classnames";
export default function Button({ children, variant, ...rest }) {
  return (
    <button
      {...rest}
      className={classNames(styles.button, styles[`button-${variant}`])}
    >
      {children}
    </button>
  );
}
