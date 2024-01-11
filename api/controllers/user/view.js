const redis = require("redis");

module.exports = {
  friendlyName: "view",

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
    const clientRedis = redis
      .createClient()
      .on("error", (err) => console.log("Redis client error", err))
      .connect();

    const userId = this.req.param("userId");

    const currentId = (await clientRedis).get("");

    const userRecord = await User.findOne({
      id: userId,
    });

    if (!userRecord)
      return exits.notFound({
        message: "Không tìm thấy thông tin",
      });

    return exits.success({
      message: "Lấy thông tin thành công",
      data: userRecord,
      statusCode: 200,
    });
  },
};
