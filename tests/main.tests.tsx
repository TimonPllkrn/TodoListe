import { Meteor } from 'meteor/meteor';
import assert from 'assert';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Task as TaskType } from '/imports/types/Task';
import { Priority } from '/imports/types/Priority';
import React from 'react';
import { Task } from '/imports/ui/Task/Task';

configure({ adapter: new Adapter() });

describe('basic meteor tests', function () {

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

if(Meteor.isClient) {
    describe('task component', function() {

        let todoItem : any;
        let task: TaskType = {
            _id: "test",
            title: "This is a test",
            done: false,
            category: undefined,
            createDate: new Date(),
            doneDate: undefined,
            ownerId: "user",
            priority: Priority.Low
        };

        beforeEach(function () {
            todoItem = shallow(<Task task= {task}/>);
        });

        const checkAndClickTwice = () => {
            assert.strictEqual(todoItem.find("#titleInput").length, 0);
            todoItem.find("#titleEditButton").simulate('click');
            assert.strictEqual(todoItem.find("#titleInput").length, 1);
            todoItem.find("#titleCheckButton").simulate('click');
            assert.strictEqual(todoItem.find("#titleInput").length, 0);
        }

        it('click edit/check button multiple times', () => {
            checkAndClickTwice();
            checkAndClickTwice();
            checkAndClickTwice();
        });

        it('title can be edited', function () {
            todoItem.find("#titleEditButton").simulate('click');
            todoItem.find("#titleInput").simulate('change', {target: {value: 'Another title'}});
            const actual: string = todoItem.find("#titleInput").prop("value");
            assert.strictEqual(actual, "Another title");
        });

        it('title check button stays when entered title is empty', function () {
            todoItem.find("#titleEditButton").simulate('click');
            todoItem.find("#titleInput").simulate('change', {target: {value: ''}});
            todoItem.find("#titleCheckButton").simulate('click');
            assert.strictEqual(todoItem.find("#titleCheckButton").length, 1);
        });

        it('category name is displayed', function () {
            assert.strictEqual(todoItem.find("#categoryChip").prop("label"), "None");
            task = {...task, category: {_id: "id", name: "Test", color: "blue"}};
            todoItem = shallow(<Task task={task} />);
            assert.strictEqual(todoItem.find("#categoryChip").prop("label"), "Test");
            assert.strictEqual(todoItem.find("#categoryChip").prop("style").backgroundColor, "blue");
        });

        it('priority is displayed correctly', function () {
            assert.strictEqual(todoItem.find("#expandMoreIcon").length, 1);
            task = { ...task, priority: Priority.Medium };
            todoItem = shallow(<Task task={task} />);
            assert.strictEqual(todoItem.find("#removeIcon").length, 1);
            task = { ...task, priority: Priority.High };
            todoItem = shallow(<Task task={task} />);
            assert.strictEqual(todoItem.find("#expandLessIcon").length, 1);
        });
    });
}