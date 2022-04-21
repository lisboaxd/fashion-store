import SubmitButton from "../../components/buttons/submit";
import TextInput from "../../components/inputs/text-input";
import { CategoryFormOptions } from "./types";
import SearchSelectInput from "../../components/inputs/search-select";
import { Seller } from "../../../app/entities/seller.entity";

const CategoryForm: React.FC<CategoryFormOptions> = ({
	props,
	sellerStates,
}) => {
	console.log(sellerStates);
	return (
		<>
			<div className="mb-6">
				<TextInput
					name="category"
					label="Category Name"
					props={props}
				/>
			</div>

			{sellerStates && (
				<>
					<label
						className="block text-gray-600 font-bold"
						htmlFor="owner"
					>
						Seller
					</label>
					<div className="mb-6">
						<SearchSelectInput
							name="owner"
							placeholder="seller"
							props={props}
							options={sellerStates.map(
								(sellerStates: Seller) => ({
									value: sellerStates.id,
									label: sellerStates.user.first_name,
								})
							)}
						/>
					</div>
				</>
			)}

			<div className="md:flex md:items-center">
				<SubmitButton />
			</div>
		</>
	);
};

export default CategoryForm;
