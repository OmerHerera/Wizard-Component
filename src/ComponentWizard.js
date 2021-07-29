import "./styles.css";
import { useState, useEffect } from "react";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function ComponentWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [persistentStepsData, setPersistentStepsData] = useState({
    step0: { name: "" },
    step1: { name: "" },
    step2: { name: "" }
  });

  const next = (step) => {
    setCurrentStep(step);
  };

  const visibleStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step0
            next={next}
            persistentStepsData={persistentStepsData}
            setPersistentStepsData={setPersistentStepsData}
          />
        );
      case 1:
        return (
          <Step1
            next={next}
            persistentStepsData={persistentStepsData}
            setPersistentStepsData={setPersistentStepsData}
          />
        );
      case 2:
        return (
          <Step2
            next={next}
            persistentStepsData={persistentStepsData}
            setPersistentStepsData={setPersistentStepsData}
          />
        );
      default:
        return null;
    }
  };
  return <div>{visibleStep()}</div>;
}
