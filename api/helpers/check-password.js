module.exports = {
  friendlyName: "Check password",

  description: "",

  inputs: {
    passwordRecord: {
      type: "string",
      example: "passwordRecord",
      description: "The name of the person to greet.",
      require: true,
    },
    passwordUser: {
      type: "string",
      example: "passwordUser",
      description: "The name of the person to greet.",
      require: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
    notMatch: {
      description: "password not match",
    },
  },

  fn: async function ({ passwordRecord, passwordUser }, exits) {
    passwordRecord === passwordUser ? exits.success() : exits.notMatch();
  },
};
