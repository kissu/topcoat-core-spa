<template>
  <div
    class="w-full h-max relative flex items-center pb-0.5 w-full"
    :class="[
      styles.borders[borderStyle],
      isTrue(isOutlined) && [styles.colors[innerBgColor], styles.borderRadius[isRounded]],
      isTrue(isOutlined) && borderWidth && styles.borderWidthSizes[borderWidth],
      isTrue(isDisabled) && 'cursor-not-allowed',
      isTrue(isError) && 'border-error-400 placeholder-error-400',
      !isTrue(isError) && isFocused && 'border-primary-400',
      !isTrue(isError) && !isFocused && 'border-neutral-400',
      isTrue(isOutlined) ? 'border' : 'border-b',
    ]"
  >
    <!-- Label -->
    <div class="flex flex-col justify-center w-full">
      <div
        class="text-left transition-colors w-max"
        :class="[insideLabel && 'pt-3', isTrue(isError) && 'text-error-400']"
      >
        <!-- Inside Label -->
        <label :for="inputUuid" class="pb-1 px-1 ml-4.5 text-sm top-0 opacity-80" v-if="insideLabel">
          {{ label }}
        </label>

        <!-- Top Label -->
        <label
          v-else
          class="transform transition-transform absolute px-1 ml-4.5"
          :for="inputUuid"
          :class="[
            // Translate label according to border-width.
            isTrue(isOutlined) && styles.colors[innerBgColor],
            topLabel ? styles.borderLabelPosition[borderWidth] : 'translate-y-4 h-max',
          ]"
        >
          <div :class="[topLabel && 'relative bottom-1.5']" class="relative">{{ label }}</div>
        </label>
      </div>

      <!-- Input -->
      <input
        class="h-max outline-none bg-transparent pl-5.5"
        v-model="value"
        :id="inputUuid"
        :disabled="isTrue(isDisabled)"
        :placeholder="placeholder"
        :class="[styles.borderRadius[isRounded], insideLabel ? 'pt-1 pb-3' : 'py-4']"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>

    <!-- Icon -->
    <div class="absolute top-0 bottom-0 right-0 pt-2 pr-3 my-auto h-max">
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
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 't-text-input',
  props: {
    //* Strings
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
    label: {
      type: String,
      default: '',
    },
    labelLocation: {
      type: String,
      default: 'top',
      validator: (v) => ['top', 'inside'].includes(v),
    },
    placeholder: {
      type: String,
      default: '',
    },

    //* Mixed types
    borderWidth: {
      type: [String, Number],
      default: 2,
      validator: (v) => [0, 2, 4, 8].includes(Number(v)),
    },

    //* String-leans
    isClearable: {
      type: [Boolean, String],
      default: false,
      validator: (v) => ['true', 'false'].includes(String(v)),
    },
    isDisabled: {
      type: [Boolean, String],
      default: false,
      validator: (v) => ['true', 'false'].includes(String(v)),
    },
    isError: {
      type: [Boolean, String],
      default: false,
      validator: (v) => ['true', 'false'].includes(String(v)),
    },
    isLoading: {
      type: [Boolean, String],
      default: false,
      validator: (v) => ['true', 'false'].includes(String(v)),
    },
    isOutlined: {
      type: [Boolean, String],
      default: false,
      validator: (v) => ['true', 'false'].includes(String(v)),
    },
    isRounded: {
      type: [Boolean, String],
      default: 'none',
      validator: (v) => ['true', 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(String(v)),
    },
  },
  computed: {
    // Unique id for input.
    inputUuid() {
      return nanoid()
    },
    topLabel() {
      // Border label that animates to top if any of these condition are true.
      // Unlike `inside label` top label is only active when input focus or input has value.
      return (this.isFocused || this.placeholder || this.value) && this.labelLocation === 'top'
    },
    insideLabel() {
      // Label stays fixed inside the parent container.
      return this.labelLocation === 'inside'
    },
    urlParam: {
      get() {
        return this.text_internal
      },
      set(value) {
        this.text_internal = value
        this.setFilterValue('query', this.text_internal, true)
      },
    },
  },
  data() {
    return {
      isFocused: false, // true if input has value or typing cursor
      styles: {
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
      },
      value: '',
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
    onVisualizationInit() {
      const initial_value = this.getFilterValue('query')

      if (initial_value) {
        this.text_internal = initial_value
      } else if (this.config.default_value) {
        this.text_internal = this.config.default_value
      } else {
        return
      }
      this.value = this.text_internal
      this.setFilterValue('query', this.text_internal, true)
    },
    onEnter(e) {
      if (e.keyCode === 13) {
        this.urlParam = this.value
      }
    },
  },
}
</script>
