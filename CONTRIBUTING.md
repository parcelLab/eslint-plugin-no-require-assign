# Contributing Guide

This document shows you how to get the project, run all provided tests and generate
a production-ready build. It must focus on the bare minimum to help a new developer
to make a change with the least effort possible.

<!--- All repos need a contributing guide, and it is recommended to explain the following sections -->
<!--- However, in non-production ones, you might want to skip some of them -->

## Dependencies

To make sure that the following instructions work, please install the following dependencies
on you machine:

<!--- Define dependencies here -->

## Installation

<!--- Write installation instructions, like how to clone the repo and install the dependencies -->

## Testing

### Linting

<!--- Explain how to run the linter -->

### Unit testing

<!--- Explain how to run the unit tests -->

### Integration testing

<!--- If applicable, explain how to run the integration tests -->

<!--- Write another section for end-to-end or contract tests if required -->

## Building

<!--- Explain how to build a production bundle. Docker instructions should be here -->

## Developing

<!--- Define any specific development instructions -->

## Contributing/Submitting changes

- Check out a new branch based on `main` and name it to what you intend to do,
based on the company's branch naming conventions:
  - Example:

    ```sh
    git checkout -b BRANCH_NAME origin/main
    ```

    If you get an error, you may need to fetch `main` first by using

    ```sh
    git remote update && git fetch
    ```

  - Use one branch per fix/feature
- Make your changes
  - Make sure to provide a spec for unit tests (and any other relevant tests).
  - When all tests pass, everything's fine.
- Commit your changes
  - Please provide a git message that explains what you've done based on the company's commit conventions.
  - Commit to your local branch.
- Make a pull request
  - Make sure you send the PR to the `main` branch.
  - Github actions will verify your code.
  - A code owner must approve your change before it can be merged.

If you follow these instructions, your PR will land pretty safely in the repo once approved.
