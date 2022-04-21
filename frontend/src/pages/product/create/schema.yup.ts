import Yup from "../../../config/yup.config";

const CreateCategoryYupSchema = Yup.object().shape({
	category: Yup.string().required(),
	owner: Yup.mixed().required(),
});

export default CreateCategoryYupSchema;
