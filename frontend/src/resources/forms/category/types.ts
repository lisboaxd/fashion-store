import { FormikProps } from "formik";
import { Seller } from "../../../app/entities/seller.entity";
import { CreateCategoryFormData } from "../../../pages/category/create/types";

export interface CategoryFormOptions {
	props: FormikProps<CreateCategoryFormData>;
	sellerStates: Array<Seller> | undefined;
}
