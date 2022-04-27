import { SubmitButtonOptions } from "./types";

const SubmitButton: React.FC<SubmitButtonOptions> = () => {
	return (
		<>
			<button
				className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
				type="submit"
			>
				Save
			</button>
		</>
	);
};

export default SubmitButton;
