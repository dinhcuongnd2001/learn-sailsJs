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

  exits: {},

  fn: async function (inputs, exits) {
    const userRecord = await User.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
    }).fetch();
    if (!userRecord) {
      return exits.invalid({
        message: "Sign up fail",
      });
    }
    return exits.success({
      message: "User has been created successfully.",
      data: userRecord,
    });
  },
};
