// "borrowed" from the amazing
// https://github.com/sibelius/iap-receipt-validator/blob/master/src/index.js

const productionHost = "buy.itunes.apple.com";
const sandboxHost = "sandbox.itunes.apple.com";

const statusCodes = {
  [0]: { message: "Active", valid: true, error: false },
  [21000]: { message: "App store could not read", valid: false, error: true },
  [21002]: { message: "Data was malformed", valid: false, error: true },
  [21003]: { message: "Receipt not authenticated", valid: false, error: true },
  [21004]: {
    message: "Shared secret does not match",
    valid: false,
    error: true,
  },
  [21005]: { message: "Receipt server unavailable", valid: false, error: true },
  [21006]: {
    message: "Receipt valid but sub expired",
    valid: true,
    error: false,
  },
  /**
   * special case for app review handling - forward any request that is intended for the Sandbox but was sent to
   * Production, this is what the app review team does
   */
  [21007]: {
    message: "Sandbox receipt sent to Production environment",
    valid: false,
    error: true,
    redirect: true,
  },
  [21008]: {
    message: "Production receipt sent to Sandbox environment",
    valid: false,
    error: true,
  },
};

function VerificationError(error) {
  ["message", "valid", "error", "redirect"].map(
    prop => (this[prop] = error[prop])
  );
}
VerificationError.prototype = Object.create(Error.prototype);

export default function(password, production = true) {
  const endpoint = production ? productionHost : sandboxHost;
  const verifyUrl = `https://${endpoint}/verifyReceipt`;

  return async receipt => {
    const payload = {
      "receipt-data": receipt,
      password,
    };

    const options = {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(verifyUrl, options);
    const body = await res.json();

    if (body.status !== 0 && body.status !== 21006) {
      throw new VerificationError(statusCodes[body.status]);
    }

    return body;
  };
}
