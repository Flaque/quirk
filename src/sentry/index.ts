import Sentry from "sentry-expo";

Sentry.enableInExpoDevelopment = true;
Sentry.config(
  "https://a9115f37287d4db39106d77e73aefa03@sentry.io/1443374"
).install();

export default Sentry;
