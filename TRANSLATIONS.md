# WIP: It's probably not the best time to translate Quirk.

🚨🚨🚨 Translations are a bit broken at the moment while we migrate to a Fluent+Pontoon instance instead of json files. 

----
----
----

# How to contribute a new language

## Create a JSON file

Copy the `src/locals/en.json` file to a new locale following [the ISO-639-1](http://www.loc.gov/standards/iso639-2/php/English_list.php) code. If you have a region designator and you know it, add it as an underscore as described by @briankung.

For example, if I wanted to translate to Finnish like @Walther, I would do:

```
cp src/locals/en.json src/locals/fi.json
```

Note that the convention typically uses the English name for the language, so no `suomi.json`! 😭

## Fill out the JSON file

Go through as much as you can and translate into your language. If you can't translate everything, that's okay, it will fall back to English.

## Open up `src/i18n.ts` and add your language

In the file, add an import line:

```
import fi from './locals/fi.json'
```

And then add it to the translations object:

```
i18n.translations = { fr, en };
```

## Save your code and open up a new PR

```
git checkout -b finnish;
git add .;
git commit -m "Add Finnish"
git push;
```

Then go on github, click "New Pull Request", and then fill in your branch and master:

<img width="825" alt="Screen Shot 2019-04-06 at 5 17 52 PM" src="https://user-images.githubusercontent.com/5942769/55676761-f37af500-588f-11e9-9c4a-fc205ca2043e.png">

## Then, give a little description of what you're doing and open your PR!

<img width="834" alt="Screen Shot 2019-04-06 at 5 19 37 PM" src="https://user-images.githubusercontent.com/5942769/55676770-363ccd00-5890-11e9-96f9-f797f65fc3ef.png">

## Finally, give a translation of the description

If you can, in your PR, please include a translation of the description of the app for stores:

> Quirk is a tool for Cognitive Behavioral Therapy (CBT). CBT is one of the most effective and widely prescribed treatments for depression, anxiety, panic disorder, and multiple other mental health problems.  
> Quirk helps you record "automatic thoughts," challenge them, and then train your brain with an alternative thought.
> The app is open source under the GPL. You can find the code on Github at: https://github.com/Flaque/quirk

If possible, please translate the following keywords too (required by iOS localization):

> Anxiety, Depression, Cognitive Behavioral Therapy, CBT, Panic
