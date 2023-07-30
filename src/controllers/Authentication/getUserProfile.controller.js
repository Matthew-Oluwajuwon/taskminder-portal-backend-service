const { Users } = require("../../models/Authentication");
const { ResponseCode } = require("../../responseCode");

const getUserProfile = async (request, response) => {
  try {
    const user = await Users.findOne({ _id: request.user?._id });
    if (!user) {
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: "No user found, kindly register ",
        data: null,
      });
    } else {
      response.status(200).send({
        responseCode: ResponseCode.SUCCESSFUL,
        responseMessage: "User info generated successfully",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          dateCreated: user.dateCreated,
          profileImage: user.profileImage
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

module.exports.getUserProfile = getUserProfile;
