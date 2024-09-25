import './css/imports/main.css'
import { Meteor } from 'meteor/meteor'

/*
  Re-import some files from rdb:svelte-meteor-data
  because of this issue: https://github.com/JorgenVatle/meteor-vite/issues/33
*/
// import './rdb-svelte-meteor-data'
import { mount } from 'svelte'
import App$ from './App$.svelte'

Meteor.startup(() => {
  mount(App$, { target: document.body })
})
