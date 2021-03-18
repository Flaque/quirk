🚧🚧🚧

**Quirk is no longer being maintained.**

Quirk started as a little thing I made for myself as I started doing CBT. As I got better, I needed Quirk less. But at the same time, lots of other people had discovered Quirk and started picking it up. That meant more bug fixes, more features, and just more work to be done. I really couldn't keep it up well, especially with my main focus at the time (my day job). 

So in order to work on it full time, my brother and I tried to turn it into a company. That way we could continue to develop Quirk as a primary focus, even if we didn't need it anymore. 

For awhile, Quirk was going quite well. Lots of people subscribed, we got backed by [Y Combinator](https://www.ycombinator.com/), and we were growing _very_ quickly. 

Unfortunately, in order for the business to work and for us to pay ourselves, we needed folks to be subscribed for a fair amount of time. But in general, most people fell into three camps: didn't use the app at all (and weren't getting value for what they paid), felt better and then unsubscribed, or didn't feel better but persisted anyway. That meant the business model treated successes as failures and failures as successes. So a future Quirk would need to make people feel worse for longer or otherwise not help people we signed up to help. If the incentives of the business weren't aligned with the people, it would have been naive to assume that we could easily fix it as the organization grew and we held less control. We didn't want to go down that path, so we pivoted the company. 

Anyone who's followed this project will know that we explored multiple paths towards sustainability. Much of it was discussed in the PRs and issues of this repo. We've investigated a completely free model, an indie open source model, a community open source model, a donation model, a pay-up-front model, an ad model, a tele-therapy model, and a subscription model. 

**Quirk (the company) is now Room Service.**

Now-a-days, we're making [Room Service](https://www.roomservice.dev/), which helps folks build multiplayer stuff, like what Figma or Google Docs have. Multiple cursors, CRDTs, sockets, lots of people editing the same thing, that sort of thing. We're still the same commercial entity and such, just making a different product now. If you think multiplayer systems are cool and want to join us, send me an email: `evan @ roomservice . dev`. 

**Make your own Quirk.**

If you like Quirk and want it to continue, feel free to fork it. We'd ask that you change the name to avoid confusion. Just heed our warning, becareful about the way you keep yourself afloat and becareful about your desire to work on this full-time. There's [more of a write up about this here.](https://evanjconrad.com/posts/moral-competence) 

If you want to fork Quirk, you should fork off of [this commit](https://github.com/Flaque/quirk/commit/7a4eabe48414de5edfefcd693e79178120eae142), it's right before we added payments and when the code was the cleanest. 

🚧🚧🚧


---

<p align="center">
<h1 align="center">✨🐙 quirk. </h1>
</p>
<p align="center">
  <a href="https://itunes.apple.com/us/app/quirk-cbt/id1447026451?mt=8">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=tech.econn.quirk">Download Android</a> • <a href="mailto:humans+github@quirk.fyi">Contact</a> • <a href="https://tinyletter.com/quirk">Newsletter</a>
<br><br>
</p>

Quirk is a crossplatform, GPL-licensed, [Cognitive Behavioral Therapy (CBT)](https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy)
app built in React Native / Expo.

Unlike many CBT apps, it's fairly unbiased in what you use it for; it doesn't ask about you
to do depression-specific CBT exercises. That makes it fairly quick and discreet to use, especially in a public
setting.

![screenshot](https://i.imgur.com/64Cpmpm.png)

## How Quirk Supports Itself

In order for Quirk to support itself, **it charges a small subscription fee.** Currently it's $5.99 / month in the US, which is roughly the cost of a cup of coffee. This helps pay for a full-time developer to make Quirk not-dead and generally good. 

### The Survival Law of Product Design

To understand _why_ we do a subscription, we can look to the Survival Law of Product Design, a fancy term I just made up. When you make a product, whatever keeps that product alive becomes the primary force of design. 

For example, facebook.com is not Facebook's product, facebook.com/business/ads is Facebook's product. Because 0 dollars are made from facebook accounts, only from advertisers that pay to get access to those facebook accounts. The way you keep the lights on ultimately shapes the product you make. 

So if you want to make a good product that helps folks, you should pick a model of sustainability where the financial incentives of the organization are aligned with the individual interests of the users.

After a lot of tries with other models, that ended up being a subscription. In a subscription, the primary metric is retention: are people still using this thing? If retention drops, people cancel their subscription and you no longer get to exist.

The _only_ solid way to have good retention is to create something that is actively useful and good. Similarly, the only way to get any value from CBT is to consistently do it. 

## Contributors

Some amazing folks have helped build the Quirk you see today.

- [@devinroche](https://github.com/devinroche) for setting up translation and stepping up as a core maintainer 🔥
- [@devilcius](https://github.com/devilcius) for the amazing Spanish translation 🇪🇸
- [@idnovic](https://github.com/idnovic) for the amazing German translation 🇩🇪 (and the iPad support!)
- [@kwierbol](https://github.com/kwierbol) for the amazing Polish translation 🇵🇱
- [@Walther](https://github.com/Walther) for the amazing Finnish translation 🇫🇮
- [@Jos512](https://github.com/Jos512) for the amazing Dutch translation 🇳🇱
- [@jinto](https://github.com/jinto) for the amazing Korean translation 🇰🇷
- [@briankung](https://github.com/briankung) for the Chinese 🇨🇳 localization, internationalization support and helping guide the entire translation effort. 🎉
- [@akinariobi](https://github.com/akinariobi) for the Russian translation 🇷🇺 
- [@miguelmf](https://github.com/miguelmf) for the Portugese translation 🇵🇹
- [@comradekingu](https://github.com/comradekingu) for the Norweigan Bokmål translation 🇳🇴
- [@micheleriva](https://github.com/micheleriva) for the Italian translation 🇮🇹
- [@Jolg42](https://github.com/jolg42) for the French translation 🇫🇷
- [@Buricescu](https://github.com/Buricescu) for the Romanian translation 🇷🇴

## Running Locally

Quirk is built on React Native and therefore assumes you have [node](https://nodejs.org/en/) installed.
[Yarn](https://yarnpkg.com/en/) is preferred over NPM as a package manager.

```sh
# clone the project and cd into it
git clone git@github.com:Flaque/quirk.git; cd ./quirk

# copy the sample .env (edit as required)
cp .env.sample .env

# install dependencies
yarn

# start development environment
yarn start
```

You'll then be in the [expo development environment](https://docs.expo.io/versions/latest/).
If you already have XCode installed with a simulator, you can just press `i` to start it.

# Can I help?

Of course!

**If you like the app,** go give it 5 stars! It helps more people find the app.

**If you're a mental health professional,** audit [the descriptions](https://github.com/Flaque/quirk/blob/master/src/locals/en.json) of the cognitive distortions. If you have suggestions, let me know and we'll change stuff!

**If you can draw** and can make digital illustrations of the little blobs, let me know and I'll find a place to stick them in the app!

**If you know a language other than English,** help [us translate the app!](/TRANSLATIONS.md)

# Design

Quirk's goal is to be both inviting and focused. It should be _really_ easy to enter in a thought; people frequently enter these in public settings and need to do it fairly quickly. It also should not cause any increased frustration.

## Design Logic

Quirk is built with two main goals in mind:

- Don't be bloated
- Don't be evil

### Don't be bloated

**Don't include features for one particular condition at the expense of other conditions.** For example, don't couple mood tracking to thought tracking. If a user _has_ to enter a mood in order to track a thought, then the entire app is ruined for people who use it for panic, OCD or another condition where mood isn't the primary focus.

**Don't include non-CBT related treatments without good reason.** No relaxation audio tracks or meditation guides. It's a CBT app, keep it focused on CBT.

**Don't include things that could be better accomplished by another app.** No one needs an in-app diary when a diary works just fine. No one needs an in-app heart rate tracker when a heart rate tracker works just fine.

**Be quick and efficient.** Thoughts shouldn't take 5 minutes to enter and you should be able to skip fields if it's reasonable. Don't let the perfect be the enemy of the good.

### Don't be Evil

**Thoughts are more valuable than passwords, treat them that way.** Most people would rather give over their passwords than their CBT thoughts. They're incredibly private, occasionally involve other people, and frequently are embarrassing.

**Don't have \$200 dollar in app purchases.** I'm looking at you CBT Thought Diary. I get it, developers need to make money. It costs a lot to just keep the app on the app store. But you're preying on vulnerable people. Very few people of rational mind will purposely spend \$200s for a dark mode.

**Don't have dumb notifications.** Scheduling is fine, abusing push notifications so your app has better traffic is scummy and gross.

**Be open.** Not every app has to be open source; it's a hard choice to make. But be clear and obvious within the app about what's going on with the user's data. Don't be sending it to some server without making that clear within the app, especially if it's not providing any extra utility to the user.

**Don't push people to be unhappy.** Do not purposefully or accidentally force people to be unhappy to use their app. Don't force people to state their unhappy in order to access a feature. It's easy for this to sneak up in the design, if a user has to rate their happiness below average in order to access the CBT features, you're asking them to be unhappy to use your app.

**Be extremely cautious about making engagement your core metric.** User engagement is fine to be concerned about. We all want people who need help to be actually engaging in the help. But holy moly becareful about this. You _do not_ want to drive something that is for many people a treatment into a self-perpetuating engagement loop. A ruthless focus on engagement has caused many a product to become skinner boxes. _No one should ever be addicted to your mental health app._

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

HINDI LANGUAGE
🚧🚧🚧

** क्वर्क अब नहीं बनाए जा रहे हैं। **

क्वर्क ने एक छोटी सी चीज के रूप में शुरुआत की जो मैंने अपने लिए बनाई थी क्योंकि मैंने सीबीटी करना शुरू कर दिया था। जैसे-जैसे मैं बेहतर होता गया, मुझे क्वर्क कम की जरूरत थी। लेकिन उसी समय, बहुत से अन्य लोगों ने क्वर्क की खोज की थी और इसे चुनना शुरू कर दिया था। इसका मतलब था कि अधिक बग फिक्स, अधिक सुविधाएं, और बस अधिक काम किया जाना है। मैं वास्तव में इसे अच्छी तरह से नहीं रख सका, विशेष रूप से उस समय (मेरा दिन का काम)।

इसलिए इस पर काम करने के लिए मैंने और मेरे भाई ने इसे एक कंपनी में बदलने की कोशिश की। इस तरह हम क्वर्की को प्राथमिक फोकस के रूप में विकसित करना जारी रख सकते हैं, भले ही हमें अब इसकी आवश्यकता न हो।

थोड़ी देर के लिए, Quirk काफी अच्छा चल रहा था। बहुत से लोगों ने सदस्यता ली, हमें [Y Combinator] (https://www.ycombinator.com/) द्वारा समर्थन मिला, और हम तेज़ी से बढ़ रहे थे।

दुर्भाग्य से, व्यवसाय के लिए काम करने के लिए और हमें खुद का भुगतान करने के लिए, हम लोगों को उचित समय के लिए सदस्यता लेने की आवश्यकता थी। लेकिन सामान्य तौर पर, अधिकांश लोग तीन शिविरों में गिर गए: एप्लिकेशन का उपयोग बिल्कुल नहीं किया (और वे जो भुगतान करते हैं, उसके लिए मूल्य नहीं मिल रहा था), बेहतर महसूस किया और फिर सदस्यता समाप्त कर दिया, या वैसे भी बेहतर महसूस नहीं किया लेकिन वैसे भी कायम रहा। इसका मतलब था कि बिजनेस मॉडल ने सफलताओं को असफलताओं के रूप में और असफलताओं को सफलताओं के रूप में माना। इसलिए भविष्य के क्वर्की को लोगों को लंबे समय तक बदतर महसूस करने की आवश्यकता होगी या अन्यथा उन लोगों की मदद नहीं करेंगे जिन्हें हमने मदद करने के लिए साइन अप किया है। यदि व्यवसाय के प्रोत्साहन को लोगों के साथ गठबंधन नहीं किया गया था, तो यह मानना ​​अच्छा होगा कि संगठन के बढ़ने पर हम इसे आसानी से ठीक कर सकते हैं और हमने कम नियंत्रण रखा। हम उस रास्ते से नीचे नहीं जाना चाहते थे, इसलिए हमने कंपनी को रोक दिया।

इस परियोजना का अनुसरण करने वाले किसी को भी पता चल जाएगा कि हमने स्थिरता की दिशा में कई रास्ते तलाशे हैं। इस रेपो के मुद्दों और मुद्दों पर बहुत चर्चा हुई। हमने पूरी तरह से मुक्त मॉडल, एक इंडी ओपन सोर्स मॉडल, एक सामुदायिक ओपन सोर्स मॉडल, एक दान मॉडल, एक पे-अप-फ्रंट मॉडल, एक विज्ञापन मॉडल, एक टेली-थेरेपी मॉडल और एक सदस्यता मॉडल की जांच की है।

** क्वर्क (कंपनी) अब कक्ष सेवा है। **

अब-एक दिन, हम [कक्ष सेवा] (https://www.roomservice.dev/) बना रहे हैं, जो लोगों को मल्टीप्लेयर सामान बनाने में मदद करता है, जैसे कि फिगमा या Google डॉक्स। एकाधिक कर्सर, CRDTs, सॉकेट्स, बहुत से लोग एक ही चीज़ को संपादित करते हैं, उस तरह की चीज़। हम अभी भी एक ही वाणिज्यिक इकाई हैं और इस तरह, अभी एक अलग उत्पाद बना रहे हैं। यदि आपको लगता है कि मल्टीप्लेयर सिस्टम शांत हैं और हमसे जुड़ना चाहते हैं, तो मुझे एक ईमेल भेजें: `evan @ roomervice। देव`।

** अपना खुद का क्वर्की बनाओ। **

यदि आपको क्वर्क पसंद है और इसे जारी रखना चाहते हैं, तो बेझिझक इसे कांटा करें। हम पूछेंगे कि आप भ्रम से बचने के लिए नाम बदलते हैं। बस हमारी चेतावनी पर ध्यान दें, जिस तरह से आप अपने आप को बचाए रखते हैं और इस पूर्णकालिक पर काम करने की इच्छा के बारे में चिंतित हैं। यहाँ [इस बारे में अधिक लिखने के लिए।] (https://evanjconrad.com/posts/moral-competence)

यदि आप क्वर्क को कांटा बनाना चाहते हैं, तो आपको [इस कमिट] (https://github.com/Flaque/quirk/commit/7a4eabe48414de5edfefcd693e79178120eac142) पर कांटा लगाना चाहिए, इससे पहले कि हम भुगतान जोड़ते हैं और जब कोड सबसे साफ था।

🚧🚧🚧


---

<p align="center">
<h1 align="center">✨🐙 quirk. </h1>
</p>
<p align="center">
  <a href="https://itunes.apple.com/us/app/quirk-cbt/id1447026451?mt=8">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=tech.econn.quirk">Download Android</a> • <a href="mailto:humans+github@quirk.fyi">Contact</a> • <a href="https://tinyletter.com/quirk">Newsletter</a>
<br><br>
</p>

Quirk is a crossplatform, GPL-licensed, [Cognitive Behavioral Therapy (CBT)](https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy)
app built in React Native / Expo.

Unlike many CBT apps, it's fairly unbiased in what you use it for; it doesn't ask about you
to do depression-specific CBT exercises. That makes it fairly quick and discreet to use, especially in a public
setting.

![screenshot](https://i.imgur.com/64Cpmpm.png)

## कैसे क्वर्क खुद का समर्थन करता है

क्वर्क को खुद का समर्थन करने के लिए, ** यह एक छोटी सदस्यता शुल्क लेता है। ** वर्तमान में यह यूएस में $ 5.99 / महीना है, जो लगभग एक कप कॉफी की लागत है। यह क्विकर को मृत और आम तौर पर अच्छा बनाने के लिए पूर्णकालिक डेवलपर के लिए भुगतान करने में मदद करता है।

### उत्पाद डिजाइन का उत्तरजीविता कानून

_Why_ को समझने के लिए, हम एक सदस्यता करते हैं, हम उत्पाद डिजाइन के अस्तित्व कानून को देख सकते हैं, एक फैंसी शब्द जिसे मैंने अभी बनाया है। जब आप एक उत्पाद बनाते हैं, तो जो कुछ भी उस उत्पाद को जीवित रखता है वह डिजाइन का प्राथमिक बल बन जाता है।

उदाहरण के लिए, facebook.com फेसबुक का उत्पाद नहीं है, facebook.com/business/ads फेसबुक का उत्पाद है। क्योंकि 0 डॉलर facebook खातों से बने होते हैं, केवल उन विज्ञापनदाताओं से जो उन फेसबुक खातों तक पहुँच प्राप्त करने के लिए भुगतान करते हैं। जिस तरह से आप रोशनी बनाए रखते हैं, वह आपके द्वारा बनाए गए उत्पाद को आकार देता है।

इसलिए यदि आप एक अच्छा उत्पाद बनाना चाहते हैं जो लोगों की मदद करता है, तो आपको स्थिरता का एक मॉडल चुनना चाहिए जहां संगठन के वित्तीय प्रोत्साहन उपयोगकर्ताओं के व्यक्तिगत हितों के साथ गठबंधन किए जाते हैं।

अन्य मॉडलों के साथ बहुत कोशिशों के बाद, सदस्यता समाप्त हो गई। एक सदस्यता में, प्राथमिक मीट्रिक प्रतिधारण है: क्या लोग अभी भी इस चीज़ का उपयोग कर रहे हैं? यदि अवधारण गिरता है, तो लोग अपनी सदस्यता रद्द कर देते हैं और आपको अब अस्तित्व में नहीं मिलता है।

अच्छा प्रतिधारण करने का _only_ ठोस तरीका कुछ ऐसा बनाना है जो सक्रिय रूप से उपयोगी और अच्छा हो। इसी तरह, सीबीटी से किसी भी मूल्य को प्राप्त करने का एकमात्र तरीका लगातार करना है।

## योगदानकर्ता

कुछ अद्भुत लोगों ने आज आपके द्वारा देखे गए क्वर्क के निर्माण में मदद की है।

- [@devinroche](https://github.com/devinroche) for setting up translation and stepping up as a core maintainer 🔥
- [@devilcius](https://github.com/devilcius) for the amazing Spanish translation 🇪🇸
- [@idnovic](https://github.com/idnovic) for the amazing German translation 🇩🇪 (and the iPad support!)
- [@kwierbol](https://github.com/kwierbol) for the amazing Polish translation 🇵🇱
- [@Walther](https://github.com/Walther) for the amazing Finnish translation 🇫🇮
- [@Jos512](https://github.com/Jos512) for the amazing Dutch translation 🇳🇱
- [@jinto](https://github.com/jinto) for the amazing Korean translation 🇰🇷
- [@briankung](https://github.com/briankung) for the Chinese 🇨🇳 localization, internationalization support and helping guide the entire translation effort. 🎉
- [@akinariobi](https://github.com/akinariobi) for the Russian translation 🇷🇺 
- [@miguelmf](https://github.com/miguelmf) for the Portugese translation 🇵🇹
- [@comradekingu](https://github.com/comradekingu) for the Norweigan Bokmål translation 🇳🇴
- [@micheleriva](https://github.com/micheleriva) for the Italian translation 🇮🇹
- [@Jolg42](https://github.com/jolg42) for the French translation 🇫🇷
- [@Buricescu](https://github.com/Buricescu) for the Romanian translation 🇷🇴

## स्थानीय रूप से चल रहा है

Quirk रिएक्टिव नेटिव पर बनाया गया है और इसलिए आपको लगता है कि आपके पास [नोड] (https://nodejs.org/en/) स्थापित है।
[यार्न] (https://yarnpkg.com/en/) एनपीएम पर पैकेज मैनेजर के रूप में पसंद किया जाता है।

`` `श
# इस परियोजना को क्लोन और सीडी में
git क्लोन git@github.com: Flaque / quirk.git; सीडी ./quirk

# नमूने को कॉपी करें। (आवश्यक के रूप में संपादित करें)
cp .env.sample .env

# निर्भरता स्थापित करें
धागा

# विकास का माहौल शुरू करें
यार्न की शुरुआत
`` `

तब आप [एक्सपो डेवलपमेंट एन्वायरमेंट] (https://docs.expo.io/versions/latest/) में होंगे।
यदि आपके पास पहले से ही एक सिम्युलेटर के साथ XCode स्थापित है, तो आप इसे शुरू करने के लिए बस `i` दबा सकते हैं।

# क्या मैं मदद कर सकता हूँ?

बेशक!

** आप एप्लिकेशन को पसंद करते हैं, तो ** यह 5 सितारों दे जाओ! यह अधिक लोगों को ऐप ढूंढने में मदद करता है।

** यदि आप एक मानसिक स्वास्थ्य पेशेवर हैं, तो संज्ञानात्मक विकृतियों का ** ऑडिट [विवरण] (https://github.com/Flaque/quirk/blob/master/src/locals/en.json)। यदि आपके सुझाव हैं, तो मुझे बताएं और हम सामान बदल देंगे!

** यदि आप ड्रा कर सकते हैं ** और छोटे बूँद के डिजिटल चित्र बना सकते हैं, मुझे बताएं और मैं उन्हें ऐप में छड़ी करने के लिए एक जगह ढूंढूंगा!

** यदि आप अंग्रेजी के अलावा कोई अन्य भाषा जानते हैं, तो ** [[ऐप का अनुवाद करने में हमारी सहायता करें!]

# डिज़ाइन

क्वर्क का लक्ष्य आमंत्रित और केंद्रित दोनों होना है। यह एक विचार में प्रवेश करने के लिए _really_ आसान होना चाहिए; लोग अक्सर सार्वजनिक सेटिंग्स में इसे दर्ज करते हैं और इसे जल्दी से करने की आवश्यकता होती है। यह किसी भी बढ़ी हुई निराशा का कारण नहीं होना चाहिए।
## डिजाइन तर्क

Quirk को दो मुख्य लक्ष्यों को ध्यान में रखकर बनाया गया है:

- फूला न हो
- बुराई मत करो

### फूला न हो

** अन्य शर्तों की कीमत पर एक विशेष स्थिति के लिए सुविधाओं को शामिल न करें। ** उदाहरण के लिए, युगल मूड ट्रैकिंग विचार करने के लिए मत करो। यदि कोई उपयोगकर्ता _has_ किसी विचार को ट्रैक करने के लिए मूड में प्रवेश करता है, तो संपूर्ण ऐप उन लोगों के लिए बर्बाद हो जाता है जो इसे घबराहट, ओसीडी या किसी अन्य स्थिति के लिए उपयोग करते हैं जहां मूड प्राथमिक ध्यान केंद्रित नहीं है।

** अच्छे कारण के बिना गैर-सीबीटी संबंधित उपचार शामिल न करें। ** कोई विश्राम ऑडियो ट्रैक या ध्यान गाइड नहीं। यह एक सीबीटी ऐप है, इसे सीबीटी पर केंद्रित रखें।

** उन चीजों को शामिल न करें जो किसी अन्य ऐप द्वारा बेहतर तरीके से पूरी की जा सकती हैं। ** किसी को भी ऐप में डायरी की जरूरत नहीं होती है जब एक डायरी ठीक काम करती है। जब कोई हार्ट रेट ट्रैकर ठीक काम करता है तो किसी को इन-ऐप हार्ट रेट ट्रैकर की जरूरत नहीं होती है।

** त्वरित और कुशल बनें। ** विचार में प्रवेश करने के लिए 5 मिनट का समय नहीं होना चाहिए और यदि यह उचित है तो आपको फ़ील्ड को छोड़ना चाहिए। चलो अच्छाई का दुश्मन मत बनो।

### बुराई मत बनो

** विचार पासवर्ड की तुलना में अधिक मूल्यवान हैं, उनके साथ इस तरह से व्यवहार करें। ** अधिकांश लोग अपने सीबीटी विचारों के बजाय अपने पासवर्ड को छोड़ देंगे। वे अविश्वसनीय रूप से निजी हैं, कभी-कभी अन्य लोगों को शामिल करते हैं, और अक्सर शर्मनाक होते हैं।

** app खरीद में $ 200 डॉलर नहीं है। ** मैं आपको CBT थॉट डायरी देख रहा हूं। मुझे यह मिलता है, डेवलपर्स को पैसा बनाने की जरूरत है। ऐप स्टोर पर सिर्फ ऐप रखने के लिए बहुत खर्च होता है। लेकिन आप कमजोर लोगों पर शिकार कर रहे हैं। तर्कसंगत दिमाग के बहुत कम लोग जानबूझकर अंधेरे मोड के लिए $ 200 का खर्च करेंगे।

** आपके पास डुप्लिकेट सूचनाएं नहीं हैं। ** शेड्यूलिंग ठीक है, पुश नोटिफिकेशन का दुरुपयोग करते हुए ताकि आपके ऐप में बेहतर ट्रैफ़िक है, स्कोमी और सकल है।

** खुला रहो। ** हर ऐप को खुला स्रोत नहीं होना चाहिए; यह एक कठिन विकल्प है। लेकिन उपयोगकर्ता के डेटा के साथ क्या हो रहा है, इस बारे में ऐप के भीतर स्पष्ट और स्पष्ट रहें। एप्लिकेशन के भीतर यह स्पष्ट किए बिना इसे किसी सर्वर पर न भेजें, खासकर अगर यह उपयोगकर्ता को कोई अतिरिक्त उपयोगिता प्रदान नहीं कर रहा है।

** लोगों को दुखी होने के लिए धक्का न दें। ** उद्देश्यपूर्ण या गलती से लोगों को अपने ऐप का उपयोग करने के लिए दुखी होने के लिए मजबूर न करें। किसी सुविधा का उपयोग करने के लिए लोगों को अपने दुखी होने के लिए मजबूर न करें। यदि डिज़ाइन में सीबीटी सुविधाओं का उपयोग करने के लिए किसी उपयोगकर्ता को औसत से नीचे अपनी खुशी का मूल्यांकन करना पड़ता है, तो इसके लिए डिज़ाइन करना आसान है, आप उन्हें अपने ऐप का उपयोग करने के लिए दुखी होने के लिए कह रहे हैं।

** सगाई को अपनी मुख्य मीट्रिक बनाने के बारे में अत्यधिक सतर्क रहें। ** उपयोगकर्ता की सगाई के बारे में चिंतित होना ठीक है। हम सभी चाहते हैं कि जिन लोगों को मदद की जरूरत है वे वास्तव में मदद में उलझे रहें। लेकिन पवित्र मोली इस बारे में सावधान। आप _ कुछ भी नहीं चाहते हैं कि कुछ लोगों के लिए एक स्व-स्थायी सगाई पाश में एक इलाज है। सगाई पर निर्मम ध्यान केंद्रित करने से कई उत्पाद स्किनर बॉक्स बन गए हैं। _No कभी भी आपके मानसिक स्वास्थ्य ऐप का आदी होना चाहिए ।_

# इंजीनियरिंग लॉजिक

Quirk _must not_ खोना उपयोगकर्ता डेटा। एप्लिकेशन का संपूर्ण बिंदु आपके विचारों को रिकॉर्ड करना है, इसलिए यदि आप उन्हें खो देते हैं तो यह बहुत बुरा होगा। जैसा कि [एक अध्ययन] (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6010839/) में कहा गया है:

> जबकि सामान्य रूप से ऐप की विफलता असुविधाजनक और कष्टप्रद हो सकती है, मानसिक स्वास्थ्य ऐप्स के संदर्भ में इसके गंभीर परिणाम हो सकते हैं - कोई व्यक्ति जो भावनात्मक समर्थन के लिए ऐप पर भरोसा करने के लिए आया है, वह विफलता "विनाशकारी" पा सकता है।

इसलिए, डेटा प्रबंधन को ऐप के किसी अन्य भाग की तुलना में एक उच्च प्राथमिकता दी जानी चाहिए।

## टैक्सोनॉमी और डेटा विफलता के मामलों के आदेश

निम्नलिखित अत्यंत _bad_ व्यवहारों और राज्यों की सूची है जो गंभीरता के क्रम में हो सकते हैं।

### 1 - बड़े पैमाने पर डेटा भ्रष्टाचार

सभी विचार किसी न किसी तरह दूषित हो चुके हैं। उदाहरण के लिए, हर आइटम का JSON प्रारूप गलत है। यह सबसे ऊपर रखा गया है क्योंकि न केवल एक उपयोगकर्ता डेटा तक नहीं पहुंच सकता है, लेकिन यह सर्पिल हो सकता है जिससे एप्लिकेशन को "ईंटित" होने के लिए निरंतर त्रुटियां हो सकती हैं।

### 2 - बड़े पैमाने पर डेटा हानि

पुनर्प्राप्ति की किसी भी आशा के बिना सभी विचारों को हटा दिया गया है।

### 3 - छोटे पैमाने पर डेटा हानि

पुनर्प्राप्ति की किसी भी उम्मीद के बिना डेटा की एक छोटी राशि को हटा दिया गया है।

### 4 - छोटे पैमाने पर डेटा भ्रष्टाचार

पुनर्प्राप्त तरीके से डेटा की एक छोटी राशि दूषित हो गई है। उपयोगकर्ता ने अभी भी डेटा खो दिया है, लेकिन ऐप क्रैश नहीं करता है, और यह एक अद्यतन के माध्यम से संभावित रूप से ठीक करने योग्य है।

# लाइसेंस

क्वर्क को [GPL] (https://en.wikipedia.org/wiki/GNU_General_Public_License) के तहत लाइसेंस प्राप्त है, जो अंतिम उपयोगकर्ताओं को सॉफ्टवेयर का अध्ययन, साझा करने और संशोधित करने की स्वतंत्रता की गारंटी देता है।

ध्यान दें कि यह लाइसेंस ** quirk के नाम और ब्रांडिंग को पुनर्वितरित करने के लिए स्वतंत्र शासन नहीं देता है। इसलिए यदि आप अपना स्वयं का संस्करण प्रकाशित करना चाहते हैं, तो कृपया अंतिम उपयोगकर्ता नाम भ्रम से बचने के लिए इसका नाम बदलें।

