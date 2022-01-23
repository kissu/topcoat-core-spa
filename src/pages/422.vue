<script>
import { h, ref, createTextVNode } from 'vue'
import { useFetch } from '@vueuse/core'
import { isEmpty } from 'lodash-es'
import RenderIterateTemplate from '~/components/render/RenderIterateTemplate.vue'

export default {
  setup() {
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
            // children: [
            //   {
            //     element: {
            //       entity: 'li',
            //       type: 'elementsList',
            //     },
            //     props: {
            //       hints: {
            //         endpoint: 'https://jsonplaceholder.typicode.com/users',
            //         loopKey: 'id',
            //         pathForData: null, // available at apex already
            //         childName: 'xyz-user', // UUID to reference this
            //       },
            //     },
            //     children: [
            //       {
            //         element: { entity: 'span', type: 'htmlTag' },
            //         props: { class: 'italic text-success-200' },
            //         children: [{ element: { entity: 'user >> ', type: 'rawText' } }],
            //       },
            //       { element: { entity: 'xyz-user', type: 'element' } },
            //     ],
            //   },
            // ],
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

    const fetchListData = async (object) => {
      try {
        const listElementsData = ref([])
        const { endpoint, pathForData } = parseProps(object).hints
        const { data } = await useFetch(endpoint).get().json()
        listElementsData.value = data.value
        return listElementsData.value
      } catch (err) {
        console.error('Error during list fetching', err)
      }
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

    //? main
    const recursiveParsing = (object) => {
      //* leaf, no need to dig deeper
      if (object?.element?.type === 'rawText') {
        return returnTextNode(object)
        // } else if (object?.element?.type === 'elementsList') {
        //   const x = await fetchListData(object)
        //   console.log('x', x)
      } else if (isEmpty(object)) {
        //* if not an object, return nothing
        return returnNull()
      } else {
        //* look for element + props + children, most common use-case
        return h(parseElement(object), parseProps(object), parseChildren(object))
      }
    }

    //? render view
    return () => [
      h(RenderIterateTemplate),
      h('hr'),
      response.value.map((obj) => recursiveParsing(obj)),
      // (async () => {
      //   await Promise.all(response.value.map(async (obj) => await recursiveParsing(obj)))
      // })(),
    ]
  },
}
</script>
