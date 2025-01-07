class BaseController {
  handleSuccess(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).send({
      message,
      data,
    });
  }

  handleError(res, message, statusCode = 500) {
    return res.status(statusCode).send({
      message,
      data: null,
    });
  }
}

export default BaseController;
