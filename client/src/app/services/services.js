export const formatData = (data) => {
  const _data = [];
  for (const key in data.products) {
    _data.push({
      ...data.products[key],
      key: key,
    });
  }

  return _data;
};
