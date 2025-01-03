// src/components/Stepper.tsx
import React from "react";

type Props = {
  activeStep: number;
};

const steps = ["School Info", "Assign Admin", "Payment Details", "Finalize"];

const Stepper: React.FC<Props> = ({ activeStep }) => {
  return (
    <div className="flex justify-center items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-full text-white ${
              activeStep === index
                ? "bg-blue-500"
                : activeStep > index
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-300 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
