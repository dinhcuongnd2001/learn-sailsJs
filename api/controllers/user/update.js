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
        message: "Không tìm thấy dữ liệu",
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
        message: "Cập nhật thành công",
        data: newData,
      });
    } catch (error) {
      return exits.error({
        message: "Cập nhật thất bại",
      });
    }
  },
};
