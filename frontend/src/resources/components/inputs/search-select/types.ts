import { FormikProps } from "formik";

export interface SearchSelectOptions {
  name: string;
  label?: string;
  props?: FormikProps<any>;
  options: Array<any>;
  placeholder: string;
  value?: any;
  isMulti?: boolean;
  onInputChange?: any;
  creatable?: boolean;
  popoverTitle?: string;
  popoverDescription?: string;
}

export interface SelectOptions {
  label: string;
  value: string;
}
