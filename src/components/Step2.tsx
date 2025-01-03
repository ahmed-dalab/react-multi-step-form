// src/components/Step2.tsx
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormContext } from "../context/FormContext";
import axios from "axios";

const schema = yup.object({
  adminId: yup.string().required("Admin is required"),
});

const Step2: React.FC<{ nextStep: () => void; prevStep: () => void }> = ({
  nextStep,
  prevStep,
}) => {
  const { setFormData, formData } = useContext(FormContext)!;
  const { control, handleSubmit } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });
  const [admins, setAdmins] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get("http://localhost:5000/admins").then((response) => {
      console.log("amdins", response.data);
      setAdmins(response.data);
    });
  }, []);

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Assign Admin
        </label>
        <Controller
          name="adminId"
          control={control}
          render={({ field, fieldState }) => (
            <select
              {...field}
              className={`w-full p-2 border rounded ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
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

export default Step2;
