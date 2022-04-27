import Yup from "../../../config/yup.config";

const CreateSellerYupSchema = Yup.object().shape({
	first_name: Yup.string().required(),
	last_name: Yup.string().required(),
	username: Yup.string().required(),
	password: Yup.string().required(),
});

export default CreateSellerYupSchema;
