

export default {
    addUserTask({Meteor}, taskname, createdate) {
        Meteor.call('addUserTask',taskname, createdate, (err) =>{
            console.log(err);
        });
    }
};
