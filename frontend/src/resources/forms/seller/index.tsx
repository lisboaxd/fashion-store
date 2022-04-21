import SubmitButton from "../../components/buttons/submit";
import TextInput from "../../components/inputs/text-input";
import { SellerFormOptions } from "./types";

const SellerForm: React.FC<SellerFormOptions> = ({ props }) => {
	return (
		<>
			<div className="mb-6">
				<TextInput name="first_name" label="First Name" props={props} />
			</div>

			<div className="mb-6">
				<TextInput name="last_name" label="Last Name" props={props} />
			</div>

			<div className="mb-6">
				<TextInput name="password" label="Password" props={props} />
			</div>

			<div className="mb-6">
				<TextInput name="username" label="username" props={props} />
			</div>

			<div className="md:flex md:items-center">
				<SubmitButton />
			</div>
		</>
	);
};

export default SellerForm;
