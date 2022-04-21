import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import AppConstants from "../../../app/constants/app.constants";
import {
	Category,
	CategoryConvert,
} from "../../../app/entities/category.entity";
import { HTTPConstants } from "../../../app/constants/http.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { DateHelper } from "../../../app/helpers/date.helper";

import { CategoryService } from "../../../app/services/category.service";
import RouteConstants from "../../../app/constants/route.constants";
import Loading from "../../../resources/components/loading";
import Modal from "../../../resources/components/modal";
import Table from "../../../resources/components/table";
import ListCategoryPageConstants from "./constants";

const ListCategoryPage: React.FC = () => {
	const categoryService: CategoryService = CategoryService.Instance;
	const toastProvider: ToastProvider = ToastProvider.Instance;

	const [isBusy, setIsBusy] = useState<boolean>(true);
	const [categories, setCategories] = useState<Array<Category>>([]);
	const [selectedCategory, setSelectedCategory] = useState<Category>();

	const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
		useState<boolean>(false);

	const navigate = useNavigate();

	const categoryTableHeaders: Array<JSX.Element> =
		ListCategoryPageConstants.COLUMN_NAMES.map((columnName: string) => (
			<th className={AppConstants.TABLE_HEADER_TH_CLASS_NAME}>
				{columnName}
			</th>
		));

	/**
	 * @returns {Promise<void>}
	 */
	const deleteCategory = async (category: Category): Promise<void> => {
		const deleteResponse: AxiosResponse<any> = await categoryService.delete(
			category
		);

		if (deleteResponse.status === HTTPConstants.NO_CONTENT) {
			setSelectedCategory(undefined);

			setCategories(
				categories.filter(
					(categoryItem: Category) => categoryItem.id !== category.id
				)
			);

			toastProvider.success();
		}
	};

	/**
	 * @returns {Array<JSX.Element>}
	 */
	const getCategoriesTableRows = (): Array<JSX.Element> =>
		categories.map((category: Category) => (
			<tr>
				<th className={AppConstants.TABLE_ROW_TH_CLASS_NAME}>
					<span className="ml-3 font-bold text-gray-700">
						{category.category}
					</span>
				</th>
				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					{category.seller.user.first_name}
				</td>
				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					{DateHelper.treatDateWithHours(new Date(category.created))}
				</td>

				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					<button
						className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => {
							navigate(RouteConstants.EDIT_CATEGORY, {
								state: {
									category: category,
								},
							});
						}}
					>
						<i className="fas fa-edit"></i> Edit
					</button>

					<button
						className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => openConfirmDeleteModal(category)}
					>
						<i className="fas fa-trash"></i> Delete
					</button>
				</td>
			</tr>
		));

	/**
	 * Carrega os itens
	 * @returns {Promise<void>} Resultado do carregamento
	 */
	const loadCategories = async (): Promise<void> => {
		const categoriesResponse: AxiosResponse<any> =
			await categoryService.get();
		console.log(categoriesResponse);
		if (categoriesResponse.status === HTTPConstants.OK) {
			setCategories(
				categoriesResponse.data.map((category: Category) =>
					CategoryConvert.toCategory(JSON.stringify(category))
				)
			);
		}
	};

	/**
	 * Abre o modal de confirmação de exclusão da item
	 * @param {Category} category Item que será deletada
	 */
	const openConfirmDeleteModal = (category: Category): void => {
		setSelectedCategory(category);
		setShowConfirmDeleteModal(true);
	};

	/**
	 * Carrega tela
	 * @returns {Promise<void>} Resultado do carregamento
	 */
	useAsyncEffect(async (): Promise<void> => {
		try {
			setIsBusy(true);
			await loadCategories();
			setIsBusy(false);
		} catch (error) {
			setIsBusy(false);
			console.error(error);
		}
	}, []);

	return (
		<>
			<div className="text-center flex justify-between">
				<h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
					Categories
				</h1>

				<Link
					className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
					to={RouteConstants.CREATE_CATEGORY}
				>
					<i className="fas fa-plus"></i> New
				</Link>
			</div>

			<hr className="bg-gray-300 my-12" />

			<div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white mb-40">
				{isBusy ? (
					<Loading />
				) : (
					<Table
						columns={categoryTableHeaders}
						rows={getCategoriesTableRows()}
					/>
				)}
			</div>

			{showConfirmDeleteModal ? (
				<Modal
					title={"Confirmation"}
					content={
						<p className="my-4 text-center text-gray-600 text-lg leading-relaxed">
							{"You will delete this item: "}
							{selectedCategory && (
								<strong> {selectedCategory.category} </strong>
							)}
						</p>
					}
					cancelButton={{
						label: "Cancel",
						onClick: () => {
							setSelectedCategory(undefined);
							setShowConfirmDeleteModal(false);
						},
					}}
					confirmButton={{
						label: "Confirm",
						onClick: () =>
							selectedCategory
								? deleteCategory(selectedCategory)
								: {},
					}}
				/>
			) : null}
		</>
	);
};

export default ListCategoryPage;
