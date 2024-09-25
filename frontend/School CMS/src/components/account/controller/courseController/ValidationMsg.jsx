import styles from "./ValidationMsg.module.css";

function ValidationMsg({ message, position, validity = "invalid", styleOpts }) {
    return (
        <span
            style={styleOpts}
            className={`${styles[validity]} ${styles[position]}`}
        >
            {message}
        </span>
    );
}

export default ValidationMsg;
