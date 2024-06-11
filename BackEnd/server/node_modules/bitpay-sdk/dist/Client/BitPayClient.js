"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitPayClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const node_fetch_1 = require("node-fetch");
const index_1 = require("../index");
const qs = require("querystring");
const BitPayException_1 = require("../Exceptions/BitPayException");
const BitPayResponseParser_1 = require("../util/BitPayResponseParser");
class BitPayClient {
    constructor(baseUrl, ecKey, identity) {
        this.ecKey = ecKey;
        this.baseUrl = baseUrl;
        this.identity = identity;
        this.defaultHeaders = {
            'X-Accept-Version': index_1.Env.BitpayApiVersion,
            'x-bitpay-plugin-info': index_1.Env.BitpayPluginInfo,
            'x-bitpay-api-frame': index_1.Env.BitpayApiFrame,
            'x-bitpay-api-frame-version': index_1.Env.BitpayApiFrameVersion,
            'Content-Type': 'application/json'
        };
        this.keyUtils = new index_1.KeyUtils();
        this.responseParser = new BitPayResponseParser_1.BitPayResponseParser();
    }
    /**
     *
     * @param uri
     * @param parameters
     * @param signatureRequired
     * @returns
     */
    async get(uri, parameters, signatureRequired = false) {
        try {
            let fullUrl = this.baseUrl + uri;
            if (parameters !== null) {
                const query = '?' + qs.stringify(parameters);
                fullUrl = fullUrl + query;
            }
            let headers = this.defaultHeaders;
            if (signatureRequired) {
                headers = this.getSignatureHeaders(fullUrl, headers, null);
            }
            const result = await (0, node_fetch_1.default)(fullUrl, {
                method: 'get',
                headers: headers
            });
            return this.responseParser.responseToJsonString(result);
        }
        catch (e) {
            let message;
            if (e instanceof BitPayException_1.default) {
                message = e.message;
            }
            else {
                message = e.response.data;
            }
            throw new BitPayException_1.default(null, 'GET failed : ' + JSON.stringify(message));
        }
    }
    /**
     *
     * @param uri
     * @param formData
     * @param signatureRequired
     * @returns
     */
    async post(uri, formData = {}, signatureRequired = true) {
        try {
            formData = JSON.stringify(formData);
            const fullUrl = this.baseUrl + uri;
            let headers = this.defaultHeaders;
            if (signatureRequired) {
                headers = this.getSignatureHeaders(fullUrl, headers, formData);
            }
            const result = await (0, node_fetch_1.default)(fullUrl, {
                method: 'post',
                headers: headers,
                body: formData
            });
            return this.responseParser.responseToJsonString(result);
        }
        catch (e) {
            let message;
            if (e instanceof BitPayException_1.default) {
                message = e.message;
            }
            else {
                message = e.response.data;
            }
            throw new BitPayException_1.default(null, 'Post failed : ' + JSON.stringify(message));
        }
    }
    /**
     *
     * @param uri
     * @param formData
     * @param signatureRequired
     * @returns
     */
    async put(uri, formData = {}, signatureRequired = true) {
        try {
            formData = JSON.stringify(formData);
            const fullUrl = this.baseUrl + uri;
            let headers = this.defaultHeaders;
            if (signatureRequired) {
                headers = this.getSignatureHeaders(fullUrl, headers, formData);
            }
            const result = await (0, node_fetch_1.default)(fullUrl, {
                method: 'PUT',
                headers: headers,
                body: formData
            });
            return this.responseParser.responseToJsonString(result);
        }
        catch (e) {
            let message;
            if (e instanceof BitPayException_1.default) {
                message = e.message;
            }
            else {
                message = e.response.data;
            }
            throw new BitPayException_1.default(null, 'Put failed : ' + JSON.stringify(message));
        }
    }
    /**
     *
     * @param uri
     * @param parameters
     * @param signatureRequired
     * @returns
     */
    async delete(uri, parameters = {}, signatureRequired = true) {
        try {
            const query = '?' + qs.stringify(parameters);
            const fullUrl = this.baseUrl + uri + query;
            let headers = this.defaultHeaders;
            if (signatureRequired) {
                headers = this.getSignatureHeaders(fullUrl, headers, null);
            }
            const result = await (0, node_fetch_1.default)(fullUrl, {
                method: 'delete',
                headers: headers
            });
            return this.responseParser.responseToJsonString(result);
        }
        catch (e) {
            let message;
            if (e instanceof BitPayException_1.default) {
                message = e.message;
            }
            else {
                message = e.response.data;
            }
            throw new BitPayException_1.default(null, 'Delete failed : ' + JSON.stringify(message));
        }
    }
    /**
     *
     * @param fullUrl
     * @param headers
     * @param jsonData
     * @returns
     */
    getSignatureHeaders(fullUrl, headers, jsonData) {
        if (jsonData !== null) {
            fullUrl = fullUrl + jsonData;
        }
        headers['X-Signature'] = this.keyUtils.sign(fullUrl, this.ecKey);
        headers['X-Identity'] = this.identity;
        return headers;
    }
}
exports.BitPayClient = BitPayClient;
//# sourceMappingURL=BitPayClient.js.map