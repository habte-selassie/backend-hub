"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutRecipient = void 0;
class PayoutRecipient {
    /**
     * Constructor, create a minimal Recipient object.
     *
     * @param email           string Recipient email address to which the invite shall be sent.
     * @param label           string Recipient nickname assigned by the merchant (Optional).
     * @param notificationURL string URL to which BitPay sends webhook notifications to inform the merchant about the
     *                        status of a given recipient. HTTPS is mandatory (Optional).
     */
    constructor(email, label, notificationURL) {
        this.email = email;
        this.label = label;
        this.notificationURL = notificationURL;
    }
}
exports.PayoutRecipient = PayoutRecipient;
//# sourceMappingURL=PayoutRecipient.js.map