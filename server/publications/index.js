import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

import {Tasks} from '/lib/collections';

export default function () {

    Meteor.publish('taskInfo', function() {

        return Tasks.find({});
    });

}
