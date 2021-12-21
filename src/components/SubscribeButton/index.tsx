import { useSession, signIn } from "next-auth/react"
import { FC } from "react"
import styles from "./styles.module.scss"

type SubscribeButtonProps = {
    priceId: string
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ priceId }) => {

    const { data: session } = useSession();

    const handleSubscrbe = () => {
        if (!session) {
            signIn('github');
            return;
        }



    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscrbe}
        >
            Subscribe now
        </button>
    )
}