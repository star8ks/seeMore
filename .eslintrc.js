module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true
  },
  "globals": {
    "require": true,
    "chrome": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8, // or 2017
    "sourceType": "module",
    "ecmaFeatures": {
      "classes": true
    },
  },
  "rules": {
    "indent": [
      "error",
      2,
      {"SwitchCase": 1}
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};