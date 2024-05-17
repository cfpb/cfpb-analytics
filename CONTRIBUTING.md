## Update browser stats

New browsers stats (`packages/browserslist-config`) can be created via a CSV
that is exported from Google Analytics 4.
Instructions for doing this export can be found at
https://github.com/browserslist/browserslist-ga-export?tab=readme-ov-file#google-analytics-4

### Process

We aim to update `browserslist-stats.json` every 6 months in January and July.

If you are tasked with this update, the process will be:

1. Follow the [browserslist-ga-export instructions](https://github.com/browserslist/browserslist-ga-export?tab=readme-ov-file#google-analytics-4)
2. If you have a CSV of browser metrics,
   use the command `npx browserslist-ga-export --reportPath metrics.csv`
   (step 4 from the link above), to generate the `.json` file.
3. PR the new `browserslist-stats.json` file in this repo under the
   [packages/browserslist-config](https://github.com/cfpb/cfpb-analytics/tree/main/packages/browserslist-config) package.
4. Run the release management instructions below to make a new release.
5. Open a new PR in a repo that uses this package
   (such as [consumerfinance.gov](https://github.com/cfpb/consumerfinance.gov)
   and the [design-system](https://github.com/cfpb/design-system))
   and bump `@cfpb/browserslist-config`.
6. Update any relevant docs, such as the list on
   https://github.com/cfpb/consumerfinance.gov/blob/main/docs/browser-support.md.
   You may need to manually temporarily adjust the cutoff in the project's
   [browserslist string](https://github.com/cfpb/consumerfinance.gov/blob/74411e65ac84c64b2319cd44e0e69c0d3c2111dc/package.json#L18)
   (for example, to 1%) and run `npx browserslist` in the project to get an
   updated list of supported browsers.
   **Don't accidentally commit the changed cutoff!**

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
