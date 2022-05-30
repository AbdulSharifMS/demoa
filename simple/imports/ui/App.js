import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/TasksCollection';
import '../api/tasksPublications';
import './App.html';


Template.tasks.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('searchkey', '')
  this.state.set('submit', false)
  this.state.set('check', false)
  this.state.set('editable', '')
});


Template.tasks.helpers({
  tasks() {
    Meteor.subscribe('tasks');
    let searchKey = Template.instance().state.get('searchkey')
    let submit = Template.instance().state.get('submit')
    let check = Template.instance().state.get('check')

    if (check) {
      return Tasks.find({ isChecked: { $ne: true } })
    }
    else if (searchKey === '') {

      return Tasks.find().fetch()
    }
    else if (!submit) {
      console.log(!submit)
      return Tasks.find({ name: searchKey }, { sort: { createdAt: -1 } }).fetch()
    }
    return Tasks.find({ name: { '$regex': searchKey, '$options': 'i' } }, { sort: { createdAt: -1 } }).fetch()
  },
  hidecompleted() {
    return false;
  },
  hours() {
    return document.getElementsByClassName("hours").innerHTML = new Date().getHours()
  },
  minutes() {
    return document.getElementsByClassName("hours").innerHTML = new Date().getMinutes()
  }
});


Template.tasks.events({
  "submit .add-task": function (event) {
    var name = document.querySelector(".add-task").name[0].value;
    Meteor.call('addTask', name)
    document.querySelector(".add-task").name[0].value = '';
    return false;
  },

  "click .delete-task": function (event) {
    if (confirm('Delete Task?')) {
      Meteor.call('deleteTask', this._id)
    }
    return false;
  },

  "keyup .search-text": function (event, Template) {
    var search = document.getElementsByClassName("search-text")[0].value;
    Template.state.set('searchkey', search)
  },

  "click .search-button": function (event, Template) {
    var search = document.getElementsByClassName("search-text")[0].value;
    Template.state.set('submit', !search)
    document.getElementsByClassName("search-text")[0].value = '';
  },

  'click .hide': function (event, Template) {
    Template.state.set('check', event.target.checked)
  },

  'click .edit': function (event, Template) {
    var edit = document.querySelector(".add-task").name[0].value
    Meteor.call('updateTask', this._id, edit)
    document.querySelector(".add-task").name[0].value = '';
  }
})


