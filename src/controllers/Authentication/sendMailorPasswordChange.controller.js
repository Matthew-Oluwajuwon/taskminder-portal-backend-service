const { Users } = require("../../models/Authentication");
const { ResponseCode } = require("../../responseCode");
const { sendVerificationMail } = require("../../utils/sendVerificationMail");

const sendVerificationMailForPasswordChange = async (request, response) => {
  try {
    const user = await Users.findOne({_id: request.user?._id})
    if (!user) {
        response.status(500).send({
            responseCode: ResponseCode.INVALID_TOKEN,
            responseMessage: "User not found, kindly regiser",
            data: null,
          });
    } else {
        user.otp = Math.floor(Math.random() * 900000) + 100000
        user.isVerified = false
        await user.save()
        sendVerificationMail(user)
        response.status(500).send({
            responseCode: ResponseCode.SUCCESSFUL,
            responseMessage: "OTP sent successfully",
            data: null,
          });
    }
  } catch (error) {
    response.status(500).send({
      responseCode: ResponseCode.INTERNAL_SERVER_ERROR,
      responseMessage: "Internal server error",
      data: null,
    });
    console.log(error.message);
  }
};
 
module.exports.sendVerificationMailForPasswordChange =
  sendVerificationMailForPasswordChange;
