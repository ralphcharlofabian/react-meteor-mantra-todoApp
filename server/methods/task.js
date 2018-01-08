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
        },
        'removeUserTask'(taskId) {
            check(taskId, String);
            Tasks.remove(taskId);
        },
        'toggleChecked'(taskId,isChecked){
            check(taskId, String);
            check(isChecked, Boolean);

            Tasks.update(taskId,{
                $set: {checked: isChecked}
            });
        },
        'editUserTask'(taskId,taskname,createdate){
            check(taskId, String);
            check(taskname, String);
            check(createdate, Date);

            Tasks.update(taskId,{
                $set: {
                    text: taskname,
                    createdAt: createdate  
                }
            });
        }
    });
    
}
