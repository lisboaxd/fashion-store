export default class RouteConstants {
	/**
	 * Main routes
	 * @var string
	 */
	static readonly ROOT: string = "/";

	/**
	 * Error pages
	 * @var string
	 */
	static readonly ERROR: string = "/error";

	/**
	 * Seller routes
	 * @var string
	 */
	static readonly LIST_SELLER: string = "/seller";
	static readonly CREATE_SELLER: string = "/create-seller";
	static readonly EDIT_SELLER: string = "/edit-seller";

	/**
	 * Category routes
	 * @var string
	 */
	static readonly LIST_CATEGORY: string = "/category";
	static readonly CREATE_CATEGORY: string = "/create-category";
	static readonly EDIT_CATEGORY: string = "/edit-category";

	/**
	 * Product routes
	 * @var string
	 */
	static readonly LIST_PRODUCT: string = "/product";
	static readonly CREATE_PRODUCT: string = "/create-product";
	static readonly EDIT_PRODUCT: string = "/edit-product";

	/**
	 * Not found routes
	 * @var string
	 */
	static readonly UNKNOWN: string = "*";
}
