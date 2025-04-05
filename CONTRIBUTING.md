# Contributing to FreeMD2PDF

Thank you for considering contributing to FreeMD2PDF! This document outlines the process for contributing to the project and helps to make the contribution process easy and effective for everyone involved.

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to [hichem.tab2002@gmail.com](mailto:hichem.tab2002@gmail.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for FreeMD2PDF. Following these guidelines helps maintainers understand your report, reproduce the issue, and find related reports.

Before creating bug reports, please check [the issue list](https://github.com/HichemTab-tech/FreeMD2PDF/issues) as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as much detail as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
* **If the problem is related to performance or memory**, include a CPU profile capture with your report.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for FreeMD2PDF, including completely new features and minor improvements to existing functionality.

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of FreeMD2PDF which the suggestion is related to.
* **Explain why this enhancement would be useful** to most FreeMD2PDF users.
* **List some other applications where this enhancement exists.**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the [JavaScript](#javascript-styleguide) and [TypeScript](#typescript-styleguide) styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * ⚡️ `:zap:` when improving performance
    * 🔥 `:fire:` when removing code or files
    * 🐛 `:bug:` when fixing a bug
    * 🚑️ `:ambulance:` when making a critical hotfix
    * ✨ `:sparkles:` when introducing new features
    * 📝 `:memo:` when adding or updating documentation
    * 🚀 `:rocket:` when deploying stuff
    * 💄 `:lipstick:` when updating the UI and style files
    * 🎉 `:tada:` when beginning a new project
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 🔧 `:wrench:` when updating configuration files

### JavaScript Styleguide

All JavaScript code is linted with [ESLint](https://eslint.org/). Please:

* Use 2 spaces for indentation
* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Prefer `const` over `let` and `let` over `var`
* Prefer arrow functions `=>` over function expressions
* Prefer template strings over string concatenation
* Prefer promises over callbacks
* Prefer async/await over plain promises when reasonable

### TypeScript Styleguide

* Follow the TypeScript best practices
* Use explicit types rather than relying on type inference when reasonable
* Use interfaces for object types
* Use proper TypeScript features instead of JavaScript workarounds

### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown)
* Reference methods and classes in Markdown with the custom `{}` notation:
    * Reference classes with `{ClassName}`
    * Reference instance methods with `{ClassName.methodName}`
    * Reference class methods with `{ClassName.methodName}`

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues or PRs related to documentation
* `duplicate` - Issues that are duplicates of other issues
* `enhancement` - Issues that are feature requests
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - Issues that are invalid or non-reproducible
* `question` - Issues that are questions
* `wontfix` - Issues that will not be worked on

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute.