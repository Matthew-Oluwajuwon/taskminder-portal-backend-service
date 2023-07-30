const { Users } = require("../../models/Authentication");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/createToken");
const { ResponseCode } = require("../../responseCode");


const signin = async (request, response) => {
    const schema = Joi.object({
      email: Joi.string().min(1).required(),
      password: Joi.string().required(),
    });
  
    const { error } = schema.validate(request.body);
    if (error)
      return response.status(400).send({
        responseCode: ResponseCode.BAD_REQUEST,
        responseMessage: error.details[0]?.message,
        data: null,
      });
  
    try {
      let user = await Users.findOne({ email: request.body.email });
      if (!user)
        return response.status(400).send({
          responseCode: ResponseCode.BAD_REQUEST,
          responseMessage: "Invalid email or password",
          data: null,
        });
  
      const validatePassword = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (!validatePassword)
        return response.status(400).send({
          responseCode: ResponseCode.BAD_REQUEST,
          responseMessage: "Invalid email or password",
          data: null, 
        });
        
        if(!user.isVerified) return response.send({
          responseCode: ResponseCode.SUCCESSFUL,
          responseMessage: "Kindly verify your account to proceed",
          data: {
            _id: user._id,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            dateCreated: user.dateCreated,
          },
        });
        
      const token = createToken(user)
  
      response.status(200).send({
        responseCode: ResponseCode.SUCCESSFUL,
        responseMessage: "Login successful",
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          dateCreated: user.dateCreated,
          profileImage: user.profileImage,
          token,
        },
      });
    } catch (error) {
      response.status(500).send({
        responseCode: ResponseCode.INTERNAL_SERVER_ERROR,
        responseMessage: "Internal server error",
        data: null,
      });
      console.log(error.message);
    }
  }
  
  exports.signin = signin