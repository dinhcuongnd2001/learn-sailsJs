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
    const clientRedis = await redis
      .createClient()
      .on("error", (err) => console.log("Redis client error", err))
      .connect();

    const userId = this.req.param("userId");

    const userRecord = await clientRedis.get(userId);

    console.log("userRecord :", typeof userRecord);

    if (userRecord) {
      return exits.success({
        message: "Lấy thông tin thành công",
        data: {
          iscached: true,
          ...JSON.parse(userRecord),
        },
        statusCode: 200,
      });
    } else {
      const userRecord = await User.findOne({
        id: userId,
      });

      if (!userRecord)
        return exits.notFound({
          message: "Không tìm thấy thông tin",
        });
      await clientRedis.set(userId, JSON.stringify(userRecord));
      await clientRedis.expireAt(userId, parseInt(+new Date() / 1000) + 30);

      return exits.success({
        message: "Lấy thông tin thành công",
        data: {
          iscached: false,
          ...userRecord,
        },
        statusCode: 200,
      });
    }
  },
};
