import publications from './publications';
import methods from './methods';
import {Meteor} from 'meteor/meteor';
import '../lib/collections/task';


Meteor.startup(() => {
    // code to run on server at startup
});
publications();
methods();
