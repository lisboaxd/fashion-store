import Select from "react-select";

import { SearchSelectOptions } from "./types";
import "./styles.scss";

const SearchSelectInput: React.FC<SearchSelectOptions> = ({
	name,
	props,
	options,
	placeholder,
	isMulti,
}) => {
	/**
	 * On change
	 * @param event
	 */
	const onChange = (event: any) => {
		if (isMulti) props?.setFieldValue(name, event);
		else {
			const newValue: any = options.find(
				(option: any) => option.value === event.value
			);

			props?.setFieldValue(name, newValue);
		}
	};

	return (
		<div className="search-select inputs/search-select relative w-full mb-3">
			<Select
				classNamePrefix="react-select"
				className="h-45 select placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
				options={options}
				placeholder={placeholder}
				noOptionsMessage={() => "No items_found"}
				value={props?.values[name]}
				isMulti={isMulti}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchSelectInput;
