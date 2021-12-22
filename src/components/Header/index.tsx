import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export const Header: FC = () => {

    const { asPath } = useRouter();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink href={"/"} activeClassName={styles.active}>
                        home
                    </ActiveLink>
                    <ActiveLink href={"/posts"} activeClassName={styles.active}>
                        posts
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}

