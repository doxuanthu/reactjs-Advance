const formatData = (data) => {
  const output = [];
  for (const key in data) {
    output.push({
      ...data[key],
      key,
    });
  }

  return output;
};

module.exports = { formatData };
