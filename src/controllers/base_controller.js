class BaseController {
  handleSuccess(res, message, data = {}) {
    return res.status(200).send({
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
