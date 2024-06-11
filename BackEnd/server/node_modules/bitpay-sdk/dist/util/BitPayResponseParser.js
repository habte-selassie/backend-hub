"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitPayResponseParser = void 0;
const BitPayException_1 = require("../Exceptions/BitPayException");
class BitPayResponseParser {
    async responseToJsonString(response) {
        try {
            if (response == null) {
                throw new BitPayException_1.default(null, 'Error: HTTP response is null');
            }
            const responsObj = await response.json();
            if (Object.prototype.hasOwnProperty.call(responsObj, 'status')) {
                if (responsObj['status'] === 'error') {
                    throw new BitPayException_1.default(null, 'Error: ' + responsObj['error'], null, responsObj['code']);
                }
                if (Object.prototype.hasOwnProperty.call(responsObj, 'data') && Object.keys(responsObj.data).length === 0) {
                    return JSON.stringify(responsObj);
                }
            }
            if (Object.prototype.hasOwnProperty.call(responsObj, 'error')) {
                throw new BitPayException_1.default(null, 'Error: ' + responsObj['error']);
            }
            else if (Object.prototype.hasOwnProperty.call(responsObj, 'errors')) {
                let message = '';
                responsObj['errors'].forEach(function (error) {
                    message += '\n' + error.toString();
                });
                throw new BitPayException_1.default(null, 'Errors: ' + message);
            }
            if (Object.prototype.hasOwnProperty.call(responsObj, 'success')) {
                return JSON.stringify(responsObj['success']);
            }
            if (Object.prototype.hasOwnProperty.call(responsObj, 'data')) {
                return JSON.stringify(responsObj['data']);
            }
            return JSON.stringify(responsObj);
        }
        catch (e) {
            throw new BitPayException_1.default(null, 'failed to retrieve HTTP response body : ' + e.message);
        }
    }
    static jsonToBoolean(json) {
        const result = JSON.parse(json);
        let status;
        if (typeof result === 'string') {
            status = result;
        }
        else {
            status = result.status;
        }
        return status === 'success' || status === 'Success';
    }
}
exports.BitPayResponseParser = BitPayResponseParser;
//# sourceMappingURL=BitPayResponseParser.js.map