import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';



Meteor.startup(() => {
  Meteor.publish('tasks', function () {
    return Tasks.find({ userId: this.userId });
  })

  Meteor.methods({
    addTask: function (name) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.insert({
        name: name,
        createdAt: new Date(),
        userId: Meteor.userId(),
        isChecked: true
       
      })
    },
    deleteTask: function (taskId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.remove(taskId);
    },
    updateTask: function(taskId,val){
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.update(taskId,{$set: {name:val}});
    }

  })
});
