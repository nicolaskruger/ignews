import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
const loggedColor = (logged: boolean) => {
    return logged ? "green" : "#eba417";
}

export const SignInButton: FC = () => {

    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button type="button"
            className={styles.signInButton}
        >
            <FaGithub color={"#84d361"} />
            Nícolas Krüger
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button type="button"
            className={styles.signInButton}
        >
            <FaGithub color={"#eba417"} />
            Sign in with Github
        </button>
    )
} 