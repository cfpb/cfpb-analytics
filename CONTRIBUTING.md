## Release management

Ready to publish changes to npm?

1. Run `npm whoami` to see that you're logged into npm (run `npm login` if needed).
2. `cd` into the package you want to publish inside `/packages/`.
3. Increment the version number in the package's `package.json`.
4. Run `npm publish`.

# Guidance on how to contribute

> All contributions to this project will be released under the CC0 public domain
> dedication. By submitting a pull request or filing a bug, issue, or
> feature request, you are agreeing to comply with this waiver of copyright interest.
> Details can be found in our [TERMS](TERMS.md) and [LICENCE](LICENSE).

There are two primary ways to help:

- Using the issue tracker, and
- Changing the code-base.

## Using the issue tracker

Use the issue tracker to suggest feature requests, report bugs, and ask questions.
This is also a great way to connect with the developers of the project as well
as others who are interested in this solution.

Use the issue tracker to find ways to contribute. Find a bug or a feature, mention in
the issue that you will take on that effort, then follow the _Changing the code-base_
guidance below.

## Changing the code-base

Generally speaking, you should fork this repository, make changes in your
own fork, and then submit a pull-request. All new code should have associated unit
tests that validate implemented features and the presence or lack of defects.
Additionally, the code should follow any stylistic and architectural guidelines
prescribed by the project. In the absence of such guidelines, mimic the styles
and patterns in the existing code-base.
