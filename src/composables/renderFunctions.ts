// @ts-nocheck
import { createTextVNode } from 'vue'
import { isEmpty, cloneDeep } from 'lodash-es'
import { useListElementsStore } from '~/stores/listElements'

const listElementsStore = useListElementsStore()

//? helper functions
const returnTextNode = (object) => {
  return createTextVNode(object.element.entity)
}

const returnNull = () => {
  console.warn('empty object passed here')
  return null
}

const iterateOnElements = (object) => {
  return listElementsStore.allListElements[object?.element?.elementNameId].map((iteratedElement) => {
    //* here we loop on Pinia's array like in a regular v-for
    if (parseElement({ object, element: iteratedElement })) {
      //* check if node should be present before proceeding
      return h(
        parseElement({ object, element: iteratedElement }),
        parseProps({ object, element: iteratedElement }), //todo need to handle the :key here
        iterativeParsing({ object, iteratedElement, dataField: object?.element?.dataField }),
      )
    }
  })
}

//? parsers
const parseElement = ({ object, element = null }) => {
  if (element && object?.props?.hints?.elements?.ifConditional) {
    if (conditionalHint({ object, hintEntity: element })) {
      return object.element.entity
    }
  } else {
    return object.element.entity
  }
}

const conditionalHint = ({ object, hintEntity }) => {
  const conditionalIf = object?.props?.hints?.elements?.ifConditional
  return eval(`${parseInt(hintEntity[conditionalIf?.fieldToTest])}${conditionalIf?.condition}`)
}

const parseProps = ({ object, element = null }) => {
  if (!('props' in object)) return null
  if (!isEmpty(addHints({ object, hintEntity: element }))) {
    console.log('hehe', object)
  }
  return object.props
}

const addHints = ({ object, hintEntity }) => {
  const hints = object?.props?.hints
  // if (hints?.elements?.onClick) {
  //   return { onClick: console.log(hintEntity[hints?.elements.onClick?.dataField]) }
  // }
}

const parseChildren = ({ object }) => {
  if (!('children' in object)) return []

  return object.children.map((child) => {
    return recursiveParsing(child)
  })
}

const iterativeParsing = ({ object, iteratedElement, dataField }) => {
  if (!('children' in object)) return []

  return object.children.map((child) => {
    if (child?.element?.type === 'iteratedElement') {
      return h(createTextVNode(iteratedElement[dataField]))
    }
    return recursiveParsing(child)
  })
}

//? main
export const recursiveParsing = (object) => {
  //* leaf, no need to dig deeper
  if (object?.element?.type === 'rawText') {
    return returnTextNode(object)
  } else if (object?.element?.type === 'iterativeList') {
    return iterateOnElements(object)
  } else if (isEmpty(object)) {
    //* if not an object, return nothing
    return returnNull()
  } else {
    //* look for element + props + children, most common use-case with an htmlTag
    return h(parseElement({ object }), parseProps({ object }), parseChildren({ object }))
  }
}
