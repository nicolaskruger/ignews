import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/react";

const loggedColor = (logged: boolean) => {
    return logged ? "green" : "#eba417";
}

export const SignInButton: FC = () => {

    const { data: session } = useSession();


    return session ? (
        <button type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color={"#84d361"} />
            {session?.user?.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn("github")}
        >
            <FaGithub color={"#eba417"} />
            Sign in with Github
        </button>
    )
} 