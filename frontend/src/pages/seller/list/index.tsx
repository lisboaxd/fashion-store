import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import AppConstants from "../../../app/constants/app.constants";
import { Seller, SellerConvert } from "../../../app/entities/seller.entity";
import { HTTPConstants } from "../../../app/constants/http.constants";
import { ToastProvider } from "../../../app/providers/toast.provider";
import { DateHelper } from "../../../app/helpers/date.helper";
import { SellerService } from "../../../app/services/seller.service";
import RouteConstants from "../../../app/constants/route.constants";
import Loading from "../../../resources/components/loading";
import Modal from "../../../resources/components/modal";
import Table from "../../../resources/components/table";
import ListSellersPageConstants from "./constants";

const ListSellersPage: React.FC = () => {
	const sellerService: SellerService = SellerService.Instance;
	const toastProvider: ToastProvider = ToastProvider.Instance;

	const [isBusy, setIsBusy] = useState<boolean>(true);
	const [sellers, setSellers] = useState<Array<Seller>>([]);
	const [selectedSeller, setSelectedSeller] = useState<Seller>();

	const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
		useState<boolean>(false);

	const navigate = useNavigate();

	const sellerTableHeaders: Array<JSX.Element> =
		ListSellersPageConstants.COLUMN_NAMES.map((columnName: string) => (
			<th className={AppConstants.TABLE_HEADER_TH_CLASS_NAME}>
				{columnName}
			</th>
		));

	/**
	 * @returns {Promise<void>}
	 */
	const deleteSeller = async (seller: Seller): Promise<void> => {
		const deleteResponse: AxiosResponse<any> = await sellerService.delete(
			seller
		);

		if (deleteResponse.status === HTTPConstants.NO_CONTENT) {
			setSelectedSeller(undefined);

			setSellers(
				sellers.filter(
					(sellerItem: Seller) => sellerItem.id !== seller.id
				)
			);

			toastProvider.success();
		}
	};

	/**
	 * @returns {Array<JSX.Element>}
	 */
	const getSellersTableRows = (): Array<JSX.Element> =>
		sellers.map((seller: Seller) => (
			<tr>
				<th className={AppConstants.TABLE_ROW_TH_CLASS_NAME}>
					<span className="ml-3 font-bold text-gray-700">
						{seller.user.first_name}
					</span>
				</th>

				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					{DateHelper.treatDateWithHours(new Date(seller.created))}
				</td>

				<td className={AppConstants.TABLE_ROW_TD_CLASS_NAME}>
					<button
						className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => {
							navigate(RouteConstants.EDIT_SELLER, {
								state: {
									seller: seller,
								},
							});
						}}
					>
						<i className="fas fa-edit"></i> Edit
					</button>

					<button
						className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
						type="button"
						onClick={() => openConfirmDeleteModal(seller)}
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
	const loadSellers = async (): Promise<void> => {
		const sellersResponse: AxiosResponse<any> = await sellerService.get();

		if (sellersResponse.status === HTTPConstants.OK) {
			setSellers(
				sellersResponse.data.map((seller: Seller) =>
					SellerConvert.toSeller(JSON.stringify(seller))
				)
			);
		}
	};

	/**
	 * Abre o modal de confirmação de exclusão da item
	 * @param {Seller} seller Item que será deletada
	 */
	const openConfirmDeleteModal = (seller: Seller): void => {
		setSelectedSeller(seller);
		setShowConfirmDeleteModal(true);
	};

	/**
	 * Carrega tela
	 * @returns {Promise<void>} Resultado do carregamento
	 */
	useAsyncEffect(async (): Promise<void> => {
		try {
			setIsBusy(true);
			await loadSellers();
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
					Sellers
				</h1>

				<Link
					className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold mx-2 py-2 px-4 rounded"
					to={RouteConstants.CREATE_SELLER}
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
						columns={sellerTableHeaders}
						rows={getSellersTableRows()}
					/>
				)}
			</div>

			{showConfirmDeleteModal ? (
				<Modal
					title={"Confirmation"}
					content={
						<p className="my-4 text-center text-gray-600 text-lg leading-relaxed">
							{"You will delete this item: "}
							{selectedSeller && (
								<strong>
									{" "}
									{selectedSeller.user.first_name}{" "}
								</strong>
							)}
						</p>
					}
					cancelButton={{
						label: "Cancel",
						onClick: () => {
							setSelectedSeller(undefined);
							setShowConfirmDeleteModal(false);
						},
					}}
					confirmButton={{
						label: "Confirm",
						onClick: () =>
							selectedSeller ? deleteSeller(selectedSeller) : {},
					}}
				/>
			) : null}
		</>
	);
};

export default ListSellersPage;
