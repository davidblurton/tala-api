export default function errorHandler(err, req, res, next) {
  req.log.debug(err)
  res.status(500).json({ error: err });
}
