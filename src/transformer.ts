import { z } from 'zod';
import { DateTime } from 'luxon';

// Types
import { DayAheadPrices } from '@/types';

export const dayAheadPricesSchema = z.object({
    Publication_MarketDocument: z.object({
        $: z.object({ xmlns: z.string() }),
        mRID: z.array(z.string()),
        revisionNumber: z.array(z.string()),
        type: z.array(z.string()),
        'sender_MarketParticipant.mRID': z.array(
            z.object({
                _: z.string(),
                $: z.object({ codingScheme: z.string() })
            })
        ),
        'sender_MarketParticipant.marketRole.type': z.array(z.string()),
        'receiver_MarketParticipant.mRID': z.array(
            z.object({
                _: z.string(),
                $: z.object({ codingScheme: z.string() })
            })
        ),
        'receiver_MarketParticipant.marketRole.type': z.array(z.string()),
        createdDateTime: z.array(z.string()),
        'period.timeInterval': z.array(z.object({ start: z.array(z.string()), end: z.array(z.string()) })),
        TimeSeries: z.array(
            z.object({
                mRID: z.array(z.string()),
                businessType: z.array(z.string()),
                'in_Domain.mRID': z.array(
                    z.object({
                        _: z.string(),
                        $: z.object({ codingScheme: z.string() })
                    })
                ),
                'out_Domain.mRID': z.array(
                    z.object({
                        _: z.string(),
                        $: z.object({ codingScheme: z.string() })
                    })
                ),
                'currency_Unit.name': z.array(z.string()),
                'price_Measure_Unit.name': z.array(z.string()),
                curveType: z.array(z.string()),
                Period: z.array(
                    z.object({
                        timeInterval: z.array(
                            z.object({
                                start: z.array(z.string()),
                                end: z.array(z.string())
                            })
                        ),
                        resolution: z.array(z.string()),
                        Point: z.array(
                            z.object({
                                position: z.array(z.string()),
                                'price.amount': z.array(z.string())
                            })
                        )
                    })
                )
            })
        )
    })
});

export const transformResponse = (response: DayAheadPricesResponse): DayAheadPrices => {
    const root = response.Publication_MarketDocument;

    return root.TimeSeries.map((ts) => {
        const periodStart = DateTime.fromISO(ts.Period[0].timeInterval[0].start[0]);
        const periodEnd = DateTime.fromISO(ts.Period[0].timeInterval[0].end[0]);

        return {
            currency: ts['currency_Unit.name'][0],
            unit: ts['price_Measure_Unit.name'][0],
            period_start: periodStart.toUTC().toISO({ suppressSeconds: true }),
            period_end: periodEnd.toUTC().toISO({ suppressSeconds: true }),
            records: ts.Period[0].Point.map((po) => ({
                timestamp: periodStart
                    .startOf('hour')
                    .plus({ hours: parseInt(po.position[0]) - 1 })
                    .toUTC()
                    .toISO({ suppressSeconds: true }),
                price: po['price.amount'][0]
            }))
        };
    });
};

export type DayAheadPricesResponse = z.infer<typeof dayAheadPricesSchema>;
