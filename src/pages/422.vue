<script>
import { h, ref, createTextVNode } from 'vue'
import { useFetch } from '@vueuse/core'
import { isEmpty } from 'lodash-es'
import RenderIterateTemplate from '~/components/render/RenderIterateTemplate.vue'
import { useListElementsStore } from '~/stores/listElements'

export default {
  async setup() {
    const listElementsStore = useListElementsStore()

    const { data } = await useFetch('https://picsum.photos/v2/list?limit=10').get().json()
    listElementsStore.$patch((state) => {
      state.allListElements['xyz-images'] = data // unique ID here
      state.hasChanged = true
    })

    const response = ref([
      {
        element: { entity: 'section', type: 'htmlTag' },
        children: [
          {
            element: { entity: 'h1', type: 'htmlTag' },
            props: { class: 'text-3xl font-bold text-secondary-400' },
            children: [
              { element: { entity: 'Render-function rendered template via JSON object', type: 'rawText' } },
            ],
          },
          {
            element: { entity: 'article', type: 'htmlTag' },
            props: { class: 'mx-auto w-48' },
            children: [
              {
                element: { entity: 'p', type: 'htmlTag' },
                props: { class: 'text-successuy-700 font-bold' },
                children: [{ element: { entity: 'Interesting image', type: 'rawText' } }],
              },
              {
                element: { entity: 'img', type: 'htmlTag' },
                props: { src: 'https://source.unsplash.com/random/200x200', class: 'h-auto' },
              },
            ],
          },
          { element: { entity: 'br', type: 'htmlTag' } },
          { element: { entity: 'br', type: 'htmlTag' } },
          {
            element: { entity: 'p', type: 'htmlTag' },
            props: null,
            children: [
              { element: { entity: 'We do have some ', type: 'rawText' } },
              {
                element: { entity: 'span', type: 'htmlTag' },
                props: { class: 'font-black text-error-400' },
                children: [{ element: { entity: 'fancy users', type: 'rawText' } }],
              },
              { element: { entity: ' below', type: 'rawText' } },
            ],
          },
          {
            element: { entity: 'ul', type: 'htmlTag' },
            props: null,
            children: [
              {
                element: {
                  entity: 'li',
                  type: 'iterativeList',
                  elementNameId: 'xyz-images',
                  dataField: 'url',
                },
                props: { key: 'id' },
                children: [
                  {
                    element: { entity: 'span', type: 'htmlTag' },
                    props: { class: 'italic text-success-200' },
                    children: [{ element: { entity: 'images >> ', type: 'rawText' } }],
                  },
                  { element: { entity: 'xyz-images', type: 'iteratedElement' } },
                ],
              },
            ],
          },
        ],
      },
      {
        element: { entity: 'div', type: 'htmlTag' },
        props: null,
        children: [{ element: { entity: 'i am at root level', type: 'rawText' } }],
      },
      {
        element: { entity: 'p', type: 'htmlTag' },
        props: null,
        children: [
          { element: { entity: 'same here ', type: 'rawText' } },
          {
            element: { entity: 'span', type: 'htmlTag' },
            props: null,
            children: [{ element: { entity: 'nested', type: 'rawText' } }],
          },
        ],
      },
    ])

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
        return h(
          parseElement(object),
          parseProps(object), //todo need to handle the :key here
          iterativeParsing({ object, iteratedElement, dataField: object?.element?.dataField }),
        )
      })
    }

    //? parsers
    const parseElement = (object) => {
      return object.element.entity
    }

    const parseProps = (object) => {
      if (!('props' in object)) return null
      return object.props
    }

    const parseChildren = (object) => {
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
    const recursiveParsing = (object) => {
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
        return h(parseElement(object), parseProps(object), parseChildren(object))
      }
    }

    //? render view
    return () => [h(RenderIterateTemplate), h('hr'), response.value.map((obj) => recursiveParsing(obj))]
  },
}
</script>
