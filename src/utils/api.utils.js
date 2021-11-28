const axios = require("axios");
const apiConfig = require("../config/api.config.js");

exports.callMapApi = async (lat, lon, type, pagetoken) => {
  const params = new URLSearchParams();
  params.append("location", `${lat},${lon}`);
  params.append("type", type);
  params.append("key", apiConfig.PRIVATEKEYTOKENAPI);
  params.append("radius", apiConfig.RADIUS);
  if (pagetoken) params.append("pagetoken", pagetoken);
  const config = {
    headers: {},
    method: "GET",
  };

  return await axios.post(`${apiConfig.URlMAPSAPI}?${params.toString()}`, config);
};
