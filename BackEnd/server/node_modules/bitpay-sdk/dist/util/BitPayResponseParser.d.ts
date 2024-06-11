export declare class BitPayResponseParser {
    responseToJsonString(response: Response): Promise<string>;
    static jsonToBoolean(json: string): boolean;
}
