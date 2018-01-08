

export default {
    addUserTask({Meteor}, taskname, createdate) {
        Meteor.call('addUserTask',taskname, createdate, (err) =>{
            console.log(err);
        });
    },
    removeUserTask({Meteor}, taskId) {
        Meteor.call('removeUserTask',taskId,(err) => {
            console.log(err);
        });
    },
    toggleChecked({Meteor}, taskId,isChecked) {
        Meteor.call('toggleChecked',taskId,isChecked, (err) => {
            console.log(err);
        });
    },
    editUserTask({Meteor}, taskId, taskname, createdate) {
        console.log(taskId, taskname, createdate);
        Meteor.call('editUserTask', taskId, taskname, createdate, (err) => {
            console.log(err);
        });
    }
};
