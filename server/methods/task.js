import {Tasks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.methods({
        'addUserTask'(taskname, createdate) {
            check(taskname, String);
            check(createdate, Date);

            Tasks.insert({
                text: taskname,
                createdAt: createdate
            });
        }
    });
}
