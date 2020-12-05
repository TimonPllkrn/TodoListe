import assert from 'assert';
import {resetDatabase} from "meteor/xolvio:cleaner";
import StubCollections from 'meteor/hwillson:stub-collections';
import {TasksCollection} from "/imports/api/TasksCollection";

/**
 Factory.define('task', TaskType, {
    _id: () => Factory.get('list'),
    title: () => faker.lorem.sentence(),
    category: () => undefined,
    done: () => false,
    ownerId: () => "-1",
    priority: () => Priority.High,
    createDate: () => new Date(),
    doneDate: () => undefined,
});
 **/

describe('ToDoListe', function () {

    beforeEach(function () {
        resetDatabase();
        StubCollections.stub(TasksCollection);
    });
    afterEach(function () {
        StubCollections.restore();
    })

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


    it('Test erfolgreich', async function () {
        const {name} = await import('../package.json');
        assert.strictEqual("test", "test");
    });

});
