module.exports = {
  friendlyName: "Signup",

  description: "",

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

  exits: {
    emailExist: {
      statusCode: "409",
    },

    serverError: {
      statusCode: "500",
    },
  },

  fn: async function (inputs, exits) {
    let checkEmail = false;
    try {
      const {
        data: { check },
      } = await sails.helpers.checkEmail.with({
        email: inputs.email,
      });
      checkEmail = check;
    } catch (error) {
      console.log("error :", error);
    }
    if (checkEmail)
      return exits.emailExist({
        message: "Email đã được đăng ký",
      });

    const userRecord = await User.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
    }).fetch();

    if (!userRecord)
      return exits.serverError({
        message: "Lỗi server",
      });

    return exits.success({
      message: "Tạo tài khoản thành công",
      data: userRecord,
      statusCode: 201,
    });
  },
};
