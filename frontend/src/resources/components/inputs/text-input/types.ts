import { FormikProps } from "formik";

export interface TextInputOptions {
	name: string;
	label: string;
	props: FormikProps<any>;
}
