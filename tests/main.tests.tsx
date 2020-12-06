import { Meteor } from 'meteor/meteor';
import assert from 'assert';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('basic', function () {

    it('package.json has correct name', async function () {
        const {name} = await import('../package.json');
        assert.strictEqual(name, 'todoliste');
    });

    if (Meteor.isClient) {
        it('client is not server', function () {
            assert.strictEqual(Meteor.isServer, false);
        });
    }

    if (Meteor.isServer) {
        it('server is not client', function () {
            assert.strictEqual(Meteor.isClient, false);
        });
    }
});