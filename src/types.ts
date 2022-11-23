// Constants
import { Endpoint, DocumentType, BiddingZone } from '@/constants';

export interface ClientOptions {
    /** Required for making API calls to ENTSO-E */
    readonly securityToken: string | undefined;
    /** By default `Endpoint.Base` for production. Use `Endpoint.Test` when testing. */
    readonly endpoint?: Endpoint;
}

export interface DayAheadPricesOptions {
    /** A bidding zone is required for fetching day ahead prices */
    biddingZone: BiddingZone;
    /** A valid date string in ISO 8601 format (example: 2020-01-01T00:00Z) */
    startDate?: string;
    /** A valid date string in ISO 8601 format (example: 2020-01-10T00:00Z) */
    endDate?: string;
    /** A document type */
    documentType?: DocumentType;
}

export type DayAheadPrices = DayAheadPrice[];

export interface DayAheadPrice {
    /** Price currency */
    currency: string;
    /** Price unit */
    unit: string;
    /** A valid date string in ISO 8601 format (example: 2020-01-01T00:00Z) */
    period_start: string;
    /** A valid date string in ISO 8601 format (example: 2020-01-10T00:00Z) */
    period_end: string;
    /** An array of prices with timestamps */
    records: DayAheadPriceTimestamp[];
}

export interface DayAheadPriceTimestamp {
    /** A valid date string in ISO 8601 format (example: 2020-01-01T00:00Z) */
    timestamp: string;
    /** Price value */
    price: string;
}
