module.exports = {
  friendlyName: "Signup",

  description: "Signup auth.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    email: {
      required: true,
      unique: true,
      type: "string",
      isEmail: true,
    },
    password: {
      required: true,
      type: "string",
      maxLength: 15,
      minLength: 6,
    },
  },

  exits: {
    emailExist: {
      description: "Your email is already registered",
      statusCode: "409",
    },

    serverError: {
      description: "Something went wrong",
      statusCode: "500",
    },
  },

  fn: async function (inputs, exits) {
    let checkEmail = false;
    try {
      const {
        data: { check },
      } = await sails.helpers.checkEmail.with({
        email: inputs.email,
      });
      checkEmail = check;
    } catch (error) {
      console.log("error :", error);
    }
    if (checkEmail) throw "emailExist";

    const userRecord = await User.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
    }).fetch();

    if (!userRecord) throw "serverError";

    return exits.success({
      message: "User has been created successfully.",
      data: userRecord,
      statusCode: 201,
    });
  },
};
