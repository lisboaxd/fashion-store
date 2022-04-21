import { FormikProps } from "formik";

export interface TextInputOptions {
	name: string;
	label: string;
	type?: string;
	props: FormikProps<any>;
}
