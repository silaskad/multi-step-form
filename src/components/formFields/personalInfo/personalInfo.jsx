import styles from '../personalInfo/personalInfo.module.css'
import { useFormData } from '../../../context/useFormData';

function PersonalInfo() {
    const { formData, updateField, isValid, touched, markTouched } = useFormData();

    return (
        <div className={styles.content}>
            <h1 className={styles.content_title}>Personal info</h1>
            <p className={styles.content_text}>Please provide your name, email address, and phone number.</p>
            <form className={styles.content_form}>
                <div className={styles.field_wrapper}>
                    <label htmlFor="name">Name</label>
                    <input required type="text" id='name' name='name' placeholder='e.g. Stephen King'
                        value={formData.name ?? ""}
                        onChange={e => updateField("name", e.target.value)}
                        onBlur={() => markTouched("name")}
                        className={touched.name && !isValid.name ? styles.error : ''} />
                    {touched.name && !isValid.name && <span className={styles.error_text}>Name is required</span>}
                </div>

                <div className={styles.field_wrapper}>
                    <label htmlFor="email">Email adress</label>
                    <input required type="email" id='email' name='email' placeholder='e.g. stephenking@lorem.com'
                        value={formData.email ?? ""}
                        onChange={e => updateField("email", e.target.value)}
                        onBlur={() => markTouched("email")}
                        className={touched.email && !isValid.email ? styles.error : ''} />
                    {touched.email && !isValid.email && <span className={styles.error_text}>Invalid email</span>}
                </div>

                <div className={styles.field_wrapper}>
                    <label htmlFor="phone">Phone number</label>
                    <input required type="tel" id='phone' name='phone' placeholder='e.g. +1 234 567 890'
                        value={formData.phone ?? ""}
                        onChange={e => updateField("phone", e.target.value)}
                        onBlur={() => markTouched("phone")}
                        className={touched.phone && !isValid.phone ? styles.error : ''} />
                    {touched.phone && !isValid.phone && <span className={styles.error_text}>Invalid phone number</span>}
                </div>
            </form>
        </div>
    )
}

export default PersonalInfo