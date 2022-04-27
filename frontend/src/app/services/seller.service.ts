import { AxiosResponse } from "axios";
import { RestAPIProvider } from "../providers/rest-api.provider";
import { ToastProvider } from "../providers/toast.provider";
import { Seller } from "../entities/seller.entity";

export class SellerService {
  private static _instance: SellerService;
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
      .getSellers()
      .catch((error: any) => {
        this.toastProvider.httpRequestError(error);
        throw error;
      });    
  };

  /**
   * @returns {Promise<AxiosResponse<any>>} 
   */
  public create = async (data: any): Promise<AxiosResponse<any>> => {
    return await this.restAPIProvider.createSeller(data).catch((error: any) => {
      this.toastProvider.httpRequestError(error);

      throw error;
    });
  };

  /**
   * @returns {Promise<any>}
   */
  public update = async (data: any, sellerId: number) => {
    return await this.restAPIProvider
      .updateSeller(data, sellerId)
      .catch((error: any) => {
        this.toastProvider.httpRequestError(error);

        throw error;
      });
  };

  /**
   * @returns {Promise<void>} 
   */
  public delete = async (seller: Seller) => {
    return await this.restAPIProvider
      .deleteSeller(seller.id)
      .catch((error: any) => {
        this.toastProvider.httpRequestError(error);

        throw error;
      });
  };
}
