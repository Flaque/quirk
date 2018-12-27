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

## Design Logic

Qurik is built with two main goals in mind:
* Don't be bloated
* Don't be evil

Those seem like simple goals, yet many existing mental health apps seem to fail on both. 

### Don't be bloated

**Don't include features for one particular condition at the expense of other conditions.** For example, don't couple mood tracking to thought tracking. If a user _has_ to enter a mood in order to track a thought, then the entire app is ruined for people who use it for panic, OCD or another condition where mood isn't the primary focus.

**Don't include non-CBT related treatments without good reason.** No relaxation audio tracks or meditation guides. It's a CBT app, keep it focused on CBT.

**Don't include things that could be better acomplished by another app.** No one needs an in-app diary when a diary works just fine. No one needs an in-app heart rate tracker when a heart rate tracker works just fine. 

**Be quick and efficent.** Thoughts shouldn't take 5 minutes to enter and you should be able to skip fields if it's reasonable. Don't let the perfect be the enemy of the good. 

### Don't be Evil

**Thoughts are more valuable than passwords, treat them that way.** Most people would rather give over their passwords than their CBT thoughts. They're incredibly private, occasionally involve other people, and frequently are embarrassing.

**Don't have $200 dollar in app purchases.** I'm looking at you CBT Thought Diary. I get it, developers need to make money. It costs a lot to just keep the app on the app store. But you're preying on vulnerable people. Very few people of rational mind will purposely spend $200s for a dark mode. Gimme a break. 

**Don't have dumb notifications.** Scheduling is fine, abusing push notifications so your app has better traffic is scummy and gross.

**Be open.** Not every app has to be open source; it's a hard choice to make. But be clear and obvious within the app about what's going on with the user's data. Don't be sending it to some server without making that clear within the app, not within some dumb privacy policy no one will ever read. 

**Don't push people to be unhappy.** I cannot believe I have to state this, but do not purposefully or accidentally force people to be unhappy to use their app. Don't force people to state their unhappy in order to access a feature. 

**Be extremely cautious about making engagement your core metric.** User engagement is fine to be concerned about. We all want people who need help to be actually engaging in the help. But holy moly becareful about this. You _do not_ want to drive something that is for many people a treatment into a self-perpetuating engagement loop. A ruthless focus on engagement has caused many a product to become skinner boxes. _No one should ever be addicted to your mental health app._  

## Stupid Design Logic

I'm not really a designer, but I do like to engage in _stupid design logic_ for why things are a certain way. _Stupid design logic_ differs from traditional design logic by being inherently biased and largely driven by emotion, personality, and whatever part of your brain has decided to listen to _XYZ-pop-song_ on loop for three days. 

In other words, it's raw, unadulterated opinion with no basis in research or experience.

Quirk has a particular style, but it's one I ripped off from a bunch of other apps. Some components are muted because they're dumb and not the important bits. But the important bits are big, gigantic works of in-your-face crunchy juicy goodness. Titles should be bold, the boldyest bold you got. Only got one thing to say? Make [that thing a full screen giant, towering over mortals.](https://i.imgur.com/zcplBkP.png)

Illustrations should be excessively cute and burst with as much personality as your artistic talent can muster. None of that sleek silicon valley business-casual airplane art. Nah. **Give me bubbles and smiles.** Draw little dudes and [make them eat each other.](https://i.imgur.com/JYM9CbA.png) We're making a healthy-cool app here, not some collared-shirt-wearing fintech money-market manstravaganza.

Likewise, I don't want any of the branding of most mental health tools. Almost all of them seem like they're afraid of their users. They all seem to be as quiet and bland as possible as if their users would get spooked and run away. 

This ends up coming across as either _really_ patronizing or _really_ sterile. In general it's
both.

Folks with mental health issues are tough! They can handle bold, out there stuff. Literally
no one should be trying to create the design equivalent of a hospital.

By choosing a neutral, unassuming brand identity, you're choosing to hide your product
from the people who need it most. If you're making mental health tech, you're probably
trying to help people; why wouldn't you be as in-your-face-shout-it-from-the-roof-tops
as possible?

Give these tools the respect they deserve; don't be afraid of the subject matter. You're not JP Morgan or whatnot. 

_This general thinking draws heavily on [the game design concept of "Juice."](https://www.youtube.com/watch?v=216_5nu4aVQ)_

## Color Palette

To bootstrap this, we're just using [a pre-canned, but fairly muted, color palette.](https://flatuicolors.com/palette/ru)

![palette](https://i.imgur.com/yXyLg3I.png)

# Engineering Logic

Quirk _must not_ lose user data. The entire point of the app is to record your thoughts, so if you lost them it would be pretty bad. As stated in [one study](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6010839/):

> While an app failure in general can be inconvenient and annoying, it can have serious consequences in the context of mental health apps—someone who has come to rely on an app for emotional support can find a failure “devastating.”

Therefore, data management should be given a higher priority than any other part of the app. 

## Taxonomy and Order of Data Failure Cases
The following is a list of extremely _bad_ behaviors and states that could happen in order of severity.

### 1 - Large Scale Data Corruption
All thoughts have been corrupted somehow. For example, the JSON format of every item is wrong. This is put at the top because not only can a user not access the data, but it may spiral out can cause continuing errors forcing the app to be "bricked."

### 2 - Large Scale Data Loss
All thoughts have been deleted without any hope of recovery.

### 3 - Small Scale Data Loss
A small amount of data has been deleted without any hope of recovery.

### 4 - Small Scale Data Corruption
A small amount of data has been corrupted in a recoverable way. The user still has lost data, but the app does not crash, and this is potentially fixable via an update. 

# License

Quirk is licensed under the [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License), which guarantees end users the freedom to study, share, and modify the software.

Note that this license **does not** give free reign to redistribute the name and branding of quirk. So if you'd like to publish your own version, please rename it to avoid end-user confusion.
