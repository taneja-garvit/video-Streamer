class ApiResponse {
    constructor(statusCode, data = null, message = "success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode >= 200 && statusCode < 300; // success if status code is in the 2xx range
    }
}  
export {ApiResponse}