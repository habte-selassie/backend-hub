"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutInstruction = void 0;
const index_1 = require("../../index");
const PayoutCreationException_1 = require("../../Exceptions/PayoutCreationException");
class PayoutInstruction {
    /**
     * Constructor, create a PayoutInstruction object.
     *
     * @param amount      float amount (in currency of batch).
     * @param method      int Method used to target the recipient.
     * @param methodValue string value for the choosen target method.
     * @throws PayoutCreationException BitPayException class
     */
    constructor(amount, method, methodValue) {
        this.amount = amount;
        switch (method) {
            case index_1.RecipientReferenceMethod.EMAIL:
                this.email = methodValue;
                break;
            case index_1.RecipientReferenceMethod.RECIPIENT_ID:
                this.recipientId = methodValue;
                break;
            case index_1.RecipientReferenceMethod.SHOPPER_ID:
                this.shopperId = methodValue;
                break;
            default:
                throw new PayoutCreationException_1.default('method code must be a type of RecipientReferenceMethod');
        }
    }
}
exports.PayoutInstruction = PayoutInstruction;
//# sourceMappingURL=PayoutInstruction.js.map