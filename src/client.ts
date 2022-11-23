import xml2js from 'xml2js';
import { ofetch } from 'ofetch';
import { DateTime } from 'luxon';

// Constants
import { Endpoint, DocumentType } from '@/constants';

// Types
import type { ClientOptions, DayAheadPricesOptions } from '@/types';

// Transformer
import { dayAheadPricesSchema, transformResponse, DayAheadPricesResponse } from '@/transformer';

export class Client {
    private readonly client;
    private readonly parser;
    private readonly securityToken;

    constructor(options: ClientOptions) {
        if (!options || typeof options !== 'object') {
            throw new Error('options must be an object');
        }

        const { securityToken } = options;

        if (!securityToken || !securityToken.length) {
            throw new Error('options.securityToken is missing');
        }

        this.securityToken = securityToken;
        this.parser = new xml2js.Parser();
        this.client = ofetch.create({
            baseURL: options.endpoint || Endpoint.Base,
            headers: {
                'Content-Type': 'application/xml'
            },
            onRequest: ({ options }) => {
                /* c8 ignore next */
                options.query = options.query || {};
                options.query.securityToken = this.securityToken;
            },
            parseResponse: async (responseText) => {
                return await this.parser.parseStringPromise(responseText);
            }
        });
    }

    public async dayAheadPrices(options: DayAheadPricesOptions) {
        if (!options || typeof options !== 'object') {
            throw new Error('options must be an object');
        }

        const { biddingZone, startDate, endDate, documentType = DocumentType.PriceDocument } = options;

        if (!biddingZone || !biddingZone.length) {
            throw new Error('options.biddingZone is missing');
        }

        const now = DateTime.utc();
        const sd = startDate ? DateTime.fromISO(startDate) : now.startOf('day');
        const ed = endDate ? DateTime.fromISO(endDate) : now.startOf('day').plus({ day: 1 });
        const timeInterval = `${sd.toUTC().toISO({ suppressSeconds: true })}/${ed.toUTC().toISO({ suppressSeconds: true })}`;

        const response = await this.client<DayAheadPricesResponse>('/api', {
            query: {
                in_Domain: biddingZone,
                out_Domain: biddingZone,
                timeInterval,
                documentType
            }
        });

        const validatedResponse = dayAheadPricesSchema.parse(response); // TODO: maybe not on runtime
        const parsedDayAheadPrices = transformResponse(validatedResponse);

        return parsedDayAheadPrices;
    }
}
