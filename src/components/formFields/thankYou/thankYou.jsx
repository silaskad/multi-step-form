import styles from '../thankYou/thankYou.module.css'
import iconThankYou from '../../../assets/icon-thank-you.svg'

function ThankYou() {
    return (
        <div className={styles.content}>
            <div className={styles.img_container}>
                <img src={iconThankYou} alt="icon thank you" />
            </div>

            <h1 className={styles.content_title}>Thank you!</h1>

            <p className={styles.content_text}>
                Thanks for confirming your subscription! We hope you have fun 
                using our platform. If you ever need support, please feel free 
                to email us at support@lorem.com.
            </p>
        </div>
    )
}

export default ThankYou