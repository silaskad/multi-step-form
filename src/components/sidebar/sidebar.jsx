import styles from '../sidebar/sidebar.module.css'
import { useState, useEffect } from 'react'

function Sidebar({ steps, getIndex, activeIndex }) {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        if (activeIndex === steps.length - 1) {
            setUnlocked(true);
        }
    }, [activeIndex, steps.length]);

    return (
        <div className={styles.section_container}>
            <div className={styles.content_steps}>
                <div className={styles.picture_container}>
                    <picture className={styles.picture} aria-hidden='true' >
                        <source media="(max-width: 47.9999rem)" srcSet="/assets/images/bg-sidebar-mobile.svg" />
                        <img src="/assets/images/bg-sidebar-desktop.svg" alt="background" />
                    </picture>
                </div>

                <div className={styles.steps_container}>
                    <ul className={styles.steps_list} role='list'>
                        {steps.map((s, index) => (
                            <li key={s.id} className={styles.step}>
                                <button className={`${styles.step_button} ${activeIndex === index && styles.active} ${unlocked && styles.allow_click}`}
                                    onClick={() => {
                                        if (unlocked || index <= activeIndex) {
                                            getIndex(index);   
                                        }
                                    }}>
                                    {index + 1}
                                </button>
                                <div className={styles.step_text}>
                                    <span className={styles.content_topper}>{s.step}</span>
                                    <p className={styles.content_text}>{s.label}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar