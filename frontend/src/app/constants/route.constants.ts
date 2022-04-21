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
	 * User routes
	 * @var string
	 */
	static readonly LIST_SELLER: string = "/seller";
	static readonly CREATE_SELLER: string = "/create-seller";
	static readonly EDIT_SELLER: string = "/edit-seller";

	/**
	 * Task routes
	 * @var string
	 */
	static readonly LIST_CATEGORY: string = "/category";
	static readonly CREATE_CATEGORY: string = "/create-category";
	static readonly EDIT_CATEGORY: string = "/edit-category";

	/**
	 * Not found routes
	 * @var string
	 */
	static readonly UNKNOWN: string = "*";
}
