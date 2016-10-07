module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "semi": 2,
    "no-console": "off",
    "comma-dangle": ["error", "always-multiline"],
  }
};
