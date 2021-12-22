import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export const Header: FC = () => {

    const router = useRouter();

    const validClassPath = (expected: string) => {
        return router.pathname === expected ? styles.active : ""
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <Link href={"/"}>
                        <a className={validClassPath("/")}>home</a>
                    </Link>
                    <Link href={"/posts"} prefetch>
                        <a className={validClassPath("/posts")}>
                            posts
                        </a>
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}

