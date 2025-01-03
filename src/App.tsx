import React, { useState } from "react";
import Stepper from "./components/Stepper";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { FormProvider } from "./context/FormContext";

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    <Step1 nextStep={() => setActiveStep(1)} />,
    <Step2
      nextStep={() => setActiveStep(2)}
      prevStep={() => setActiveStep(0)}
    />,
    <Step3
      nextStep={() => setActiveStep(3)}
      prevStep={() => setActiveStep(1)}
    />,
    <Step4
      prevStep={() => setActiveStep(2)}
      onSubmit={() => alert("Form Submitted!")}
    />,
  ];

  return (
    <FormProvider>
      <div className="container mx-auto p-4">
        <Stepper activeStep={activeStep} />
        <div className="mt-6">{steps[activeStep]}</div>
      </div>
    </FormProvider>
  );
};

export default App;
