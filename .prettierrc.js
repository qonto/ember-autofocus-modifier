'use strict';

module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        printWidth: 80,
        singleQuote: false,
      },
    },
  ],
};
