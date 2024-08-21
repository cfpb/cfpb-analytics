## Update browser stats

New browsers stats (`packages/browserslist-config`) can be created via a CSV
that is exported from Google Analytics 4.
Instructions for doing this export can be found at
https://github.com/browserslist/browserslist-ga-export?tab=readme-ov-file#google-analytics-4

### Process

We aim to update `browserslist-stats.json` every 6 months in January and July.

If you are tasked with this update, the process will be:

1. Follow the [browserslist-ga-export instructions](https://github.com/browserslist/browserslist-ga-export?tab=readme-ov-file#google-analytics-4)
2. Open the browser metrics CSV file (step 4 from the link above) and delete the "grand total" row if it is present. That row increases the column count and messes up the script.
3. Place the metrics file (`metrics.csv` or whatever) in the `cfpb-analytics` repository.
4. In Terminal, `cd` into the `cfpb-analytics` repository and use the command `npx browserslist-ga-export --reportPath metrics.csv`, to generate the `.json` file.
5. Remove the `metrics.csv` file (we don't want to commit the CSV) and move `browserslist-stats.json` to `cfpb-analytics/packages/browserslist-config/browserslist-stats.json` and replace the JSON file that is there already.
6. Edit the `version` field in `cfpb-analytics/packages/browserslist-config/package.json` and increment the version one digit.
7. Create a new git branch in `cfpb-analytics` and run `git status` to see that only the `browserslist-config/browserslist-stats.json` and `browserslist-config/package.json` are changed. Commit these two files and push up to GitHub.
8. Create a Pull Request (PR) on GitHub and open it for review. If all looks good, it can be merged.
9. Run the [release management](#release-management) instructions below to make a new release.
10. Open a new PR in repos that use this package
    (such as [consumerfinance.gov](https://github.com/cfpb/consumerfinance.gov)
    and the [design-system](https://github.com/cfpb/design-system))
    and bump `@cfpb/browserslist-config`. The commmand `yarn upgrade-interactive --latest` can often be used.
11. Update any relevant docs, such as the list on
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
3. If it hasn't already been incremented, increment the version number in the package's `package.json`.
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
