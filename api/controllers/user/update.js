module.exports = {
  friendlyName: "Update Info",

  inputs: {
    firstName: {
      description: "first name",
      type: "string",
      option: true,
    },

    lastName: {
      description: "last name",
      type: "string",
      option: true,
    },
  },

  exits: {
    success: {
      description: "The requesting user agent has been successfully logged in.",
      statusCode: "200",
    },
    notFound: {
      statusCode: "404",
    },
    error: {
      statusCode: "500",
    },
  },

  fn: async function ({ firstName, lastName }, exits) {
    const userId = this.req.param("userId");

    const userRecord = await User.findOne({
      _id: userId,
    });

    if (!userRecord)
      return exits.notFound({
        message: "Not found",
      });

    const dataUpdate = {
      firstName: firstName ? firstName : userRecord.firstName,
      lastName: lastName ? lastName : userRecord.lastName,
    };

    try {
      const newData = await User.updateOne({
        _id: userId,
      }).set(dataUpdate);

      return exits.success({
        message: "Update successfully!",
        data: newData,
        statusCode: 200,
      });
    } catch (error) {
      return exits.error({
        message: "Update fail!",
      });
    }
  },
};
