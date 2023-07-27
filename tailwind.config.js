const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      blue: colors.blue,
      sky: colors.sky,
      white: colors.white,
      slate: colors.slate,
    },
    extend: {},
  },
  plugins: [],
};
