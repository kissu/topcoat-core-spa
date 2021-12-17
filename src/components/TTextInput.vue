<template>
  <div class="py-3 overflow-hidden h-max w-full truncate whitespace-nowrap">
    <div
      class="relative flex items-center pb-0.5 w-full"
      :class="[
        {
          'cursor-not-allowed': isTrue(isDisabled),
          'border-error-400 placeholder-error-400': isTrue(isError),
          'border-primary-400': !isTrue(isError) && isFocused,
          'border-neutral-400': !isTrue(isError) && !isFocused,
          [borderWidthSizes[borderWidth]]: borderWidth && isTrue(isOutlined),
          [colors[innerBgColor]]: isTrue(isOutlined),
          [borderRadius[rounded]]: isTrue(isOutlined),
        },
        isTrue(isOutlined) ? 'border' : 'border-b',
        borders[borderStyle],
      ]"
    >
      <!-- Label -->
      <div class="flex flex-col justify-center w-full">
        <div
          class="text-left w-max transition-colors"
          :class="{ 'text-error-400': isTrue(isError), 'pt-3': insideLabel }"
        >
          <!-- Inside Label -->
          <label :for="inputId" class="pb-1 px-1 ml-4.5 text-sm top-0" v-if="insideLabel">
            {{ label }}
          </label>

          <!-- Top Label -->
          <label
            v-else
            class="transform transition-transform absolute px-1 ml-4.5"
            :for="inputId"
            :class="[
              // Translate label according to border-width.
              topLabel ? borderLabelPosition[borderWidth] : 'translate-y-4 h-max',
              { [colors[innerBgColor]]: isTrue(isOutlined) },
            ]"
          >
            <div :class="{ 'relative bottom-1.5': topLabel }" class="relative">
              {{ label }}
            </div>
          </label>
        </div>

        <!-- Input -->
        <input
          class="h-max outline-none bg-transparent pl-5.5"
          v-model="value"
          :id="inputId"
          :disabled="isTrue(isDisabled)"
          :placeholder="placeholder"
          :class="[borderRadius[rounded], insideLabel ? 'py-1 pb-3' : 'py-4']"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>

      <!-- Icon -->
      <div class="pr-3 pt-2 absolute right-0 top-0 bottom-0 my-auto h-max">
        <i
          v-if="(value && isTrue(isClearable)) || isTrue(isLoading)"
          class="w-max"
          :class="[
            isTrue(isLoading) ? 'i-mdi:loading animate-spin' : 'i-mdi:close cursor-pointer',
            isTrue(isError) ? 'text-error-400' : 'text-neutral-500',
          ]"
          @click="clearInput"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rounded: {
      type: [Boolean, String],
      default: 'none',
      validator: (v) => [true, 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(v),
    },
    borderStyle: {
      type: String,
      default: 'solid',
      validator: (v) => ['solid', 'dashed', 'dotted', 'double'].includes(v),
    },
    innerBgColor: {
      type: String,
      default: 'light',
      validator: (v) => ['primary', 'secondary', 'light', 'dark'].includes(v),
    },
    labelLocation: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'inside'].includes(v),
    },
    borderWidth: {
      type: [String, Number],
      default: 1,
      validator: (v) => [0, 2, 4, 8].includes(v),
    },
    isClearable: {
      type: [Boolean, String],
      default: false,
      validator: (v) => [true, false, 'true', 'false'].includes(v),
    },
    isLoading: {
      type: [Boolean, String],
      default: false,
      validator: (v) => [true, false, 'true', 'false'].includes(v),
    },
    isOutlined: {
      type: [Boolean, String],
      default: false,
      validator: (v) => [true, false, 'true', 'false'].includes(v),
    },
    isDisabled: {
      type: [Boolean, String],
      default: false,
      validator: (v) => [true, false, 'true', 'false'].includes(v),
    },
    isError: {
      type: [Boolean, String],
      default: false,
      validator: (v) => [true, false, 'true', 'false'].includes(v),
    },
  },
  computed: {
    // Unique id for input.
    inputId() {
      return nanoid()
    },
    topLabel({ isFocused, placeholder, value, labelLocation }) {
      // Border label that animates to top if any of these condition are true.
      // Unlike `inside label` top label is only active when input focus or input has value.
      return (isFocused || placeholder || value) && labelLocation == 'top'
    },
    insideLabel({ labelLocation }) {
      // Label stays fixed inside the parent container.
      return labelLocation == 'inside'
    },
  },
  data() {
    return {
      isFocused: false, // true if input has value or typing cursor
      value: '',
      borders: {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double',
      },
      borderRadius: {
        none: 'rouned-none',
        true: 'rounded',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
      },
      borderWidthSizes: {
        1: 'border',
        2: 'border-2',
        4: 'border-4',
        8: 'border-8',
      },
      borderLabelPosition: {
        1: '-translate-y-0.5 text-xs',
        2: '-translate-y-0.5 text-xs',
        4: '-translate-y-1 text-xs',
        8: '-translate-y-2 text-sm',
      },
      colors: {
        primary: 'bg-primary-50 text-neutral-900',
        secondary: 'bg-secondary-50 text-neutral-900',
        light: 'bg-neutral-50 text-neutral-900',
        dark: 'bg-neutral-900 text-neutral-50',
      },
    }
  },
  methods: {
    clearInput() {
      this.value = ''
      this.isFocused = false
    },
    isTrue(value) {
      // Handle `string booleans`
      if (typeof value == 'string') {
        return value == 'true'
      }
      return value
    },
  },
}
</script>
