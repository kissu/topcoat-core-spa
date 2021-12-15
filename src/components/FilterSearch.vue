<script>
import { nanoid } from 'nanoid'

export default {
  name: 'FilterSearch',
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
    borderWidth: {
      type: String,
      default: '2',
    },
    borderStyle: {
      type: String,
      default: 'solid',
      validator: (v) => ['solid', 'dashed', 'dotted', 'double'].includes(v),
    },
    backgroundColor: {
      type: String,
      default: 'white',
    },
    isClearable: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    isLoading: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    isOutlined: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    isDisabled: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    isError: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
  },
  computed: {
    // Unique id for label's for attribute & input
    componentId() {
      return nanoid()
    },
  },
  data() {
    return {
      isFocused: false, // true if input has value or typing cursor
      value: '',
      color: {
        input: {
          primary: 'placeholder:text-neutral-500',
          error: 'placeholder:text-color-400',
        },
        label: {
          primary: 'text-neutral-500',
          focused: 'text-primary-400',
          error: 'text-error-400',
        },
        icon: {
          primary: 'text-neutral-500',
          error: 'text-error-400',
        },
      },
      border: {
        primary: 'border-neutral-400',
        focused: 'border-primary-400',
        error: 'border-error-400 placeholder:text-error-400',
      },
      borderStyles: {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double',
      },
      borderRadius: {
        true: 'rounded',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
      },
      position: {
        label: {
          primary: 'translate-y-5 sm:translate-y-4',
          focused: 'text-xs -translate-y-1',
        },
      },
      attributes: {
        disabled: 'cursor-not-allowed',
      },
      icons: {
        spinner: 'i-mdi:loading animate-spin',
        close: 'i-mdi:close',
      },
    }
  },
  methods: {
    clearInput() {
      this.value = ''
      this.isFocused = false
    },
  },
}
</script>

<template>
  <div class="relative flex mb-4">
    <!-- Label -->
    <label
      class="
        absolute
        transform
        transition-colors transition-transform
        text-xs
        sm:text-base
        whitespace-nowrap
        text-ellipsis
        px-1
        mx-3
        h-2
      "
      :class="[
        {
          // Apply colors
          [color.label.error]: isError,
          [color.label.focused]: !isError && isFocused,
          [color.label.primary]: !isError && !isFocused,

          // Change cursor
          [attributes.disabled]: isDisabled,
        },
        position.label[isFocused || placeholder ? 'focused' : 'primary'],
        `bg-${backgroundColor}`, // Background color
      ]"
      :for="componentId"
      ref="label"
    >
      <!-- Label goes to top if input is focues or placeholder is added -->
      <div
        :class="{ 'sm:-translate-y-1.5 -translate-y-0.5': isFocused || placeholder }"
        class="w-max truncate transform"
      >
        {{ label }}
      </div>
    </label>

    <!-- Input -->
    <input
      class="px-3.5 h-14 w-full outline-none font-sans pr-8"
      :class="[
        {
          // Apply colors
          [border.error]: isError,
          [border.focused]: !isError && isFocused,
          [border.primary]: !isError && !isFocused,
          'border-b': !isOutlined,
          border: isOutlined,

          // Change cursor
          [attributes.disabled]: isDisabled,
        },
        borderStyles[borderStyle],
        isError ? color.input.error : color.input.primary,
        borderRadius[rounded], // Apply border radius class
        isOutlined ? `border-${borderWidth}` : `border-b-${borderWidth}`,
        `bg-${backgroundColor}`, // Background color
      ]"
      :id="componentId"
      @focus="isFocused = true"
      @blur="isFocused = !value ? false : true"
      :disabled="isDisabled"
      v-model="value"
      :placeholder="placeholder"
    />

    <!-- Clear/Loading Icon -->
    <i
      v-if="(value && isClearable) || isLoading"
      class="absolute px-5 right-0 top-0 bottom-0 m-auto cursor-pointer"
      :class="[
        isError ? color.icon.error : color.icon.primary,
        isLoading ? icons.spinner : icons.close,
        // Spinner also includes animation
      ]"
      @click="clearInput"
    ></i>
  </div>
</template>
