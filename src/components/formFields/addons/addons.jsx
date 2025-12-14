import styles from '../addons/addons.module.css'
import { useFormData } from '../../../context/useFormData';

function Addons() {
    const { product, formData, updateField } = useFormData();
    const selectedAddons = formData.addons ?? [];

    let addonsContent;

    function toggleAddon(addon, cycle) {
        const isSelected = formData.addons.some(a => a.id === addon.id);

        let updated;

        if (isSelected) {
            updated = formData.addons.filter(a => a.id !== addon.id);
        } else {
            updated = [...formData.addons, { ...addon, cycle: cycle }];
        }

        updateField("addons", updated);
    }

    function displayAddons() {
        switch (formData.plan?.cycle ?? 'monthly') {
            case 'monthly':
                addonsContent = product.addons.monthly.map(a => {
                    const isActive = selectedAddons.some(sel => sel.id === a.id)

                    return (
                        <li key={a.id} className={`${styles.addons} ${isActive && styles.active_addons}`}>
                            <button className={`${styles.monthly} ${isActive && styles.active}`}
                                onClick={() => toggleAddon(a, 'monthly')}>
                                {isActive && <img src={a.image} alt="checkmark" aria-hidden='true' />}
                            </button>

                            <div className={styles.text_group}>
                                <h2 className={styles.addons_title}>
                                    {a.name}
                                </h2>
                                <p className={styles.addons_text}>
                                    {a.description}
                                </p>
                            </div>

                            <p className={styles.addons_price}>
                                +
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: a.price.currency,
                                    minimumFractionDigits: 0,
                                }).format(a.price.regular)}
                                /mo
                            </p>
                        </li>
                    );
                });
                break;

            case 'yearly':
                addonsContent = product.addons.yearly.map(a => {
                    const isActive = selectedAddons.some(sel => sel.id === a.id)

                    return (
                        <li key={a.id} className={`${styles.addons} ${isActive && styles.active_addons}`}>
                            <button className={`${styles.yearly} ${isActive && styles.active}`}
                                onClick={() => toggleAddon(a, 'yearly')}>
                                {isActive && <img src={a.image} alt="checkmark" aria-hidden='true' />}
                            </button>

                            <div className={styles.text_group}>
                                <h2 className={styles.addons_title}>
                                    {a.name}
                                </h2>
                                <p className={styles.addons_text}>
                                    {a.description}
                                </p>
                            </div>

                            <p className={styles.addons_price}>
                                +
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: a.price.currency,
                                    minimumFractionDigits: 0,
                                }).format(a.price.regular)}
                                /yr
                            </p>
                        </li>
                    );
                });
                break;

            default:
                addonsContent = null;
        }
    }

    displayAddons();

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>Pick add-ons</h1>

            <p className={styles.content_text}>
                Add-ons help enhance your gaming experience.
            </p>

            <div className={styles.content_addons_wrapper}>
                <ul className={styles.addons_list} role='list'>
                    {addonsContent}
                </ul>
            </div>
        </div>
    )
}

export default Addons