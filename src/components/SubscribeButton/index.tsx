import { FC } from "react"
import styles from "./styles.module.scss"

type SubscribeButtonProps = {
    priceId: string
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ priceId }) => {
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}