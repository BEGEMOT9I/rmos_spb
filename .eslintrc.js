module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "linebreak-style": ["error", "unix"],
      "semi": ["error", "never"],
      "react/forbid-prop-types": ["warn"],
      "no-trailing-spaces": ["error", {
        "skipBlankLines": true
      }]
    },
    "env": {
      "browser": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "globals": {
      "API_URL": false,
    }
};
