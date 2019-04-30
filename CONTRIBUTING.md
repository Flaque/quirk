# Contributing to Quirk

If you like Quirk, you're welcome to submit a PR, throw down an issue, or otherwise contribute to the project.

## Psychiatrists, Therapists, Researchers and other experts

If you're interested in giving expert advice to Quirk or would like to use it for your patients, I'd love to talk to you.

Quirk is currently _not made_ with any expert involvement (just a whole bunch of [NIH searching](https://www.ncbi.nlm.nih.gov/pmc/)). But I'd very much welcome expert opinions or consultations.

Feel free to shoot me an email:

```
humans @ usequirk.com
```

## Versioning and Beta Testing

Quirk follows semver, but not every version is actually released.

This is because iOS/expo doesn't have a solid understanding of release candidates AFAIK. So in order to beta test, we bump the version in `app.json` and then release a version:

```
yarn ship
```

That version gets shipped to beta testers but might not actually be the version released to the store.
