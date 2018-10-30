const handler = {};

handler.hello = function(data, callback) {
  const { name = 'user' } = data.payload;
  callback(202, {
      message: `Hello ${ name }`
  })
};

handler.notFound = function(data, callback) {
  callback(400);
};

module.exports = handler;