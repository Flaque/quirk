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



Español:

🚧🚧🚧

Quirk ya no se mantiene.

Quirk comenzó como una pequeña cosa que hice para mí cuando empecé a hacer TCC. A medida que mejoraba, necesitaba menos a Quirk. Pero al mismo tiempo, muchas otras personas descubrieron Quirk y empezaron a utilizarlo. Eso significaba más correcciones de errores, más características, y simplemente más trabajo por hacer. Realmente no podía mantenerlo bien, especialmente con mi enfoque principal en ese momento (mi trabajo de día).

Así que para poder trabajar en él a tiempo completo, mi hermano y yo intentamos convertirlo en una empresa. Así podríamos seguir desarrollando Quirk como objetivo principal, aunque ya no lo necesitáramos.

Durante un tiempo, Quirk fue bastante bien. Mucha gente se suscribió, recibimos el apoyo de Y Combinator y crecimos muy rápido.

Desgraciadamente, para que el negocio funcionara y pudiéramos pagarnos a nosotros mismos, necesitábamos que la gente estuviera suscrita durante bastante tiempo. Pero, en general, la mayoría de la gente se dividía en tres bandos: no usaba la aplicación en absoluto (y no obtenía valor por lo que pagaba), se sentía mejor y se daba de baja, o no se sentía mejor pero persistía de todos modos. Eso significaba que el modelo de negocio trataba los éxitos como fracasos y los fracasos como éxitos. Así que un futuro Quirk tendría que hacer que la gente se sintiera peor durante más tiempo o, de lo contrario, no ayudar a la gente a la que nos suscribimos. Si los incentivos del negocio no estaban alineados con las personas, habría sido ingenuo suponer que podríamos arreglarlo fácilmente a medida que la organización creciera y tuviéramos menos control. No queríamos ir por ese camino, así que hicimos pivotar la empresa.

Cualquiera que haya seguido este proyecto sabrá que exploramos múltiples caminos hacia la sostenibilidad. Gran parte de ello se discutió en los PRs y en los issues de este repo. Hemos investigado un modelo completamente gratuito, un modelo de código abierto indie, un modelo de código abierto comunitario, un modelo de donación, un modelo de pago por adelantado, un modelo de publicidad, un modelo de teleterapia y un modelo de suscripción.

Quirk (la empresa) es ahora Room Service.

Ahora estamos haciendo Room Service, que ayuda a la gente a construir cosas multijugador, como lo que tienen Figma o Google Docs. Cursores múltiples, CRDTs, sockets, mucha gente editando lo mismo, ese tipo de cosas. Seguimos siendo la misma entidad comercial y tal, sólo que ahora hacemos un producto diferente. Si crees que los sistemas multijugador son geniales y quieres unirte a nosotros, envíame un correo electrónico: evan @ roomservice . dev.

Haz tu propio Quirk.

Si te gusta Quirk y quieres que continúe, siéntete libre de bifurcarlo. Te pedimos que cambies el nombre para evitar confusiones. Sólo presta atención a nuestra advertencia, ten cuidado con la forma en que te mantienes a flote y ten cuidado con tu deseo de trabajar en esto a tiempo completo. Hay más información sobre esto aquí.

Si quieres hacer un fork de Quirk, deberías hacer un fork de este commit, es justo antes de añadir los pagos y cuando el código estaba más limpio.

🚧🚧🚧

✨🐙 rareza.
Descargar iOS - Descargar Android - Contacto - Boletín de noticias

Quirk es una app de Terapia Cognitiva Conductual (TCC) multiplataforma, con licencia GPL, construida en React Native / Expo.

A diferencia de muchas aplicaciones de TCC, es bastante imparcial en lo que se utiliza; no pregunta por ti para hacer ejercicios de TCC específicos para la depresión. Eso hace que sea bastante rápido y discreto de usar, especialmente en un entorno público.

captura de pantalla

Cómo se apoya Quirk
Para que Quirk se mantenga, cobra una pequeña cuota de suscripción. Actualmente es de 5,99 dólares al mes en los Estados Unidos, que es aproximadamente el coste de una taza de café. Esto ayuda a pagar a un desarrollador a tiempo completo para que Quirk no esté muerto y sea bueno en general.

La ley de supervivencia del diseño de productos
Para entender por qué nos suscribimos, podemos recurrir a la Ley de Supervivencia del Diseño de Productos, un término elegante que acabo de inventar. Cuando haces un producto, lo que mantiene ese producto vivo se convierte en la fuerza principal del diseño.

Por ejemplo, facebook.com no es el producto de Facebook, facebook.com/business/ads es el producto de Facebook. Porque 0 dólares se hacen de las cuentas de facebook, sólo de los anunciantes que pagan para tener acceso a esas cuentas de facebook. La forma de mantener la luz en última instancia, da forma al producto que haces.

Así que si quieres hacer un buen producto que ayude a la gente, debes elegir un modelo de sostenibilidad donde los incentivos financieros de la organización estén alineados con los intereses individuales de los usuarios.

Después de muchos intentos con otros modelos, eso terminó siendo una suscripción. En una suscripción, la métrica principal es la retención: ¿la gente sigue usando esta cosa? Si la retención cae, la gente cancela su suscripción y tú dejas de existir.

La única forma sólida de tener una buena retención es crear algo que sea activamente útil y bueno. Del mismo modo, la única forma de obtener algún valor de la TCC es hacerlo de forma constante.

Colaboradores
Algunas personas increíbles han ayudado a construir el Quirk que ves hoy.

@devinroche por establecer la traducción y dar un paso adelante como mantenedor del núcleo 🔥
@devilcius por la increíble traducción al español 🇪🇸
@idnovic por la increíble traducción al alemán 🇩🇪 (¡y la compatibilidad con el iPad!)
@kwierbol por la increíble traducción al polaco 🇵🇱
@Walther por la increíble traducción al finlandés 🇫🇮
@Jos512 por la increíble traducción al holandés 🇳🇱
@jinto por la increíble traducción al coreano 🇰🇷
@briankung por la localización al chino 🇨🇳, el apoyo a la internacionalización y por ayudar a guiar todo el esfuerzo de traducción. 🎉
@akinariobi por la traducción al ruso 🇷🇺.
@miguelmf por la traducción al portugués 🇵🇹
@comradekingu por la traducción al bokmål noruego 🇳🇴
@micheleriva por la traducción al italiano 🇮🇹
@Jolg42 por la traducción al francés 🇫🇷
@Buricescu por la traducción al rumano 🇷🇴
Ejecutando localmente
Quirk está construido sobre React Native y por lo tanto asume que tienes node instalado. Se prefiere Yarn sobre NPM como gestor de paquetes.

# Clona el proyecto y haz un cd en él
git clone git@github.com:Flaque/quirk.git; cd ./quirk

# copia el .env de ejemplo (edita lo que necesites)
cp .env.sample .env

# instalar las dependencias
yarn

# iniciar el entorno de desarrollo
yarn start
Entonces estarás en el entorno de desarrollo de expo. Si ya tienes instalado XCode con un simulador, puedes simplemente pulsar i para iniciarlo.

¿Puedo ayudar?
Por supuesto.

Si te gusta la aplicación, ¡dale 5 estrellas! Ayuda a que más personas encuentren la aplicación.

Si eres un profesional de la salud mental, audita las descripciones de las distorsiones cognitivas. Si tienes sugerencias, házmelo saber y cambiaremos cosas.

Si sabes dibujar y puedes hacer ilustraciones digitales de las pequeñas manchas, házmelo saber y encontraré un lugar para pegarlas en la aplicación.

Si sabes otro idioma que no sea el inglés, ¡ayúdanos a traducir la app!

Diseño
El objetivo de Quirk es ser a la vez atractivo y centrado. Debe ser realmente fácil introducir un pensamiento; la gente suele introducirlos en entornos públicos y necesita hacerlo con bastante rapidez. Además, no debe provocar una mayor frustración.

Lógica de diseño
Quirk está construido con dos objetivos principales en mente:

No ser hinchado
No ser malvado
No ser hinchado
No incluir características para una condición particular a expensas de otras condiciones. Por ejemplo, no asocies el seguimiento del estado de ánimo con el seguimiento del pensamiento. Si un usuario tiene que introducir un estado de ánimo para seguir un pensamiento, entonces toda la aplicación está arruinada para las personas que la utilizan para el pánico, el TOC u otra condición en la que el estado de ánimo no es el objetivo principal.

No incluyas tratamientos no relacionados con la TCC sin una buena razón. No hay pistas de audio de relajación ni guías de meditación. Es una aplicación de TCC, mantenla centrada en la TCC.

No incluyas cosas que podrían realizarse mejor en otra aplicación. Nadie necesita un diario dentro de la aplicación cuando un diario funciona bien. Nadie necesita un rastreador de frecuencia cardíaca dentro de la aplicación cuando un rastreador de frecuencia cardíaca funciona bien.

Sé rápido y eficiente. Los pensamientos no deberían tardar 5 minutos en introducirse y deberías poder saltarte campos si es razonable. No dejes que lo perfecto sea enemigo de lo bueno.

No seas malvado
Los pensamientos son más valiosos que las contraseñas, trátalos así. La mayoría de la gente preferiría entregar sus contraseñas que sus pensamientos de la TBC. Son increíblemente privados, en ocasiones implican a otras personas y con frecuencia son embarazosos.

No tengas 200 dólares en compras de aplicaciones. Te estoy mirando a ti, CBT Thought Diary. Lo entiendo, los desarrolladores necesitan ganar dinero. Cuesta mucho mantener la aplicación en la tienda de aplicaciones. Pero se están aprovechando de personas vulnerables. Muy poca gente de mente racional gastará a propósito 200 dólares por un modo oscuro.

No tengas notificaciones tontas. Programar está bien, abusar de las notificaciones push para que tu app tenga mejor tráfico es deleznable y asqueroso.

Sé abierto. No todas las aplicaciones tienen que ser de código abierto; es una decisión difícil de tomar. Pero sé claro y obvio dentro de la aplicación sobre lo que está pasando con los datos del usuario. No los envíes a un servidor sin dejarlo claro dentro de la aplicación, especialmente si no proporciona ninguna utilidad adicional al usuario.

No empujes a la gente a ser infeliz. No obligue a la gente, ni a propósito ni por accidente, a ser infeliz para usar su aplicación. No obligue a la gente a manifestar su descontento para poder acceder a una función. Es fácil que esto se cuele en el diseño, si un usuario tiene que calificar su felicidad por debajo de la media para poder acceder a las funciones de la TCC, le está pidiendo que sea infeliz para usar su aplicación.

Sé extremadamente cauteloso a la hora de convertir el compromiso en tu métrica principal. El compromiso de los usuarios está bien para preocuparse. Todos queremos que la gente que necesita ayuda se involucre realmente en la ayuda. Pero ten cuidado con esto. No se quiere llevar algo que para muchas personas es un tratamiento a un bucle de compromiso que se autoperpetúa. Un enfoque despiadado en el compromiso ha provocado que muchos productos se conviertan en cajas más delgadas. Nadie debería ser adicto a tu aplicación de salud mental.

Lógica de ingeniería
Quirk no debe perder los datos de los usuarios. El objetivo de la aplicación es registrar sus pensamientos, así que si los perdiera sería bastante malo. Como se afirma en un estudio:
Mientras que un fallo de una app en general puede ser incómodo y molesto, puede tener graves consecuencias en el contexto de las apps de salud mental: alguien que ha llegado a confiar en una app para obtener apoyo emocional puede encontrar un fallo "devastador".

Por lo tanto, la gestión de los datos debe tener mayor prioridad que cualquier otra parte de la app.

Taxonomía y orden de los casos de fallo de datos
La siguiente es una lista de comportamientos y estados extremadamente malos que podrían ocurrir en orden de gravedad.

1 - Corrupción de datos a gran escala
Todos los pensamientos se han corrompido de alguna manera. Por ejemplo, el formato JSON de cada elemento es incorrecto. Esto se pone en la parte superior porque no sólo un usuario no puede acceder a los datos, sino que puede causar errores continuos obligando a la aplicación a ser "bricked".

2 - Pérdida de datos a gran escala
Todos los pensamientos han sido borrados sin ninguna esperanza de recuperación.

3 - Pérdida de datos a pequeña escala
Una pequeña cantidad de datos ha sido borrada sin ninguna esperanza de recuperación.

4 - Corrupción de datos a pequeña escala
Una pequeña cantidad de datos se ha corrompido de forma recuperable. El usuario sigue teniendo datos perdidos, pero la aplicación no se bloquea, y esto es potencialmente solucionable a través de una actualización.

Licencia
Quirk está licenciado bajo la GPL, que garantiza a los usuarios finales la libertad de estudiar, compartir y modificar el software.

Ten en cuenta que esta licencia no da libertad para redistribuir el nombre y la marca de quirk. Así que si quieres publicar tu propia versión, por favor renómbrala para evitar la confusión del usuario final.
