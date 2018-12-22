# 🐙 quirk

Quirk is a ~crossplatform~ (iOS, Android coming soon), GPL-licensed, [Cognitive Behavioral Therapy (CBT)](https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy#Declining_effectiveness)
app built in React Native / Expo.

Unlike many CBT apps, it's fairly unbiased in what you use it for; it doesn't ask about your mood or ask you
to depression-specific CBT exercises. That makes it fairly quick and discreet to use, especially in a public
setting.

![mockup](https://i.imgur.com/UKY0jc4.png)

## Running Locally

Quirk is built on React Native and therefore assumes you have [node](https://nodejs.org/en/) installed.
[Yarn](https://yarnpkg.com/en/) is preferred over NPM as a package manager.

```sh
# clone the project and cd into it
git clone git@github.com:Flaque/quirk.git; cd ./quirk

# install dependencies
yarn

# start development environment
yarn start
```

You'll then be in the [expo development environment](https://docs.expo.io/versions/latest/).
If you already have XCode installed with a simulator, you can just press `i` to start it.

# Design

Quirk's goal is to be both inviting and focused. It should be _really_ easy to enter in a thought; people frequently enter these in public settings and need to do it fairly quickly. It also should not cause any increased frustration.

## Color Palette

To bootstrap this, we're just using [a pre-canned, but fairly muted, color palette.](https://flatuicolors.com/palette/ru)

![palette](https://i.imgur.com/yXyLg3I.png)

## Other Stupid Design Logic

I'm not really a designer, but I do like to engage in _stupid design logic_ for why things are a certain way. Quirk has
a particular style, but it's one I ripped off from a bunch of other apps.

Some things are muted because they're dumb and not the important bits. But the important bits are big, gigantic works of in-your-face crunchy juicy goodness. Titles should be bold, the boldyest bold you got. Only got one thing to say? Make [that thing a full screen giant, towering over mortals.](https://i.imgur.com/zcplBkP.png)

Illustrations should be excessively cute and burst with as much personality as your artistic talent can muster. None of that sleek silicon valley business-casual airplane art. Nah. **Give me bubbles and smiles.** Draw little dudes and [make them eat each other.](https://i.imgur.com/JYM9CbA.png) We're making a healthy-cool app here, not some collared-shirt-wearing fintech money-market manstravaganza.

Likewise, I don't want to have literally any of the branding of most mental health tools. Almost
all of them seem like they're afraid of their users. They all seem to be as quiet and bland as possible as if their users would get spooked and run away.

This ends up coming across as either _really_ patronizing or _really_ sterile. In general it's
both.

Folks with mental health issues are touch! They can handle bold, out there stuff. Literally
no one should be trying to create the design equivalent of a hospital.

By choosing a neutral, unassuming brand identity, you're choosing to hide your product
from the people who need it most. If you're making mental health tech, you're probably
trying to help people; why wouldn't you be as in-your-face-shout-it-from-the-roof-tops
as possible?

Like come on, you're not JP Morgan or something; you're literally saving people's _brains_.

When I first started making things, I made those websites that just threw every color you could on the page and it looked awful. Eventually I noticed it looked awful and then became super cautious about doing anything remotely interesting. I think I'm back in a happy medium. The UI design tweeks I stole from a lot of other apps, this general thinking comes from [the game design concept of "Juice."](https://www.youtube.com/watch?v=216_5nu4aVQ)

# License

Quirk is licensed under the [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License), which guarantees end users the freedom to study, share, and modify the software.

Note that this license **does not** free reign to redistribute the name and branding of quirk. So if you'd like to publish your own version, please rename it to avoid end-user confusion.
