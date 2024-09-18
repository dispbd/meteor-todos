/* eslint-disable import/no-default-export */

/**
 * This function wraps a reactive Meteor computation as a Svelte store.
 */

import { Tracker } from 'meteor/tracker'

const { nonreactive } = Tracker
const { autorun } = Tracker

export default function useTracker(reactiveFn: () => any) {
  return {
    subscribe(set: (arg0: any) => void) {
      return nonreactive(() => {
        const computation = autorun(() => set(reactiveFn()))
        return computation.stop.bind(computation)
      })
    },
  }
}
