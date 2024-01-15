module.exports = {
  friendlyName: "Login",

  description: "Log in using the provided email and password combination.",

  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: "string",
      required: true,
    },

    password: {
      description:
        'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: "200",
    },
    notFound: {
      statusCode: "404",
    },
  },

  fn: async function ({ email, password }, exits) {
    console.log("jwt :", process.env.jwt);
    const userRecord = await User.findOne({
      email,
    });

    if (!userRecord)
      return exits.notFound({
        message: "Không tìm thấy thông tin",
      });

    await sails.helpers.checkPassword.with({
      passwordRecord: userRecord.password,
      passwordUser: password,
    });

    return exits.success({
      message: "Đăng nhập thành công",
      data: userRecord,
      statusCode: 200,
    });
  },
};
