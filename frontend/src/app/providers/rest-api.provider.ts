import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import EnvConstants from "../constants/env.constants";
import RestAPIConstants from "../constants/rest-api.constants";
import RouteConstants from "../constants/route.constants";

export class RestAPIProvider {
	private static _instance: RestAPIProvider;

	private axiosInstance: AxiosInstance = axios.create({
		baseURL: `${EnvConstants.APP_BASE_API_URL}`,
		headers: {
			[RestAPIConstants.CONTENT_TYPE_KEY]:
				RestAPIConstants.CONTENT_TYPE_DEFAULT_VALUE,
		},
	});

	public static get Instance(): RestAPIProvider {
		return this._instance || (this._instance = new this());
	}

	constructor() {
		this.axiosInstance.interceptors.request.use(
			this._requestsInterceptor,
			(error: any) => {
				Promise.reject(error);
			}
		);

		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse<any>) => response,
			(error) => {
				// if (!error.response) window.location.replace(RouteConstants.ERROR);

				return Promise.reject(error);
			}
		);
	}

	/**
	 * @private
	 * Intercepta todas as requisições
	 * @param {AxiosRequestConfig} requestConfig Configurações da requisição
	 * @returns {AxiosRequestConfig | Promise<AxiosRequestConfig>}  Configurações após interceptação
	 */
	private async _requestsInterceptor(
		requestConfig: AxiosRequestConfig
	): Promise<AxiosRequestConfig> {
		return requestConfig;
	}
	/**
	 * Seller Endpoints
	 * */

	public getSellers = (
		page?: number,
		limit?: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.GET_METHOD,
			url: `${RestAPIConstants.SELLER}/`,
			params: {
				page,
				limit,
			},
		});
	};

	public createSeller = (data: any): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.POST_METHOD,
			url: `${RestAPIConstants.SELLER}/`,
			data,
		});
	};

	public updateSeller = (
		data: any,
		sellerId: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.PATCH_METHOD,
			url: `${RestAPIConstants.SELLER}/${sellerId}/`,
			data,
		});
	};

	public deleteSeller = (sellerId: number): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.DELETE_METHOD,
			url: `${RestAPIConstants.SELLER}/${sellerId}`,
		});
	};
	/**
	 * Category Endpoints
	 * */
	public getCategories = (
		page?: number,
		limit?: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.GET_METHOD,
			url: `${RestAPIConstants.CATEGORY}`,
			params: {
				page,
				limit,
			},
		});
	};

	public createCategory = (data: any): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.POST_METHOD,
			url: `${RestAPIConstants.CATEGORY}/`,
			data,
		});
	};

	public updateCategory = (
		data: any,
		categoryId: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.PUT_METHOD,
			url: `${RestAPIConstants.CATEGORY}/${categoryId}`,
			data,
		});
	};

	public deleteCategory = (
		categoryId: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.DELETE_METHOD,
			url: `${RestAPIConstants.CATEGORY}/${categoryId}`,
		});
	};
	/**
	 * Product Endpoints
	 * */
	public getProducts = (
		page?: number,
		limit?: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.GET_METHOD,
			url: `${RestAPIConstants.PRODUCT}`,
			params: {
				page,
				limit,
			},
		});
	};

	public createProduct = (data: any): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.POST_METHOD,
			url: `${RestAPIConstants.PRODUCT}/`,
			data,
		});
	};

	public updateProduct = (
		data: any,
		productId: number
	): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.PUT_METHOD,
			url: `${RestAPIConstants.PRODUCT}/${productId}`,
			data,
		});
	};

	public deleteProduct = (productId: number): Promise<AxiosResponse<any>> => {
		return this.axiosInstance.request({
			method: RestAPIConstants.DELETE_METHOD,
			url: `${RestAPIConstants.PRODUCT}/${productId}`,
		});
	};
}
