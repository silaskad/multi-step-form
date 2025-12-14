import express from 'express'
import { randomUUID } from 'node:crypto'

const router = express.Router();

const product = {
    plan: {
        monthly: [
            {
                id: randomUUID(),
                name: "Arcade",
                price: {
                    currency: "USD",
                    regular: 9,
                    sale: "",
                },
                image: "/assets/images/icon-arcade.svg",
            },
            {
                id: randomUUID(),
                name: "Advanced",
                price: {
                    currency: "USD",
                    regular: 12,
                    sale: "",
                },
                image: "/assets/images/icon-advanced.svg",
            },
            {
                id: randomUUID(),
                name: "Pro",
                price: {
                    currency: "USD",
                    regular: 15,
                    sale: "",
                },
                image: "/assets/images/icon-pro.svg",
            },
        ],
        yearly: []
    },
    
    addons: {
        monthly: [
            {
                id: randomUUID(),
                name: "Online service",
                description: "Access to multiplayer games",
                price: {
                    currency: "USD",
                    regular: 1
                },
                image: "/assets/images/icon-checkmark.svg"
            },
            {
                id: randomUUID(),
                name: "Larger storage",
                description: "Extra 1TB of cloud save",
                price: {
                    currency: "USD",
                    regular: 2
                },
                image: "/assets/images/icon-checkmark.svg"
            },
            {
                id: randomUUID(),
                name: "Customizable Profile",
                description: "Custom theme on your profile",
                price: {
                    currency: "USD",
                    regular: 2
                },
                image: "/assets/images/icon-checkmark.svg"
            },
        ],
        yearly: []
    },

    calculateYearly() {
        return {
            ...this,
            plan: {
                ...this.plan,
                yearly: this.plan.monthly.map(plan => ({
                    ...plan,
                    price: {
                        ...plan.price,
                        regular: plan.price.regular * 10,
                        sale: "2 months free"
                    }
                }))
            },
            addons: {
                ...this.addons,
                yearly: this.addons.monthly.map(addon => ({
                    ...addon,
                    price: {
                        ...addon.price,
                        regular: addon.price.regular * 10
                    }
                }))
            }
        }
    },
};

router.get("/", (req, res) => {
    const productWithYearly = product.calculateYearly();
    res.json(productWithYearly);
})

export default router;