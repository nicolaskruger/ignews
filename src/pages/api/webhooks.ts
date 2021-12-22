import { NextApiRequest, NextApiResponse, NextConfig } from "next"
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../service/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

const buffer = async (readeble: Readable) => {
    const chunks = [];

    for await (const chunck of readeble) {
        chunks.push(
            typeof chunck === "string" ? Buffer.from(chunck) : chunck
        )
    }

    return Buffer.concat(chunks)
}

const relevantEvents = new Set([
    'checkout.session.completed',
    // "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
])

const subscriptionOper = async (event: Stripe.Event, created = false) => {
    const subscription = event.data.object as Stripe.Subscription;

    await saveSubscription(
        subscription.id,
        subscription.customer.toString(),
        created
    )

}

const eventOperator = {
    // "customer.subscription.created": (event: Stripe.Event) => subscriptionOper(event, true),
    "customer.subscription.updated": subscriptionOper,
    "customer.subscription.deleted": subscriptionOper,
    "checkout.session.completed": async (event: Stripe.Event) => {

        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        await saveSubscription(
            checkoutSession.subscription.toString(),
            checkoutSession.customer.toString(),
            true
        )
    }
}


const webhooks = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method not allowed");
    }
    const buf = await buffer(req);

    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf,
            secret,
            process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`)
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
        console.log("Evento recebido", event)

        try {
            if (eventOperator[type]) {
                await eventOperator[type](event);
            } else {
                throw new Error("Unhandle event.")
            }
        } catch (error) {
            return res.json({ error: "webhookehandle failed" })
        }
    }

    res.status(200).json({ received: true })
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default webhooks