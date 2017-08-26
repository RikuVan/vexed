import {h, app} from 'hyperapp' // eslint-disable-line no-unused-vars
import state from './state'
import actions from './actions'
import events from './events'
import main from './views/Main'
import auth from './mixins/auth'
import store from './mixins/localStorage'
import timer from './mixins/timer'
import firebaseDb from './mixins/firebaseDb'
import '../sass/main.scss'
import devtools from 'hyperapp-redux-devtools'

app({
  state,
  view: main,
  actions,
  events,
  mixins: [
    auth(),
    timer(),
    firebaseDb(),
    store({key: 'game', updateAction: 'updateGame'}),
    devtools()
  ]
})
