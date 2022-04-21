import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import { HTTPConstants } from "../../../app/constants/http.constants";
import RouteConstants from "../../../app/constants/route.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { CategoryService } from "../../../app/services/category.service";
import { SellerService } from "../../../app/services/seller.service";
import { Seller } from "../../../app/entities/seller.entity";
import Loading from "../../../resources/components/loading";
import CategoryForm from "../../../resources/forms/category";
import { CreateCategoryFormData } from "./types";
import CreateCategoryYupSchema from "./schema.yup";
import { AxiosResponse } from "axios";

const CreateCategoryPage: React.FC = () => {
	const toastProvider: ToastProvider = ToastProvider.Instance;
	const categoryService: CategoryService = CategoryService.Instance;
	const sellerService: SellerService = SellerService.Instance;

	const navigate: any = useNavigate();

	const [sellerStates, setSellerStates] = useState<Array<Seller>>();
	async function createCategory(data: CreateCategoryFormData): Promise<void> {
		console.log(data);
		const requestResponse: AxiosResponse<any> =
			await categoryService.create({
				category: data.category,
				owner: data.owner.value,
			});

		if (requestResponse.status === HTTPConstants.CREATED) {
			toastProvider.success();

			navigate(RouteConstants.LIST_CATEGORY);
		}
	}

	const loadSellerStates = async (): Promise<void> => {
		const sellerStates: any = await sellerService.get();

		setSellerStates(sellerStates.data);
	};

	async function handleSubmit(data: CreateCategoryFormData): Promise<void> {
		try {
			console.log(data);
			await createCategory(data);
		} catch (error) {
			console.error(error);
		}
	}
	/**
	 * Carrega a tela
	 * @returns {Promise<void>} Resultado do carregamento
	 */
	useAsyncEffect(async (): Promise<void> => {
		try {
			// loadUser();
			await loadSellerStates();
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<>
			<h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
				Add Category
			</h1>
			<hr className="bg-gray-300 my-12" />

			<div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white mb-40">
				<Formik
					initialValues={{
						category: "",
						owner: "",
					}}
					onSubmit={handleSubmit}
					validationSchema={CreateCategoryYupSchema}
					validateOnChange={false}
					validateOnBlur
				>
					{(props: FormikProps<CreateCategoryFormData>) => (
						<form
							autoComplete="off"
							onSubmit={props.handleSubmit}
							noValidate
							encType="multipart/form-data"
						>
							{props.isSubmitting ? (
								<Loading />
							) : (
								<CategoryForm
									props={props}
									sellerStates={sellerStates}
								/>
							)}
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default CreateCategoryPage;
