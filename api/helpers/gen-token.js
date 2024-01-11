module.exports = {
  friendlyName: "Generate Token",

  description: "",

  inputs: {
    email: {
      type: "string",
      example: "example@gmail.com",
      description: "The name of the person to greet.",
      require: true,
    },
  },

  exits: {},

  fn: async function ({ email }, exits) {
    const check = await User.find({
      email,
    });

    if (check.length)
      return exits.success({
        message: "User has been created successfully.",
        data: { check: true },
        statusCode: 201,
      });
    return exits.invalid({
      message: "Email has been existent",
      data: { check: false },
      statusCode: 409,
    });
  },
};
