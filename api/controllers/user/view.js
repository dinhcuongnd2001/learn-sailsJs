module.exports = {
  friendlyName: "Update Info",

  inputs: {},

  exits: {
    success: {
      description: "The requesting user agent has been successfully logged in.",
      statusCode: "200",
    },
    notFound: {
      description: "No user with the specified ID was found in the database.",
      statusCode: "404",
    },
  },

  fn: async function (inputs, exits) {
    const userId = this.req.param("userId");

    const userRecord = await User.findOne({
      id: userId,
    });

    if (!userRecord)
      return exits.notFound({
        message: "not found",
      });

    return exits.success({
      message: "Get data successfully!",
      data: userRecord,
      statusCode: 200,
    });
  },
};
