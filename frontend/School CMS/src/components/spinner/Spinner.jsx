import styles from "./Spinner.module.css";

function Spinner({ size }) {
    if (!size) size = "big";

    return (
        <div className={styles.spinnerContainer}>
            <div className={`${styles.spinner} ${styles[size]}`}></div>
        </div>
    );
}

export default Spinner;
