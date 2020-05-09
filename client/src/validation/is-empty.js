const isEmpty = param =>
  param === undefined ||
  param === null ||
  (typeof param === "string" && param.trim().length === 0) ||
  (typeof param === "object" && Object.keys(param).length === 0);

module.exports = isEmpty;
