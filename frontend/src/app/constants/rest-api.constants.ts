type HTTP_METHOD = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export default class RestAPIConstants {
	/**
	 * HTTP Methods
	 * @var HTTP_METHOD
	 */
	static readonly GET_METHOD: HTTP_METHOD = "GET";
	static readonly POST_METHOD: HTTP_METHOD = "POST";
	static readonly PATCH_METHOD: HTTP_METHOD = "PATCH";
	static readonly DELETE_METHOD: HTTP_METHOD = "DELETE";
	static readonly PUT_METHOD: HTTP_METHOD = "PUT";

	/**
	 * Base codes
	 * @var string
	 */
	static readonly CONTENT_TYPE_KEY: string = "Content-Type";
	static readonly CONTENT_TYPE_DEFAULT_VALUE: string = "application/json";
	static readonly CONTENT_TYPE_MULTIPART: string = "multipart/form-data";
	static readonly BEARER_TOKEN_PREFIX: string = "Token ";

	/**
	 * Pagination constants
	 */
	static readonly LIMIT: number = 10;

	/**
	 * Seller endpoints
	 * @var string
	 */
	static readonly SELLER: string = "seller";

	/**
	 * Category endpoints
	 * @var string
	 */
	static readonly CATEGORY: string = "category";

	/**
	 * product endpoints
	 * @var string
	 */
	static readonly PRODUCT: string = "product";

	/**
	 * STOCK endpoints
	 * @var string
	 */
	static readonly STOCK: string = "stock";
}
