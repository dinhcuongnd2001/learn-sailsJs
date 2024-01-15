const redis = require("redis");

module.exports = {
  friendlyName: "Update Info",

  inputs: {},

  exits: {
    success: {
      statusCode: "200",
    },
    notFound: {
      statusCode: "404",
    },
    invalid: {
      statusCode: "500",
    },
  },

  fn: async function (inputs, exits) {
    const clientRedis = await redis
      .createClient()
      .on("error", (err) => console.log("Redis client error", err))
      .connect();

    const userId = this.req.param("userId");

    const userRecord = await User.findOne({
      id: userId,
    });

    if (!userRecord)
      return exits.notFound({
        message: "Không tìm thấy thông tin",
      });

    const userDelete = await User.destroyOne({
      _id: userId,
    });

    if (userDelete) {
      const currentData = await clientRedis.get(userId);

      if (currentData) {
        await clientRedis.del(userId);
        clientRedis.disconnect();
      }
      return exits.success({
        message: "Xóa thành công",
        data: userDelete,
      });
    } else {
      return exits.invalid({
        message: "Xóa thất bại",
      });
    }
  },
};
