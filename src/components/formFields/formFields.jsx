import styles from '../formFields/formFields.module.css'
import ThankYou from './thankYou/thankYou'

function FormFields({ stepsComponent, getIndex, isConfirmed }) {
    const ActiveStep = stepsComponent;

    return (
        <div className={styles.section_container}>
            {isConfirmed ? <ThankYou /> : <ActiveStep getIndex={getIndex} />}
        </div>
    )
}

export default FormFields