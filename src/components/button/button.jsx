import styles from '../button/button.module.css'

function Button({ lastStep, text, type, handleNext, handlePrevious }) {

    return (
        <button className={`${type === '+' ? styles.next_button : type === '-' ? styles.previous_button : ''} ${lastStep && styles.confirm}`}
            onClick={() => type === '+' ? handleNext() : handlePrevious()}>
            {text}
        </button>
    )
}

export default Button