import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import App from '../components/app.jsx';
import Task from '../components/task.jsx';

export const composer = ({context}, onData) => {
    const {Meteor, Collections} = context();

    const taskSub = Meteor.subscribe('taskInfo');

    if (taskSub.ready()){

        const tasks = Collections.Tasks.find().fetch();
        const incompleteCount = Collections.Tasks.find({ checked: { $ne: true } }).count();

        onData(null, {tasks ,incompleteCount});
    } ;

  
};

export const depsMapper = (context, actions) => (console.log(actions), {
    context: () => context,
    addUserTask: actions.app.addUserTask,
    removeUserTask: actions.app.removeUserTask,
    toggleChecked: actions.app.toggleChecked,
    editUserTask : actions.app.editUserTask
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(App,Task);
