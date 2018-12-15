# 🐙 quirk

Quirk is a crossplatform, GPL-licensed, [Cognitive Behavioral Therapy (CBT)](https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy#Declining_effectiveness) 
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

# License

Quirk is licensed under the [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License), which 
guarantees end users the freedom to study, share, and modify the software.

## Does that mean I can publish and redistribute my own version?

As long as you publicly share the up-to-date code, you can yes. Though I would ask that you change the name and branding 
to avoid conflicts and confusions among less tech-savy customers.
