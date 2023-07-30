const { Users } = require("../../models/Authentication");
const { ResponseCode } = require("../../responseCode");
const { createToken } = require("../../utils/createToken");

const otpVerification = async (request, response) => {
  try {
    const otp = request.body.otp;
    if (!otp)
      return response.status(400).send({
        responseCode: ResponseCode.INVALID_OTP,
        responseMessage: "Invalid OTP",
        data: null,
      });

    const user = await Users.findOne({ otp });

    if (user) {
      user.otp = null;
      user.isVerified = true;

      await user.save();

      const token = createToken(user);

      response.status(200).send({
        responseCode: ResponseCode.SUCCESSFUL,
        responseMessage: "Email verification successful, login to continue",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user?.isVerified,
          profileImage: user?.profileImage,
          token,
        },
      });
    } else {
      response.status(400).send({
        responseCode: ResponseCode.INVALID_OTP,
        responseMessage: "Email verification failed, Invalid OTP",
        data: null,
      });
    }
  } catch (error) {
    response.status(500).send({
      responseCode: ResponseCode.INTERNAL_SERVER_ERROR,
      responseMessage: "Internal server error " + error.message,
      data: null,
    });
    console.log(error.message);
  }
};

exports.otpVerification = otpVerification;
