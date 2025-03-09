
import { inputEmits } from "element-plus"

export interface DynamicFrom {
  formValue: Record<string, any>,
  getFormValue: (formValue: Record<string, any>) => Record<string, any>
}

export interface FormProps {
  type: "input" | 'checkbox' | 'radio' | "select" | "dataPicker" | "rate" | "switch" | "slider",
  inputType?: "text" | "password" | "number" | "date",
  onChange: (value: any) => void,
  value?: any,
  label: string,
  title: string,
  data?: DataProps,
  onClick?: (e: any) => void,
  placeholder?: string,
  maxlength?: number | string,
  minlength?: number | string,
  disabled?: boolean,
  readonly?: boolean,
  tabindex?: number | string,

}


export interface Event {

}

export interface DataProps {
  label: string,
  value: string
}
