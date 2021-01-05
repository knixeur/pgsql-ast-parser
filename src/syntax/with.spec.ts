import 'mocha';
import 'chai';
import { checkStatement, checkInvalidExpr } from './spec-utils';
import { expect } from 'chai';


describe('With clause', () => {

    checkStatement([`WITH sel AS (select v from data)
        SELECT v from sel`], {
        type: 'with',
        bind: [
            {
                alias: 'sel',
                statement: {
                    type: 'select',
                    from: [{ type: 'table', name: 'data' }],
                    columns: [{ expr: { type: 'ref', name: 'v' } }],
                }
            }
        ],
        in: {
            type: 'select',
            from: [{ type: 'table', name: 'sel' }],
            columns: [{ expr: { type: 'ref', name: 'v' } }],
        }
    });

    checkStatement([`WITH sel1 AS (select v from data)
            , sel2 AS (select v from data)
        SELECT v from sel`], {
        type: 'with',
        bind: [
            {
                alias: 'sel1',
                statement: {
                    type: 'select',
                    from: [{ type: 'table', name: 'data' }],
                    columns: [{ expr: { type: 'ref', name: 'v' } }],
                }
            }, {
                alias: 'sel2',
                statement: {
                    type: 'select',
                    from: [{ type: 'table', name: 'data' }],
                    columns: [{ expr: { type: 'ref', name: 'v' } }],
                }
            }
        ],
        in: {
            type: 'select',
            from: [{ type: 'table', name: 'sel' }],
            columns: [{ expr: { type: 'ref', name: 'v' } }],
        }
    });
});