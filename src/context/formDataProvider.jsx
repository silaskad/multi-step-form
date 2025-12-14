import { useState, useEffect } from "react";
import { FormDataContext } from "./formDataContext";

export function FormDataProvider({ children }) {

    const [product, setProduct] = useState({});
    const controller = new AbortController();

    useEffect(() => {
        async function getProduct() {
            const res = await fetch('http://localhost:5173/api/product', { signal: controller.signal });
            const data = await res.json();
            setProduct(data);
        }

        getProduct();

        return () => {
            controller.abort();
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        plan: {},
        addons: [],
    });

    const isValid = {
        name: /^[a-zA-Z\s'-]{2,}$/.test((formData.name ?? "").trim()),
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((formData.email ?? "").trim()),
        phone: /^\+?[0-9\s()-]{7,15}$/.test((formData.phone ?? "").trim()),
        plan: typeof formData.plan?.choiceIndex === "number"
            && typeof formData.plan?.cycle === "string",
    };

    const stepOneValid = isValid.name && isValid.email && isValid.phone;
    const stepTwoValid = isValid.plan;

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        plan: false,
    });

    function markTouched(key) {
        setTouched(prev => ({ ...prev, [key]: true }));
    }

    function updateField(key, value) {
        setFormData(prev => {
            if (key === "plan" && prev.addons.length && value.cycle !== prev.plan.cycle) {
                const syncedAddons = prev.addons.map(addon => {
                    const fresh = product.addons?.[value.cycle]
                        ?.find(a => a.id === addon.id);

                    return fresh
                        ? { ...fresh, cycle: value.cycle }
                        : addon;
                });

                return {
                    ...prev,
                    plan: value,
                    addons: syncedAddons,
                };
            }

            return {
                ...prev,
                [key]: value,
            };
        });
    }

    return (
        <FormDataContext.Provider value={{
            formData,
            isValid,
            stepOneValid,
            stepTwoValid,
            updateField,
            touched,
            markTouched,
            product,
        }}>

            {children}
        </FormDataContext.Provider>
    )
}