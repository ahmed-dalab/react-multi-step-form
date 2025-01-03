// src/components/Step3.tsx
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormContext } from "../context/FormContext";

const schema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY")
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});

const Step3: React.FC<{ nextStep: () => void; prevStep: () => void }> = ({
  nextStep,
  prevStep,
}) => {
  const { setFormData, formData } = useContext(FormContext)!;
  const { control, handleSubmit } = useForm({
    defaultValues: formData.paymentDetails,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, paymentDetails: data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Card Number
        </label>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field, fieldState }) => (
            <input
              {...field}
              className={`w-full p-2 border rounded ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Expiry Date (MM/YY)
        </label>
        <Controller
          name="expiry"
          control={control}
          render={({ field, fieldState }) => (
            <input
              {...field}
              className={`w-full p-2 border rounded ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          CVV
        </label>
        <Controller
          name="cvv"
          control={control}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type="password"
              className={`w-full p-2 border rounded ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
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
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step3;
