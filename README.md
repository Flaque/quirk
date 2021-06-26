
🚧🚧🚧

English: 

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

🚧🚧🚧

Spanish: 


** Quirk ya no se mantiene. **

Quirk comenzó como una pequeña cosa que hice para mí cuando comencé a hacer CBT. A medida que mejoraba, necesitaba menos a Quirk. Pero al mismo tiempo, muchas otras personas habían descubierto a Quirk y comenzaron a captarlo. Eso significó más correcciones de errores, más funciones y más trabajo por hacer. Realmente no pude seguir así, especialmente con mi enfoque principal en ese momento (mi trabajo diario).

Entonces, para trabajar en él a tiempo completo, mi hermano y yo intentamos convertirlo en una empresa. De esa manera, podríamos continuar desarrollando Quirk como un enfoque principal, incluso si ya no lo necesitáramos.

Por un tiempo, a Quirk le fue bastante bien. Mucha gente se suscribió, obtuvimos el respaldo de [Y Combinator] (https://www.ycombinator.com/) y estábamos creciendo _muy_ rápidamente.

Desafortunadamente, para que el negocio funcione y para que nos paguemos a nosotros mismos, necesitábamos que la gente estuviera suscrita por un tiempo considerable. Pero en general, la mayoría de las personas se dividieron en tres campos: no usaron la aplicación en absoluto (y no obtuvieron valor por lo que pagaron), se sintieron mejor y luego cancelaron la suscripción o no se sintieron mejor pero persistieron de todos modos. Eso significaba que el modelo de negocio trataba los éxitos como fracasos y los fracasos como éxitos. Entonces, un Quirk futuro necesitaría hacer que las personas se sientan peor por más tiempo o no ayudar a las personas a las que nos inscribimos para ayudar. Si los incentivos del negocio no estuvieran alineados con las personas, habría sido ingenuo suponer que podríamos arreglarlo fácilmente a medida que la organización creciera y tuviéramos menos control. No queríamos seguir ese camino, así que dimos un giro a la empresa.

Cualquiera que haya seguido este proyecto sabrá que exploramos múltiples caminos hacia la sostenibilidad. Mucho de esto se discutió en los RP y temas de este repositorio. Hemos investigado un modelo completamente gratuito, un modelo de código abierto independiente, un modelo de código abierto comunitario, un modelo de donación, un modelo de pago por adelantado, un modelo de publicidad, un modelo de tele-terapia y un modelo de suscripción.

** Quirk (la empresa) ahora es servicio de habitaciones. **

Hoy en día, estamos creando [Room Service] (https://www.roomservice.dev/), que ayuda a la gente a crear material multijugador, como lo que tienen Figma o Google Docs. Varios cursores, CRDT, sockets, mucha gente editando lo mismo, ese tipo de cosas. Seguimos siendo la misma entidad comercial y tal, solo estamos haciendo un producto diferente ahora. Si crees que los sistemas multijugador son geniales y quieres unirte a nosotros, envíame un correo electrónico: `evan @ roomservice. dev`.

** Haz tu propio Quirk. **

Si te gusta Quirk y quieres que continúe, siéntete libre de bifurcarlo. Le pedimos que cambie el nombre para evitar confusiones. Solo preste atención a nuestra advertencia, tenga cuidado con la forma en que se mantiene a flote y tenga cuidado con su deseo de trabajar en esto a tiempo completo. Hay [más de un escrito sobre esto aquí.] (Https://evanjconrad.com/posts/moral-competence)

Si quieres bifurcar Quirk, debes bifurcar [esta confirmación] (https://github.com/Flaque/quirk/commit/7a4eabe48414de5edfefcd693e79178120eae142), es justo antes de que agreguemos los pagos y cuando el código esté más limpio.

🚧🚧🚧


---

<p align = "centro">
<h1 align = "center"> ✨🐙 peculiaridad. </h1>
</p>
<p align = "centro">
  <a href="https://itunes.apple.com/us/app/quirk-cbt/id1447026451?mt=8"> Descarga iOS </a> • <a href = "https://play.google. com / store / apps / details? id = tech.econn.quirk "> Descargar Android </a> • <a href="mailto:humans+github@quirk.fyi"> Contacto </a> • <a href = "https://tinyletter.com/quirk"> Boletín de noticias </a>
<br> <br>
</p>

Quirk es una [terapia cognitiva conductual (CBT)] multiplataforma, con licencia GPL (https://en.wikipedia.org/wiki/Cognitive_behavioral_therapy)
aplicación integrada en React Native / Expo.

A diferencia de muchas aplicaciones de CBT, es bastante imparcial en lo que se refiere a su uso; no pregunta por ti
hacer ejercicios de TCC específicos para la depresión. Eso hace que su uso sea bastante rápido y discreto, especialmente en un público
configuración.

! [captura de pantalla] (https://i.imgur.com/64Cpmpm.png)

## Cómo Quirk se sustenta a sí mismo

Para que Quirk se sostenga a sí mismo, ** cobra una pequeña tarifa de suscripción. ** Actualmente es $ 5.99 / mes en los EE. UU., Que es aproximadamente el costo de una taza de café. Esto ayuda a pagar por un desarrollador de tiempo completo para que Quirk no esté muerto y sea bueno en general.

### La ley de supervivencia del diseño de productos

Para entender _por qué_ hacemos una suscripción, podemos mirar a la Ley de Supervivencia del Diseño de Producto, un término elegante que acabo de inventar. Cuando crea un producto, lo que lo mantiene vivo se convierte en la fuerza principal del diseño.

Por ejemplo, facebook.com no es un producto de Facebook, facebook.com/business/ads es un producto de Facebook. Porque 0 dólares se obtienen de las cuentas de Facebook, solo de los anunciantes que pagan para acceder a esas cuentas de Facebook. La forma en que mantienes las luces encendidas finalmente da forma al producto que fabricas.

Entonces, si desea hacer un buen producto que ayude a la gente, debe elegir un modelo de sostenibilidad donde los incentivos financieros de la organización estén alineados con los intereses individuales de los usuarios.

Después de muchos intentos con otros modelos, terminó siendo una suscripción. En una suscripción, el 

La métrica principal es la retención: ¿la gente todavía usa esto? Si la retención cae, la gente cancela su suscripción y usted ya no puede existir.

La única forma sólida de tener una buena retención es crear algo que sea activamente útil y bueno. De manera similar, la única forma de obtener algún valor de CBT es hacerlo de manera consistente.

## Colaboradores

Algunas personas increíbles han ayudado a construir el Quirk que ves hoy.

- [@devinroche] (https://github.com/devinroche) por configurar la traducción y convertirse en un mantenedor principal 🔥
- [@devilcius] (https://github.com/devilcius) por la increíble traducción al español 🇪🇸
- [@idnovic] (https://github.com/idnovic) por la increíble traducción al alemán 🇩🇪 (¡y el soporte para iPad!)
- [@kwierbol] (https://github.com/kwierbol) por la increíble traducción al polaco 🇵🇱
- [@Walther] (https://github.com/Walther) por la increíble traducción al finlandés 🇫🇮
- [@ Jos512] (https://github.com/Jos512) por la increíble traducción al holandés 🇳🇱
- [@jinto] (https://github.com/jinto) por la increíble traducción al coreano 🇰🇷
- [@briankung] (https://github.com/briankung) para la localización en chino, soporte de internacionalización y ayuda para guiar todo el esfuerzo de traducción. 🎉
- [@akinariobi] (https://github.com/akinariobi) para la traducción rusa 🇷🇺
- [@miguelmf] (https://github.com/miguelmf) para la traducción al portugués 🇵🇹
- [@comradekingu] (https://github.com/comradekingu) para la traducción noruega Bokmål 🇳🇴
- [@micheleriva] (https://github.com/micheleriva) para la traducción al italiano 🇮🇹
- [@ Jolg42] (https://github.com/jolg42) para la traducción al francés 🇫🇷
- [@Buricescu] (https://github.com/Buricescu) para la traducción al rumano 🇷🇴

## Ejecutando localmente

Quirk se basa en React Native y, por lo tanto, asume que tienes [node] (https://nodejs.org/en/) instalado.
[Yarn] (https://yarnpkg.com/en/) se prefiere a NPM como administrador de paquetes.

`` sh
# clona el proyecto y cd en él
git clone git@github.com: Flaque / quirk.git; cd ./quirk

# copiar el .env de muestra (editar según sea necesario)
cp .env.sample .env

# instalar dependencias
hilo

# iniciar entorno de desarrollo
comienzo del hilo
''

A continuación, estará en el [entorno de desarrollo de la exposición] (https://docs.expo.io/versions/latest/).
Si ya tiene XCode instalado con un simulador, puede simplemente presionar `i` para iniciarlo.

# ¿Puedo ayudar?

¡Por supuesto!

** Si te gusta la aplicación, ** ¡dale 5 estrellas! Ayuda a más personas a encontrar la aplicación.

** Si eres un profesional de la salud mental, ** audita [las descripciones] (https://github.com/Flaque/quirk/blob/master/src/locals/en.json) de las distorsiones cognitivas. Si tiene sugerencias, hágamelo saber y cambiaremos las cosas.

** Si puedes dibujar ** y puedes hacer ilustraciones digitales de las pequeñas manchas, ¡avísame y encontraré un lugar para pegarlas en la aplicación!

** Si conoces un idioma que no sea inglés, ** ayúdanos [¡a traducir la aplicación!] (/ TRANSLATIONS.md)

# Diseño

El objetivo de Quirk es ser atractivo y concentrado. Debería ser _realmente_ fácil entrar en un pensamiento; las personas los ingresan con frecuencia en entornos públicos y deben hacerlo con bastante rapidez. Tampoco debería causar una mayor frustración.

## Lógica de diseño

Quirk se construye con dos objetivos principales en mente:

- No te hinches
- No seas malvado

### No te hinches

** No incluya funciones para una condición en particular a expensas de otras condiciones. ** Por ejemplo, no combine el seguimiento del estado de ánimo con el seguimiento del pensamiento. Si un usuario _ tiene_ que ingresar un estado de ánimo para rastrear un pensamiento, entonces toda la aplicación se arruina para las personas que la usan para el pánico, el TOC u otra condición en la que el estado de ánimo no es el enfoque principal.

** No incluya tratamientos no relacionados con CBT sin una buena razón. ** No hay pistas de audio de relajación ni guías de meditación. Es una aplicación CBT, manténgala enfocada en CBT.

** No incluyas cosas que podrían lograrse mejor con otra aplicación. ** Nadie necesita un diario en la aplicación cuando un diario funciona bien. Nadie necesita un rastreador de frecuencia cardíaca en la aplicación cuando un rastreador de frecuencia cardíaca funciona bien.

** Sea rápido y eficiente. ** Los pensamientos no deberían tomar 5 minutos para ingresar y debería poder omitir campos si es razonable. No dejes que lo perfecto sea enemigo de lo bueno.

### No seas malvado

** Los pensamientos son más valiosos que las contraseñas, trátelos de esa manera. ** La mayoría de la gente prefiere dar sus contraseñas que sus pensamientos CBT. Son increíblemente privados, ocasionalmente involucran a otras personas y con frecuencia son vergonzosos.

** No tenga \ $ 200 dólares en compras de aplicaciones. ** Estoy mirando su CBT Thought Diary. Lo entiendo, los desarrolladores necesitan ganar dinero. Cuesta mucho mantener la aplicación en la tienda de aplicaciones. Pero te estás aprovechando de las personas vulnerables. Muy pocas personas de mente racional gastarán deliberadamente \ $ 200 en un modo oscuro.

** No tengas notificaciones tontas. ** La programación está bien, abusar de las notificaciones push para que tu aplicación tenga un mejor tráfico es sucio y asqueroso.

** Sea abierto. ** No todas las aplicaciones tienen que ser de código abierto; es una decisión difícil de tomar. Pero sea claro y obvio dentro de la aplicación sobre lo que sucede con los datos del usuario. No lo envíes

a algún servidor sin dejarlo claro dentro de la aplicación, especialmente si no proporciona ninguna utilidad adicional al usuario.

** No presione a las personas para que no estén contentas. ** No las fuerce intencionalmente o accidentalmente a que no estén contentas para usar su aplicación. No obligue a las personas a manifestar su descontento para acceder a una función. Es fácil que esto se filtre en el diseño, si un usuario tiene que calificar su felicidad por debajo del promedio para acceder a las funciones de CBT, le está pidiendo que no esté contento con el uso de su aplicación.

** Tenga mucho cuidado al hacer de la participación su métrica principal. ** La participación de los usuarios está bien para preocuparse. Todos queremos que las personas que necesitan ayuda se involucren realmente en la ayuda. Pero santo moly, ten cuidado con esto. Usted _no_ quiere llevar algo que para muchas personas es un tratamiento en un ciclo de compromiso que se perpetúa a sí mismo. Un enfoque despiadado en el compromiso ha hecho que muchos productos se conviertan en cajas más pequeñas. _Nadie debería volverse adicto a tu aplicación de salud mental_

# Lógica de ingeniería

Quirk _no_debe_ perder datos de usuario. El objetivo de la aplicación es registrar sus pensamientos, por lo que si los pierde sería bastante malo. Como se indica en [un estudio] (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6010839/):

> Si bien la falla de una aplicación en general puede ser inconveniente y molesta, puede tener graves consecuencias en el contexto de las aplicaciones de salud mental: alguien que ha llegado a depender de una aplicación para obtener apoyo emocional puede encontrar una falla "devastadora".

Por lo tanto, la gestión de datos debe tener una prioridad más alta que cualquier otra parte de la aplicación.

## Casos de error de taxonomía y orden de los datos

La siguiente es una lista de comportamientos y estados extremadamente _ malos_ que podrían ocurrir en orden de gravedad.

### 1 - Corrupción de datos a gran escala

Todos los pensamientos se han corrompido de alguna manera. Por ejemplo, el formato JSON de cada elemento es incorrecto. Esto se coloca en la parte superior porque un usuario no solo no puede no acceder a los datos, sino que también puede provocar errores continuos que obliguen a "bloquear" la aplicación.

### 2 - Pérdida de datos a gran escala

Todos los pensamientos se han eliminado sin ninguna esperanza de recuperación.

### 3 - Pérdida de datos a pequeña escala

Se ha eliminado una pequeña cantidad de datos sin ninguna esperanza de recuperación.

### 4 - Corrupción de datos a pequeña escala

Se ha dañado una pequeña cantidad de datos de forma recuperable. El usuario aún ha perdido datos, pero la aplicación no se bloquea, y esto se puede solucionar potencialmente mediante una actualización.

# Licencia

Quirk tiene licencia de [GPL] (https://en.wikipedia.org/wiki/GNU_General_Public_License), que garantiza a los usuarios finales la libertad de estudiar, compartir y modificar el software.

Tenga en cuenta que esta licencia ** no ** da rienda suelta a la redistribución del nombre y la marca de peculiaridad. Por lo tanto, si desea publicar su propia versión, cámbiele el nombre para evitar la confusión del usuario final.