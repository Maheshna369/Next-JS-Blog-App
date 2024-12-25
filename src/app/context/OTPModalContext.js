"use client"
import { createContext, useState } from "react";
export const OTPModalContext= createContext();
export const OTPModalProvider=({children})=>{
    const [otpModal, setOTPModal]= useState(false);
    return <OTPModalContext.Provider value={{otpModal, setOTPModal}}>{children}</OTPModalContext.Provider>
}