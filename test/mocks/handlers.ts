import fs from 'fs';
import path from 'path';
import { rest } from 'msw';

const readFixture = (filename: string) => {
    const file = path.resolve(__dirname, '../fixtures/', filename);
    return fs.readFileSync(file).toString();
};

export const handlers = [
    rest.get('https://web-api.tp.entsoe.eu/api', (req, res, ctx) => {
        const securityToken = req.url.searchParams.get('securityToken');
        const timeInterval = req.url.searchParams.get('timeInterval');

        if (!securityToken || securityToken === 'invalid') {
            return res(ctx.status(401), ctx.body(readFixture('invalid.html')));
        }

        if (timeInterval === '2020-01-01T00:00Z/2020-01-01T00:00Z') {
            return res(ctx.status(400), ctx.xml(readFixture('badRequest.xml')));
        }

        if (timeInterval === '2020-01-01T00:00Z/2020-01-10T00:00Z') {
            return res(ctx.status(200), ctx.xml(readFixture('dayAheadPrices/UK_2020-01-01_2020-01-10.xml')));
        }

        return res(ctx.status(200), ctx.xml(readFixture('dayAheadPrices/NL_2022-11-21_2022-11-22.xml')));
    })
];
