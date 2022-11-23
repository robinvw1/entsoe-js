import { describe, expect, it } from 'vitest';
import { Client } from './client';
import { BiddingZone } from './constants';

describe('client', () => {
    it('should instantiate', () => {
        const client = new Client({ securityToken: 'foo' });

        expect(client).toBeInstanceOf(Client);
    });

    it('should throw on missing options', () => {
        // @ts-expect-error options missing
        expect(() => new Client()).toThrowError('options must be an object');
        expect(() => new Client({ securityToken: '' })).toThrowError('options.securityToken is missing');
    });
});

describe('dayAheadPrices', () => {
    const client = new Client({ securityToken: 'bar' });

    it('should throw on missing options', async () => {
        // @ts-expect-error options missing
        await expect(client.dayAheadPrices()).rejects.toThrowError('options must be an object');
        // @ts-expect-error options incorrect
        await expect(client.dayAheadPrices({ biddingZone: '' })).rejects.toThrowError('options.biddingZone is missing');
    });

    it('should throw on invalid securityToken', async () => {
        const client = new Client({ securityToken: 'invalid' });

        await expect(client.dayAheadPrices({ biddingZone: BiddingZone.NL })).rejects.toThrowError('401 Unauthorized');
    });

    it('should handle bad requests', async () => {
        const invalidDate = '2020-01-01T00:00Z';

        await expect(
            client.dayAheadPrices({
                biddingZone: BiddingZone.NL,
                startDate: invalidDate,
                endDate: invalidDate
            })
        ).rejects.toThrowError('400 Bad Request');
    });

    it('should match snapshot', async () => {
        const response = await client.dayAheadPrices({ biddingZone: BiddingZone.NL });

        expect(response).toMatchSnapshot();
    });

    it('should handle custom startDate and endDate', async () => {
        const response = await client.dayAheadPrices({
            biddingZone: BiddingZone.UK,
            startDate: '2020-01-01T00:00:00Z',
            endDate: '2020-01-10T00:00:00Z'
        });

        expect(response[0].period_start).toBe('2020-01-01T00:00Z');
        expect(response[0].period_end).toBe('2020-01-02T00:00Z');

        expect(response[0].records[0].timestamp).toBe('2020-01-01T00:00Z');

        expect(response.at(-1)?.period_start).toBe('2020-01-09T00:00Z');
        expect(response.at(-1)?.period_end).toBe('2020-01-10T00:00Z');
    });
});
