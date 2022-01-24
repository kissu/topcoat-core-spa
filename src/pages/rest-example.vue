<script>
import { h, ref } from 'vue'
import RenderIterateTemplate from '~/components/render/RenderIterateTemplate.vue'
import { recursiveParsing } from '~/composables/renderFunctions.ts'

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
            props: { onClick: () => console.log('regular click') },
            children: [
              {
                element: { entity: 'We do have some ', type: 'rawText' },
              },
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
                props: {
                  key: 'id',
                  hints: {
                    elements: {
                      ifConditional: {
                        condition: '% 2 === 0',
                        fieldToTest: 'id',
                      },
                      // onClick: {
                      //   dataField: 'author',
                      // },
                    },
                  },
                },
                children: [
                  {
                    element: { entity: 'span', type: 'htmlTag' },
                    props: { class: 'italic text-success-200' },
                    children: [{ element: { entity: 'images >> ', type: 'rawText' } }],
                  },
                  {
                    element: { entity: 'xyz-images', type: 'iteratedElement' },
                  },
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

    //? render view
    return () => [h(RenderIterateTemplate), h('hr'), response.value.map((obj) => recursiveParsing(obj))]
  },
}
</script>
