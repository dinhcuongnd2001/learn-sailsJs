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
      description: "The requesting user agent has been successfully logged in.",
      statusCode: "200",
    },
    notFound: {
      description: "No user with the specified ID was found in the database.",
      statusCode: "404",
    },
  },

  fn: async function ({ email, password }) {
    const userRecord = await User.findOne({
      email,
    });

    if (!userRecord) throw "notFound";

    await sails.helpers.checkPassword.with({
      passwordRecord: userRecord.password,
      passwordUser: password,
    });

    return userRecord;
  },
};
