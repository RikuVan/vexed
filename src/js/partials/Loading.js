import {h} from 'hyperapp' // eslint-disable-line no-unused-vars

export default ({small}) =>
  <i className={`fa fa-spinner fa-pulse ${!small ? 'fa-3x' : ''} fa-fw`} />
