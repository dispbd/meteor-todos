/**
 * Implements the Svelte store contract for MongoDB cursors.
 */

import { Mongo } from 'meteor/mongo'

Mongo.Cursor.prototype.subscribe = function (set: (arg0: any) => void) {
  // Set the initial result directly, without going through the callbacks
  const mapFn = this._transform
    ? (element: any) => this._transform(this._projectionFn(element))
    : (element: any) => this._projectionFn(element)

  let result = this._getRawObjects({ ordered: true }).map(mapFn)

  const handle = this.observe({
    _suppress_initial: true,
    addedAt: (doc: any, i: any) => {
      result = [...result.slice(0, i), doc, ...result.slice(i)]
      set(result)
    },
    changedAt: (doc: any, old: any, i: number) => {
      result = [...result.slice(0, i), doc, ...result.slice(i + 1)]
      set(result)
    },
    removedAt: (old: any, i: number) => {
      result = [...result.slice(0, i), ...result.slice(i + 1)]
      set(result)
    },
    movedTo: (doc: any, from: number, to: any) => {
      result = [...result.slice(0, from), ...result.slice(from + 1)]
      result.splice(to, 0, doc)
      set(result)
    },
  })

  set(result)
  return handle.stop.bind(this)
}
