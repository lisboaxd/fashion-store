import { Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import { HTTPConstants } from "../../../app/constants/http.constants";
import RouteConstants from "../../../app/constants/route.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { CategoryService } from "../../../app/services/category.service";
import { SellerService } from "../../../app/services/seller.service";
import { Seller } from "../../../app/entities/seller.entity";
import Loading from "../../../resources/components/loading";
import CategoryForm from "../../../resources/forms/category";
import { EditCategoryFormData } from "../edit/types";
import EditCategoryYupSchema from "./schema.yup";
import { AxiosResponse } from "axios";
import { Category } from "../../../app/entities/category.entity";

const EditCategoryPage: React.FC = () => {
	const toastProvider: ToastProvider = ToastProvider.Instance;
	const categoryService: CategoryService = CategoryService.Instance;
	const sellerService: SellerService = SellerService.Instance;
	const [selectedCategory, setSelectedCategory] = useState<Category>();

	const navigate: any = useNavigate();
	const location: any = useLocation();

	const [sellerStates, setSellerStates] = useState<Array<Seller>>();

	async function editCategory(data: EditCategoryFormData): Promise<void> {
		if (selectedCategory) {
			const requestResponse: AxiosResponse<any> =
				await categoryService.update(
					{
						category: data.category,
						seller: {
							id: data.owner.value,
						},
						owner: data.owner.value,
					},
					selectedCategory.id
				);

			if (requestResponse.status === HTTPConstants.OK) {
				toastProvider.success();

				navigate(RouteConstants.LIST_CATEGORY);
			}
		}
	}
	/**
	 * Carrega o item
	 * @returns {void}
	 */
	const loadCategory = (): void => {
		if (location.state) {
			setSelectedCategory(location.state.category);
		}
	};

	const loadSellerStates = async (): Promise<void> => {
		const sellerStates: any = await sellerService.get();

		setSellerStates(sellerStates.data);
	};

	async function handleSubmit(data: EditCategoryFormData): Promise<void> {
		try {
			await editCategory(data);
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

	useEffect((): void => {
		loadCategory();
	}, []);

	return (
		<>
			<h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
				Edit Category
			</h1>
			<hr className="bg-gray-300 my-12" />

			<div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white mb-40">
				{selectedCategory && (
					<Formik
						initialValues={{
							category: selectedCategory.category,
							owner: {
								value: selectedCategory.seller.id,
								label: selectedCategory.seller.user.first_name,
							},
						}}
						onSubmit={handleSubmit}
						validationSchema={EditCategoryYupSchema}
						validateOnChange={false}
						validateOnBlur
					>
						{(props: FormikProps<EditCategoryFormData>) => (
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
				)}
			</div>
		</>
	);
};

export default EditCategoryPage;
