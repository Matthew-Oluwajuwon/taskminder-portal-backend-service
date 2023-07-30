const Joi = require("joi");
const { ResponseCode } = require("../../responseCode");
const { Users } = require("../../models/Authentication");

const updateProfile = async (request, response) => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(200).required(),
  });

  const { error } = schema.validate(request.body);

  if (error)
    return response.status(400).send({
      responseCode: ResponseCode.BAD_REQUEST,
      responseMessage: error.details[0]?.message,
      data: null,
    });

  try {
    const username = request.body.username;
    if (!username)
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: "username is required",
        data: null,
      });

    const user = await Users.findOne({ _id: request.user?._id });
    if (!user) {
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: "No user found, kindly register to update username",
        data: null,
      });
    } else {
      user.username = username;
      await user.save();
      response.status(200).send({
        responseCode: ResponseCode.SUCCESSFUL,
        responseMessage: "Username updated successfully",
        data: {
          username: user.username,
        },
      });
    }
  } catch (error) {
    response.status(500).send({
      responseCode: ResponseCode.INTERNAL_SERVER_ERROR,
      responseMessage: "Internal server error",
      data: null,
    });
  }
};

module.exports.updateProfile = updateProfile;
