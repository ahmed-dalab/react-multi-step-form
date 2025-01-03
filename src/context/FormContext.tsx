// src/context/FormContext.tsx
import React, { createContext, useState, ReactNode } from "react";

type FormData = {
  schoolName?: string;
  email?: string;
  logo?: File | null;
  address?: string;
  adminId?: string;
  paymentDetails?: { cardNumber: string; expiry: string; cvv: string };
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
