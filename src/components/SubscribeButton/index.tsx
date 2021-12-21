import { useSession, signIn } from "next-auth/react"
import { FC } from "react"
import { api } from "../../service/api"
import getStripeJs from "../../service/stripe.js"
import styles from "./styles.module.scss"

type SubscribeButtonProps = {
    priceId: string
}

export const SubscribeButton: FC<SubscribeButtonProps> = ({ priceId }) => {

    const { data: session } = useSession();

    const handleSubscrbe = async () => {
        if (!session) {
            signIn('github');
            return;
        }

        try {
            const response = await api.post('/subscribe')


            const { sessionId } = response.data;

            const stripeJs = await getStripeJs();

            await stripeJs.redirectToCheckout({
                sessionId
            })

        } catch (error) {
            alert(error.message)
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