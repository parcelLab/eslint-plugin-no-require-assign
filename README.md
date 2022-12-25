# eslint-plugin-no-require-assign

Disallow assigning to required bindings

Original author @weiliddat [@parcellab/eslint-config#51](https://github.com/parcelLab/eslint-config/pull/51)

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@parcellab/eslint-plugin-no-require-assign`:

```sh
npm install @parcellab/eslint-plugin-no-require-assign --save-dev
```

## Usage

Add `@parcellab/eslint-plugin-no-require-assign` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["@parcellab/eslint-plugin-no-require-assign"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@parcellab/eslint-plugin-no-require-assign/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here

## Contributing

[Contribution guidelines](CONTRIBUTING.md)
