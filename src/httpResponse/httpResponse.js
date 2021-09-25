
module.exports = {

  responseStatus(data, response) {
    if (!data) {
      response
        .status(400)
        .json({ message: 'Problema na requisição.' });
    } else response.status(200).json(data);
  },
};
