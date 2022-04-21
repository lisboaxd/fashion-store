import Yup from "../../../config/yup.config";

const EditCategoryYupSchema = Yup.object().shape({
	category: Yup.mixed().required(),
	owner: Yup.mixed().required(),
});

export default EditCategoryYupSchema;
