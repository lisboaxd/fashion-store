import { TextInputOptions } from "./types";

const TextInput: React.FC<TextInputOptions> = ({ name, label, type, props }) => {
	console.log("props.errors", props.errors);
	console.log("props.values", props.values);

	return (
		<>
			<label className="block text-gray-600 font-bold" htmlFor={name}>
				{label}
			</label>

			<input
				className="form-input block w-full focus:bg-white"
				id={name}
				name={name}
				type={ type ? type : 'text'}
				placeholder={label}
				onChange={props.handleChange}
				value={props.values[name]}
			/>

			{props.errors[name] && (
				<p className="py-2 text-sm text-gray-600 error">
					{JSON.stringify(props.errors[name])}
				</p>
			)}
		</>
	);
};

export default TextInput;
