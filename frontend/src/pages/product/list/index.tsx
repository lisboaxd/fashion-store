import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import AppConstants from "../../../app/constants/app.constants";
import {
	Product,
	ProductConvert,
} from "../../../app/entities/product.entity";
import { HTTPConstants } from "../../../app/constants/http.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { DateHelper } from "../../../app/helpers/date.helper";

import { ProductService } from "../../../app/services/product.service";
import RouteConstants from "../../../app/constants/route.constants";
import Loading from "../../../resources/components/loading";
import Modal from "../../../resources/components/modal";
import Table from "../../../resources/components/table";
import ListProductPageConstants from "./constants";

const ListProductPage: React.FC = () => {
	const productService: ProductService = ProductService.Instance;
	const toastProvider: ToastProvider = ToastProvider.Instance;

	const [isBusy, setIsBusy] = useState<boolean>(true);
	const [products, setProducts] = useState<Array<Product>>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product>();

	const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
		useState<boolean>(false);

	const navigate = useNavigate();

	const productTableHeaders: Array<JSX.Element> =
		ListProductPageConstants.COLUMN_NAMES.map((columnName: string) => (
			<th className={AppConstants.TABLE_HEADER_TH_CLASS_NAME}>
				{columnName}
			</th>
		));

	/**
	 * @returns {Promise<void>}
	 */
	const deleteProduct = async (product: Product): Promise<void> => {
		const deleteResponse: AxiosResponse<any> = await productService.delete(
			product
		);

		if (deleteResponse.status === HTTPConstants.NO_CONTENT) {
			setSelectedProduct(undefined);

			setProducts(
				products.filter(
					(productItem: Product) => productItem.id !== product.id
				)
			);

			toastProvider.success();
		}
	};

	/**
	 * @returns {Array<JSX.Element>}
	 */
	const getProductsTableRows = (): Array<JSX.Element> =>
		products.map((product: Product) => (
			<tr>
				<th className={AppConstants.TABLE_ROW_TH_CLASS_NAME}>
					<span className="ml-3 font-bold text-gray-700">
						{product.product}
					</span>
				</th>
				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
						{product.category}
				</td>
								<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
						{product.price}
				</td>
								<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
						% {product.discount}
				</td>
								<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
						{product.price_with_discount}
				</td>
				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					{DateHelper.treatDateWithHours(new Date(product.created))}
				</td>

				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					<button
						className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => {
							navigate(RouteConstants.EDIT_CATEGORY, {
								state: {
									product: product,
								},
							});
						}}
					>
						<i className="fas fa-edit"></i> Edit
					</button>

					<button
						className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => openConfirmDeleteModal(product)}
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
	const loadProducts = async (): Promise<void> => {
		const productsResponse: AxiosResponse<any> =
			await productService.get();
		console.log(productsResponse);
		if (productsResponse.status === HTTPConstants.OK) {
			setProducts(
				productsResponse.data.map((product: Product) =>
					ProductConvert.toProduct(JSON.stringify(product))
				)
			);
		}
	};

	/**
	 * Abre o modal de confirmação de exclusão da item
	 * @param {Product} product Item que será deletada
	 */
	const openConfirmDeleteModal = (product: Product): void => {
		setSelectedProduct(product);
		setShowConfirmDeleteModal(true);
	};

	/**
	 * Carrega tela
	 * @returns {Promise<void>} Resultado do carregamento
	 */
	useAsyncEffect(async (): Promise<void> => {
		try {
			setIsBusy(true);
			await loadProducts();
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
					Products
				</h1>

				{/* <Link
					className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
					to={RouteConstants.CREATE_PRODUCT}
				>
					<i className="fas fa-plus"></i> New
				</Link> */}
			</div>

			<hr className="bg-gray-300 my-12" />

			<div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white mb-40">
				{isBusy ? (
					<Loading />
				) : (
					<Table
						columns={productTableHeaders}
						rows={getProductsTableRows()}
					/>
				)}
			</div>

			{showConfirmDeleteModal ? (
				<Modal
					title={"Confirmation"}
					content={
						<p className="my-4 text-center text-gray-600 text-lg leading-relaxed">
							{"You will delete this item: "}
							{selectedProduct && (
								<strong> {selectedProduct.product} </strong>
							)}
						</p>
					}
					cancelButton={{
						label: "Cancel",
						onClick: () => {
							setSelectedProduct(undefined);
							setShowConfirmDeleteModal(false);
						},
					}}
					confirmButton={{
						label: "Confirm",
						onClick: () =>
							selectedProduct
								? deleteProduct(selectedProduct)
								: {},
					}}
				/>
			) : null}
		</>
	);
};

export default ListProductPage;
