// import { GetLocationForAddress } from "@/api/get-location-for-ip-adderss";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, createContext, useState } from "react";
import { GetIPAddressFormData, getIPAddressFormSchema } from '../utils/zod/get-ipAddress'
import { GetLocationForAddressProps } from '../api/get-location-for-ip-address';
import axios from 'axios';


interface GetLocationData {
  errors: FieldErrors;
  register: UseFormRegister<GetIPAddressFormData>;
  response: GetLocationForAddressProps | null;
  handleSubmit: UseFormHandleSubmit<GetIPAddressFormData>;
  isSubmitting: boolean;
  handleGetLocationForAddress: (ipAddress: GetIPAddressFormData) => void;
}

interface GetLocationProviderProps {
  children: ReactNode
}

export const GetLocationContext = createContext({} as GetLocationData);

export function GetLocationProvider({ children }: GetLocationProviderProps) {
  const { 
    reset,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
   } = useForm<GetIPAddressFormData>({
    resolver: zodResolver(getIPAddressFormSchema)
   })
  const [ response, setResponse] = useState<GetLocationForAddressProps | null>(null)

  async function handleGetLocationForAddress(data: GetIPAddressFormData) {
    const response = await axios.get<GetLocationForAddressProps>(`https://geo.ipify.org/api/v2/country,city`, {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        ipAddress: data.ipAddress
      }
    })

    setResponse(response.data)

    reset({
      ipAddress: ''
    })
    

    return response.data
  }


  return (
    <GetLocationContext.Provider
      value={{
        errors,
        register,
        response,
        handleSubmit,
        isSubmitting,
        handleGetLocationForAddress,
      }}
    >
      {children}
    </GetLocationContext.Provider>
  )
}