// PATCH SQL utils
function paramsToFieldsExpr(params, excludes = {}) {
  const opts = { $id: true, ...excludes };
  return Object.keys(params)
    .filter((param) => !opts[param])
    .map((param) => `${param.substring(1)} = ${param}`);
}

function normalizeParams(params) {
  return Object.entries(params).reduce((acc, [param, value]) => {
    if (!value) return acc;
    acc[param] = value;
    return acc;
  }, {});
}

function updateOne({ id, name, price, desc, date }) {
  const params = normalizeParams({ $id: id, $price: price, $name: name, $date: date, $desc: desc });
  const sql = `UPDATE products SET ${paramsToFieldsExpr(params, { $price: true }).join(
    ', ',
  )} WHERE id = $id`;
  return sql;
}

updateOne({ name: 'sajt', id: 123, desc: 'haliho', price: 9999 });
