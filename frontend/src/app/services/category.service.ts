import { AxiosResponse } from "axios";
import { RestAPIProvider } from "../providers/rest-api.provider";
import { ToastProvider } from "../providers/toast.provider";
import { Category } from "../entities/category.entity";

export class CategoryService {
	private static _instance: CategoryService;
	private restAPIProvider: RestAPIProvider = RestAPIProvider.Instance;
	private toastProvider: ToastProvider = ToastProvider.Instance;

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	/**
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	public get = async (): Promise<AxiosResponse<any>> => {
		return await this.restAPIProvider
			.getCategories()
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);
				throw error;
			});
	};

	/**
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	public create = async (data: any): Promise<AxiosResponse<any>> => {
		return await this.restAPIProvider
			.createCategory(data)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};

	/**
	 * @returns {Promise<any>}
	 */
	public update = async (data: any, categoryId: number) => {
		return await this.restAPIProvider
			.updateCategory(data, categoryId)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};

	/**
	 * @returns {Promise<void>}
	 */
	public delete = async (seller: Category) => {
		return await this.restAPIProvider
			.deleteCategory(seller.id)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};
}
