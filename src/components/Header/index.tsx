import { FC } from "react";
import styles from "./styles.module.scss";

export const Header: FC = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.active}>home</a>
                    <a>posts</a>
                </nav>
            </div>
        </header>
    )
}

