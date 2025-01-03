import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormContext } from "../context/FormContext";

const schema = yup.object({
  schoolName: yup.string().required("School name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
});

const Step1: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { setFormData, formData } = useContext(FormContext)!;
  const { control, handleSubmit } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(
    formData.logo || null
  );

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          School Name
        </label>
        <Controller
          name="schoolName"
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
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type="email"
              className={`w-full p-2 border rounded ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Address
        </label>
        <Controller
          name="address"
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
          Logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full p-2 border rounded border-gray-300"
        />
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 w-24 h-24 object-cover rounded border"
          />
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;
