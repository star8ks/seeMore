module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "require": true,
    "chrome": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 8, // or 2017
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
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