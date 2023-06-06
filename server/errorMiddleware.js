import ErrorApi from "./ErrorApi.js";

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ErrorApi) {
    return res
      .status(err.statusCode)
      .json({ mesage: err.mesage, errors: err.errors });
  }
  return res.status(500).json({ message: "Ошибка сервера" });
}
