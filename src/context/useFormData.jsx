import { useContext } from "react";
import { FormDataContext } from "./formDataContext";

export function useFormData() {
    return useContext(FormDataContext);
}