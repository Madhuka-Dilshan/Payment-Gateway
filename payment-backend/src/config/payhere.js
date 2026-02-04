import crypto from "crypto";

export const generateHash = (
  merchantId,
  orderId,
  amount,
  currency,
  merchantSecret
) => {
  const hashString =
    merchantId +
    orderId +
    amount.toFixed(2) +
    currency +
    crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex");

  return crypto.createHash("md5").update(hashString).digest("hex");
};
