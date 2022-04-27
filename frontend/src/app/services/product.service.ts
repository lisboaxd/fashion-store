import { AxiosResponse } from "axios";
import { RestAPIProvider } from "../providers/rest-api.provider";
import { ToastProvider } from "../providers/toast.provider";
import { Product } from "../entities/product.entity";

export class ProductService {
	private static _instance: ProductService;
	private restAPIProvider: RestAPIProvider = RestAPIProvider.Instance;
	private toastProvider: ToastProvider = ToastProvider.Instance;

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	/**
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	public get = async (): Promise<AxiosResponse<any>> => {
		return await this.restAPIProvider.getProducts().catch((error: any) => {
			this.toastProvider.httpRequestError(error);
			throw error;
		});
	};

	/**
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	public create = async (data: any): Promise<AxiosResponse<any>> => {
		return await this.restAPIProvider
			.createProduct(data)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};

	/**
	 * @returns {Promise<any>}
	 */
	public update = async (data: any, productId: number) => {
		return await this.restAPIProvider
			.updateProduct(data, productId)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};

	/**
	 * @returns {Promise<void>}
	 */
	public delete = async (seller: Product) => {
		return await this.restAPIProvider
			.deleteProduct(seller.id)
			.catch((error: any) => {
				this.toastProvider.httpRequestError(error);

				throw error;
			});
	};
}
