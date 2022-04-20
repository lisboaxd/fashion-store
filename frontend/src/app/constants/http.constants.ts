export class HTTPConstants {
  /**
   * Informative answers
   * @var number
   */
  static readonly CONTINUE: number = 100;
  static readonly SWITCHING_PROTOCOL: number = 101;
  static readonly PROCESSING: number = 102;

  /**
   * Success answers
   * @var number
   */
  static readonly OK: number = 200;
  static readonly CREATED: number = 201;
  static readonly ACCEPTED: number = 202;
  static readonly NON_AUTHORITATIVE_INFORMATION: number = 203;
  static readonly NO_CONTENT: number = 204;
  static readonly RESET_CONTENT: number = 205;
  static readonly PARTIAL_CONTENT: number = 206;
  static readonly MULTI_STATUS: number = 207;
  static readonly MULTI_STATUS_DAV: number = 208;
  static readonly I_AM_USED: number = 226;

  /**
   * Redirect answers
   * @var number
   */
  static readonly MULTIPLE_CHOICE: number = 300;
  static readonly MOVED_PERMANENTLY: number = 301;
  static readonly FOUND: number = 302;
  static readonly SEE_OTHER: number = 303;
  static readonly NOT_MODIFIED: number = 304;
  static readonly USE_PROXY: number = 305;
  static readonly UNUSED: number = 306;
  static readonly TEMPORARY_REDIRET: number = 307;
  static readonly PERMANENT_REDIRET: number = 308;

  /**
   * Client error answers
   * @var number
   */
  static readonly BAD_REQUEST: number = 400;
  static readonly UNAUTHORIZED: number = 401;
  static readonly PAYMENT_REQUIRED: number = 402;
  static readonly FORBIDDEN: number = 403;
  static readonly NOT_FOUND: number = 404;
  static readonly METHOD_NOT_ALLOWED: number = 405;
  static readonly NOT_ACCEPTABLE: number = 406;
  static readonly PROXY_AUTHENTICATION_REQUIRED: number = 407;
  static readonly REQUEST_TIMEOUT: number = 408;
  static readonly CONFLICT: number = 409;
  static readonly GONE: number = 410;
  static readonly LENGTH_REQUIRED: number = 411;
  static readonly PRECONDITION_FAILED: number = 412;
  static readonly PAYLOAD_TOO_LARGE: number = 413;
  static readonly URI_TOO_LONG: number = 414;
  static readonly UNSUPPORTED_MEDIA_TYPE: number = 415;
  static readonly REQUESTED_RANGE_NOT_SATISFIABLE: number = 416;
  static readonly EXPECTATION_FAILED: number = 417;
  static readonly I_AM_A_TEAPOT: number = 418;
  static readonly MISDIRECTED_REQUEST: number = 421;
  static readonly UNPROCESSABLE_ENTITY: number = 422;
  static readonly LOCKED: number = 423;
  static readonly FAILED_DEPENDENCY: number = 424;
  static readonly UPGRADE_REQUIRED: number = 426;
  static readonly PRECONDITION_REQUIRED: number = 428;
  static readonly TOO_MANY_REQUESTS: number = 429;
  static readonly REQUEST_HEADER_FIELDS_TOO_LARGE: number = 431;
  static readonly UNAVAILABLE_FOR_LEGAL_REASONS: number = 451;

  /**
   * Server error answers
   * @var number
   */
  static readonly INTERNAL_SERVER_ERROR: number = 500;
  static readonly NOT_IMPLEMENTED: number = 501;
  static readonly BAD_GATEWAY: number = 502;
  static readonly SERVICE_UNAVAILABLE: number = 503;
  static readonly GATEWAY_TIMEOUT: number = 504;
  static readonly HTTP_VERSION_NOT_SUPPORTED: number = 505;
  static readonly VARIANT_ALSO_NEGOTIATES: number = 506;
  static readonly INSUFFICIENT_STORAGE: number = 507;
  static readonly LOOP_DETECTED: number = 508;
  static readonly NOT_EXTENDED: number = 510;
  static readonly NETWORK_AUTHENTICATION_REQUIRED: number = 511;
}
