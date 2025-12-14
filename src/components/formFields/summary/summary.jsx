import styles from '../summary/summary.module.css'
import { useFormData } from '../../../context/useFormData'

function Summary({ getIndex }) {
    const { formData } = useFormData();
    const selectedCycle = formData.plan.cycle ?? 'monthly';

    function calculateTotal() {
        const planPrice = formData.plan.price?.regular ?? 0;

        const addonsTotal = (formData.addons ?? []).reduce((sum, addon) => sum + (addon.price?.regular ?? 0), 0);

        return planPrice + addonsTotal;
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>Finishing up</h1>

            <p className={styles.content_text}>
                Double-check everything looks OK before confirming.
            </p>

            <div className={styles.content_summary_wrapper}>
                <ul className={styles.summary_list} role='list'>
                    <li className={styles.plan_wrapper}>
                        <div className={styles.text_group}>
                            <h2 className={styles.plan_title}>{`${formData.plan.name} ${selectedCycle === 'monthly' ? '(Monthly)' : selectedCycle === 'yearly' ? '(Yearly)' : ''}`}</h2>
                            <button onClick={() => getIndex(1)}>
                                Change
                            </button>
                        </div>
                        <p className={styles.addons_price}>
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: formData.plan.price.currency,
                                minimumFractionDigits: 0,
                            }).format(formData.plan.price.regular)}
                            {selectedCycle === 'monthly' ? '/mo' : selectedCycle === 'yearly' ? '/yr' : ''}
                        </p>
                    </li>

                    <li className={styles.addons_wrapper}>
                        <ul className={styles.addons_list}>
                            {
                                formData.addons.map(addon => (
                                    <li key={addon.id} className={styles.addons} >
                                        <h3 className={styles.addon_name}>{addon.name}</h3>
                                        <p className={styles.addon_price}>
                                            +
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: addon.price.currency,
                                                minimumFractionDigits: 0,
                                            }).format(addon.price.regular)}
                                            {selectedCycle === 'monthly' ? '/mo' : selectedCycle === 'yearly' ? '/yr' : ''}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                </ul>
            </div>

            <div className={styles.total_wrapper}>
                <p className={styles.total_text}>{`Total ${selectedCycle === 'monthly' ? '(per month)' : selectedCycle === 'yearly' ? '(per year)' : ''}`}</p>
                <p className={styles.total_price}>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: formData.plan.price.currency,
                        minimumFractionDigits: 0,
                    }).format(calculateTotal())}
                    {selectedCycle === 'monthly' ? '/mo' : selectedCycle === 'yearly' ? '/yr' : ''}
                </p>
            </div>
        </div>
    )
}

export default Summary