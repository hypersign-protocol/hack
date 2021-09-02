export default class ApiError {
    code: number;
    message: string;

    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new ApiError(400, msg);
    }
  
    static internal(msg) {
      return new ApiError(500, msg);
    }
}
  
  