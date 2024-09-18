/*
  Local plugin https://github.com/rdb/svelte-meteor-data
  Re-import some files
  because of this issue: https://github.com/JorgenVatle/meteor-vite/issues/33
*/

import './subscribe'
import './cursor'

export { default as useTracker } from './use-tracker'

// Import this last, since it overwrites the built-in Tracker.autorun
// eslint-disable-next-line import/first
import './autorun'
