import { Formik, FormikProps } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HTTPConstants } from "../../../app/constants/http.constants";
import RouteConstants from "../../../app/constants/route.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { SellerService } from "../../../app/services/seller.service";
import Loading from "../../../resources/components/loading";
import SellerForm from "../../../resources/forms/seller";
import { CreateSellerFormData } from "./types";
import CreateSellerYupSchema from "./schema.yup";
import { AxiosResponse } from "axios";

const CreateCategoryPage: React.FC = () => {
	const toastProvider: ToastProvider = ToastProvider.Instance;
	const sellerService: SellerService = SellerService.Instance;

	const navigate: any = useNavigate();

	async function createSeller(data: CreateSellerFormData): Promise<void> {
		const requestResponse: AxiosResponse<any> = await sellerService.create({
			user: data,
		});

		if (requestResponse.status === HTTPConstants.CREATED) {
			toastProvider.success();

			navigate(RouteConstants.LIST_SELLER);
		}
	}

	async function handleSubmit(data: CreateSellerFormData): Promise<void> {
		try {
			await createSeller(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
				Add Category
			</h1>
			<hr className="bg-gray-300 my-12" />

			<div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white mb-40">
				<Formik
					initialValues={{
						first_name: "",
						last_name: "",
						password: "",
						username: "",
					}}
					onSubmit={handleSubmit}
					validationSchema={CreateSellerYupSchema}
					validateOnChange={false}
					validateOnBlur
				>
					{(props: FormikProps<CreateSellerFormData>) => (
						<form
							autoComplete="off"
							onSubmit={props.handleSubmit}
							noValidate
							encType="multipart/form-data"
						>
							{props.isSubmitting ? (
								<Loading />
							) : (
								<SellerForm props={props} />
							)}
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default CreateCategoryPage;
