import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';
import { Employee } from '/imports/api/TasksCollection';

Meteor.startup(() => {
  Meteor.publish('tasks', function (li, ski) {
    return Tasks.find({});

  })
  Meteor.publish('employee', function () {
    return Em.find({});

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
      })
    },


    subForm: function (name,email,mobile,password) {

    //  uservalue={
    //     name:{
    //       fullname:name
    //     },
    //     Email:{
    //       mail:email
    //     },
    //   }
    //   console.log('h')
   
      Employee.insert({fullname:name,
      Emails:email,
    Mobilenumber:mobile
  })
     
        
        // mobile: mobile,
        // password: password
    
    },

    pagination: function (i) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.insert({
        value: i,
        createdAt: new Date(),
        userId: Meteor.userId(),
      })
    },

    deleteTask: function (taskId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.remove(taskId);
    },

   
    updateTask: function (taskId, val) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.update(taskId, { $set: { name: val } });
    },

    bulkdelete: function (taskId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.remove({ isChecked: { $eq: true } })
    },

    select: function () {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.update({}, { $set: { isChecked: true } }, { multi: true })
    },

    deselect: function () {
      if (!Meteor.userId()) {
        throw new Meteor.Error('no access')
      }
      Tasks.update({}, { $set: { isChecked: false } }, { multi: true })
    }
  })
    module.exports = deleteTask
});
