import styles from '../selectPlan/selectPlan.module.css'
import { useFormData } from '../../../context/useFormData'

function SelectPlan() {
    const { product, formData, updateField, stepTwoValid, touched, markTouched } = useFormData();
    const activePlan = formData.plan?.choiceIndex ?? null;
    const selectedCycle = formData.plan?.cycle ?? 'monthly';

    function togglePlan() {
        const next = selectedCycle === 'monthly' ? 'yearly' : 'monthly';
        updateField('plan', {
            cycle: next,
            choiceIndex: null,
            id: null
        })
    }

    let planContent;

    function switchPlan() {
        switch (selectedCycle) {
            case 'monthly':
                planContent = product.plan.monthly.map((p, index) => (
                    <li key={p.id} className={styles.plan}>
                        <button className={`${styles.monthly} ${activePlan === index && styles.active}`}
                            onClick={() => { updateField('plan', { ...p, choiceIndex: index, cycle: 'monthly' }); markTouched('plan') }}>
                            <div className={styles.img_container}>
                                <img src={p.image} alt="plan" aria-hidden='true' />
                            </div>
                            <div className={styles.plan_text_wrapper}>
                                <h2 className={styles.plan_title}>
                                    {p.name}
                                </h2>
                                <p className={styles.plan_text}>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: p.price.currency,
                                        minimumFractionDigits: 0,
                                    }).format(p.price.regular)}
                                    /mo
                                </p>
                            </div>
                        </button>
                    </li>
                ));
                break;

            case 'yearly':
                planContent = product.plan.yearly.map((p, index) => (
                    <li key={p.id} className={styles.plan}>
                        <button className={`${styles.yearly} ${activePlan === index && styles.active}`}
                            onClick={() => { updateField('plan', { ...p, choiceIndex: index, cycle: 'yearly' }), markTouched('plan') }}>
                            <div className={styles.img_container}>
                                <img src={p.image} alt="plan" aria-hidden='true' />
                            </div>
                            <div className={styles.plan_text_wrapper}>
                                <h2 className={styles.plan_title}>
                                    {p.name}
                                </h2>
                                <p className={styles.plan_text}>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: p.price.currency,
                                        minimumFractionDigits: 0,
                                    }).format(p.price.regular)}
                                    /yr
                                </p>
                                <p className={styles.plan_sale}>
                                    {p.price.sale}
                                </p>
                            </div>
                        </button>
                    </li>
                ));
                break;

            default:
                planContent = null;
        }
    }

    switchPlan();

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>Select your plan</h1>

            <p className={styles.content_text}>
                You have the option of monthly or yearly billing.
            </p>

            <div className={styles.content_plan_wrapper}>
                <ul className={styles.plan_list} role='list'>
                    {planContent}
                </ul>
            </div>
            
            {!stepTwoValid && touched.plan &&
                <div className={styles.error}>
                    <p>Please choose a plan</p>
                </div>
            }

            <div className={styles.content_plan_switcher}>
                <p className={`${styles.switch_text} ${selectedCycle === 'monthly' && styles.monthly_active}`}>Monthly</p>
                <div className={styles.switch_container}>
                    <div className={styles.switch_button_wrapper}>
                        <button className={styles.switch}
                            onClick={() => togglePlan()}>
                            <div className={`${styles.circle} ${selectedCycle === 'monthly' ? styles.circle_left : styles.circle_right}`}></div>
                        </button>
                    </div>
                </div>
                <p className={`${styles.switch_text} ${selectedCycle === 'yearly' && styles.yearly_active}`}>Yearly</p>
            </div>
        </div>
    )
}

export default SelectPlan