import { defineStore } from 'pinia'

export const useListElementsStore = defineStore('listElements', {
  state: () => {
    return {
      allListElements: {},
    }
  },
  actions: {
    // appendNewListElement({ elementNameId, data }) {
    //   this.allListElements[elementNameId] = data
    // },
  },
})
