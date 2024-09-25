import styles from "./SuccessMsg.module.css";

function SuccessMsg({ message }) {
    return (
        <div className={styles.successMsg}>
            <p>{message}</p>
        </div>
    );
}

export default SuccessMsg;
