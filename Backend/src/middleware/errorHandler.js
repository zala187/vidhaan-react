const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message:
      err.message || "Something went wrong on the server.",
  });
};

module.exports = {
  notFound,
  errorHandler,
};