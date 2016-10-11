module.exports = function(data) {
  if(data === ']') {
    return JSON.parse("[]")
  } else {
    return JSON.parse(data);
  }
};
