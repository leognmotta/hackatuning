class ApiError extends Error {
  constructor(name, message, statusCode, fields) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.fields = fields;
  }
}

export default ApiError;
