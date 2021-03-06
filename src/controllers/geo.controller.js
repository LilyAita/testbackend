const validation = require("../utils/validation.utils");
const api = require("../utils/api.utils");

exports.restaurants = async (req, res) => {
  // Validate request
  const empty_fields = validation.validateData(req.query, ["lat", "lon"]);

  if (empty_fields.length !== 0) {
    res.status(400).send({
      message: `${empty_fields.join(", ")} can not be empty`,
    });
    return;
  }
  const logIn = await validation.logIn(req);
  if (!logIn) {
    res.status(401).send({
      message: "Please login",
    });
    return;
  }

  const api_response = await api.callMapApi(req.query.lat, req.query.lon, "restaurant", req.query.pagetoken);
  if (api_response.data.status !== "OK") {
    res.status(500).send({
      message: api_response.data.error_message || "Some error with API",
    });
    return;
  }
  res.send({ next_page_token: api_response.data.next_page_token, results: api_response.data.results });
};
