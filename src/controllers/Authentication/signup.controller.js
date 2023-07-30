const { Users } = require("../../models/Authentication");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { sendVerificationMail } = require("../../utils/sendVerificationMail");
const { ResponseCode } = require("../../responseCode");


const signUp = async (request, response) => {
  //using joi to format inputs sent by client
  const schema = Joi.object({
    email: Joi.string().min(1).max(200).required().email(),
    username: Joi.string().min(1).max(200).required(),
    password: Joi.string().min(8).required(),
    otp: Joi.number().min(6).max(6),
  });

  // getting the error object if any
  const { error } = schema.validate(request.body);

  //  sending the error mesage to client
  if (error)
    return response.status(400).send({
      responseCode: ResponseCode.BAD_REQUEST,
      responseMessage: error.details[0]?.message,
      data: null,
    });

  // an asynchronous action 
  try {
    // checking to see if user with email exists in the DB
    let user = await Users.findOne({ email: request.body.email });

    // if user exist with the same email, send an error back to the client
    if (user)
      return response.status(400).send({
        responseCode: ResponseCode.DATA_DUPLICATION,
        responseMessage: request.body.email + " already exist",
        data: null,
      });
 
    // destructuring request body
    const { email, username, password } = request.body;
    user = new Users({
      email,
      username,
      password,
      otp: Math.floor(Math.random() * 900000) + 100000,
    });

    // password hashing using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // saving user to the DB if no errors and all conditions are met
     await user.save();
    sendVerificationMail(user)
    response.status(201).send({
      responseCode: ResponseCode.SUCCESSFUL,
      responseMessage: "Registration successful",
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        dateCreated: user.dateCreated,
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
};

exports.signUp = signUp;
