const jwt = require("jsonwebtoken");
const { ResponseCode } = require("../responseCode");

const auth = (request, response, next) => {
  if (!request.header("Authorization"))
    return response.status(401).send({
      responseCode: ResponseCode.UNAUTHORIZED,
      responseMessage:
        "Authenticate request with a valid token passed in the request header, concatenated with Bearer",
      data: null,
    });
  const token = request.header("Authorization").split("Bearer ")[1];

  if (!token)
    return response.status(401).send({
      responseCode: ResponseCode.UNAUTHORIZED,
      responseMessage: "Unauthorized",
      data: null,
    });
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    request.user = payload;

    next();
  } catch (error) {
    response.status(400).send({
      responseCode: ResponseCode.INVALID_TOKEN,
      responseMessage: "Token provided is invalid",
      data: null,
    });
  }
};

exports.auth = auth;
