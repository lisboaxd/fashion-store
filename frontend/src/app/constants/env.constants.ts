export default class EnvConstants {
  /**
   * Base API url
   * @var string
   */
  static readonly APP_BASE_API_URL: string =
    process.env.REACT_APP_BASE_API_URL ?? "http://localhost:8010/api/v1/";
}
