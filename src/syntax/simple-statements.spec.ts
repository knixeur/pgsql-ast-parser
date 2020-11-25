import 'mocha';
import 'chai';
import { checkStatement } from './spec-utils';
import { StartTransactionStatement, CommitStatement, Statement } from './ast';

describe('Simple statements', () => {

    checkStatement(['start transaction', 'begin'], {
        type: 'start transaction',
    });

    checkStatement(['commit'], {
        type: 'commit',
    });

    checkStatement(['rollback'], {
        type: 'rollback',
    });
});