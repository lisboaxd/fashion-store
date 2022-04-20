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
  static readonly TASKS: string = "/tasks";
  static readonly EDIT_TASK: string = "/edit-task";
  static readonly CREATE_TASK: string = "/add-task";

  /**
   * Not found routes
   * @var string
   */
  static readonly UNKNOWN: string = "*";
}
