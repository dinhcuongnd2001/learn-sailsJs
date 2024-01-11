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
