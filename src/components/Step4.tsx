import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Step4: React.FC<{ prevStep: () => void; onSubmit: () => void }> = ({
  prevStep,
  onSubmit,
}) => {
  const { formData } = useContext(FormContext)!;

  console.log(formData);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Review and Finalize</h2>
      <div className="p-4 border rounded space-y-2">
        <p>
          <strong>School Name:</strong> {formData.schoolName}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>Admin:</strong> {formData.adminId}
        </p>
        <p>
          <strong>Payment Details:</strong> **** **** ****{" "}
          {formData.paymentDetails?.cardNumber.slice(-4)}
        </p>
        {formData.logo && (
          <div>
            <strong>Logo:</strong>
            <div className="mt-2">
              <img
                src={
                  typeof formData.logo === "string"
                    ? formData.logo
                    : URL.createObjectURL(formData.logo)
                }
                alt="School Logo"
                className="w-24 h-24 object-cover rounded border"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4;
