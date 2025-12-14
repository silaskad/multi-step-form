import './App.css'
import FormFields from './components/formFields/formFields'
import Sidebar from './components/sidebar/sidebar'
import Button from './components/button/button'
import PersonalInfo from './components/formFields/personalInfo/personalInfo'
import SelectPlan from './components/formFields/selectPlan/selectPlan'
import Addons from './components/formFields/addons/addons'
import Summary from './components/formFields/summary/summary'
import { nanoid } from 'nanoid'
import { useFormData } from './context/useFormData'
import { useMemo, useState } from 'react'

function App() {
  const steps = useMemo(() => [
    { id: nanoid(), step: "Step 1", label: "Your info", component: PersonalInfo },
    { id: nanoid(), step: "Step 2", label: "Select plan", component: SelectPlan },
    { id: nanoid(), step: "Step 3", label: "Add-ons", component: Addons },
    { id: nanoid(), step: "Step 4", label: "Summary", component: Summary },
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { formData, stepOneValid, markTouched, stepTwoValid } = useFormData();

  function getIndex(index) {
    setActiveIndex(index);
  }

  async function submitForm() {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setIsConfirmed(true);

    } catch (error) {
      console.log(error);
    }
  }

  function handleNext() {
    if (activeIndex === 0 && !stepOneValid) {
      markTouched("name");
      markTouched("email");
      markTouched("phone");
      return;
    } else if (activeIndex === 1 && !stepTwoValid) {
      markTouched("plan");
      return;
    } else if (activeIndex === steps.length - 1) {
      submitForm();
    } else if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  }

  function handlePrevious() {
    setActiveIndex(Math.max(0, activeIndex - 1));
  }

  return (
    <main id='form'>
      <section className="form_fields">
        <FormFields stepsComponent={steps[activeIndex].component} getIndex={getIndex} isConfirmed={isConfirmed} />
        {isConfirmed ? null :
          <div className={activeIndex === 0 ? "button_container right" : 'button_container'}>
            {activeIndex > 0 && <Button text="Go back" type="-" handlePrevious={handlePrevious} />}
            <Button lastStep={activeIndex === steps.length - 1} text={activeIndex === steps.length - 1 ? "Confirm" : "Next"} type="+" handleNext={handleNext} />
          </div>
        }
      </section>
      <aside className='form_sidebar'>
        <Sidebar steps={steps} getIndex={getIndex} activeIndex={activeIndex} />
      </aside>
    </main>
  )
}

export default App