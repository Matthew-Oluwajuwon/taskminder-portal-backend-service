const { Users } = require("../../models/Authentication");
const { ResponseCode } = require("../../responseCode");
const Joi = require("joi");


const uploadProfileImage = async (request, response) => {
     const schema = Joi.object({
      profileImage: Joi.string().required(),
    });
  
    const { error } = schema.validate(request.body);
    if (error)
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: error.details[0]?.message,
        data: null,
      });
  try {
    const profileImage = request.body.profileImage;
    if (!profileImage)
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: "profile image is required",
        data: null,
      });

      const user = await Users.findOne({ _id: request.user?._id });
      
    if (!user) {
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage:
          "No user found, kindly register to upload profile image",
        data: null,
      });
    } else {
      user.profileImage = profileImage;
      await user.save();
      response.status(200).send({
        responseCode: ResponseCode.SUCCESSFUL,
        responseMessage: "Profile image uploaded successfully",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user?.isVerified,
          profileImage: user?.profileImage,
        },
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

exports.uploadProfileImage = uploadProfileImage;
