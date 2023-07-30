/**
 * @swagger
 * components:
 *   schemas:
 *     Signup:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: unique email of the user
 *         username:
 *           type: string
 *           description: unique username of the user
 *         password:
 *           type: string
 *           description: a secret key for user authentication
 *       example:
 *         email: ""
 *         username: ""
 *         password: ""
 *     Signin:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: unique email of the user
 *         password:
 *           type: string
 *           description: a secret key for user authentication
 *       example:
 *         email: ""
 *         password: ""
 *     Otp verification:
 *       type: object
 *       required:
 *         - otp
 *       properties:
 *         otp:
 *           type: string
 *           description: a six digit code sent to user mail inbox
 *       example:
 *         otp: 0
 *     Profile Image Upload:
 *       type: object
 *       required:
 *         - profileImage
 *       properties:
 *         profileImage:
 *           type: string
 *           description: url to the image link
 *       example:
 *         profileImage: ""
 *     Update Profile:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: name to update the username
 *       example:
 *         username: ""
 *     Get User Profile:
 *       type: object
 *       required:
 *         - profileImage
 *       properties:
 *         profileImage:
 *           type: string
 *           description: url to the image link
 *       example:
 *         profileImage: ""
 */

const express = require("express");
const { signUp } = require("../controllers/Authentication/signup.controller");
const { signin } = require("../controllers/Authentication/signin.controller");
const {
  otpVerification,
} = require("../controllers/Authentication/otpVerification");
const {
  uploadProfileImage,
} = require("../controllers/Authentication/uploadProfileImage.controller");
const { auth } = require("../middleware/Authentiation");
const {
  updateProfile,
} = require("../controllers/Authentication/updateProfile.controller");
const {
  getUserProfile,
} = require("../controllers/Authentication/getUserProfile.controller");
const { sendVerificationMailForPasswordChange } = require("../controllers/Authentication/sendMailorPasswordChange.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: authentication-controller
 *   description: Authentication controller
 * /api/v1/authentication/signup:
 *       post:
 *          summary: register a new user
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Signup'
 *          responses:
 *             200:
 *               description: The created user.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Signup'
 *             500:
 *               description: Some server error
 *
 */

router.post("/signup", signUp);
/**
 * @swagger
 *
 * /api/v1/authentication/signin:
 *       post:
 *          summary: Login to your account
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Signin'
 *          responses:
 *             200:
 *               description: The existing user.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Signin'
 *             500:
 *               description: Some server error
 * */
router.post("/signin", signin);

/**
 * @swagger
 *
 * /api/v1/authentication/otpVerification:
 *       post:
 *          summary: Verify your email address
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Otp verification'
 *          responses:
 *             200:
 *               description: Verify your email address.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Otp verification'
 *             500:
 *               description: Some server error
 * */
router.post("/otpVerification", otpVerification);

/**
 * @swagger
 *
 * /api/v1/authentication/uploadProfileImage:
 *       post:
 *          summary: upload your profile image
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Profile Image Upload'
 *          responses:
 *             200:
 *               description: upload your profile image.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Profile Image Upload'
 *             500:
 *               description: Some server error
 * */
router.post("/uploadProfileImage", auth, uploadProfileImage);

/**
 * @swagger
 * /api/v1/authentication/updateProfile:
 *       post:
 *          summary: update user profile
 *          tags: [authentication-controller]
 *          requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                  schema:
 *                   $ref: '#/components/schemas/Update Profile'
 *          responses:
 *             200:
 *               description: update user profile.
 *               content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Update Profile'
 *             500:
 *               description: Some server error
 *
 * */
router.post("/updateProfile", auth, updateProfile);

/**
 * @swagger
 *
 * /api/v1/authentication/getUserProfile:
 *       get:
 *          summary: get user profile
 *          tags: [authentication-controller]
 *          responses:
 *             200:
 *               description: get user profile.
 *             500:
 *               description: Some server error
 */

router.get("/getUserProfile", auth, getUserProfile);

/**
 * @swagger
 *
 * /api/v1/authentication/sendVerificationMailForPasswordChange:
 *       post:
 *          summary: get user profile
 *          tags: [authentication-controller]
 *          responses:
 *             200:
 *               description: get user profile.
 *             500:
 *               description: Some server error
 */

router.post("/sendVerificationMailForPasswordChange", auth, sendVerificationMailForPasswordChange)

exports.authentication = router;
