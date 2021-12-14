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
      default: false,
      validator: (v) => [true, false, 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(v),
    },
    type: {
      type: String,
      default: 'text',
      validator: (v) => ['text', 'number'].includes(v),
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
      roundedTypes: {
        true: 'rounded',
        false: '',
        none: 'rounded-none',
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
          focused: 'text-xs -top-2',
        },
      },
      attributes: {
        disabled: 'opacity-60 cursor-not-allowed',
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
        rounded-3xl
        text-xs
        sm:text-base
        whitespace-nowrap
        overflow-hidden
        text-ellipsis
        w-10/12
      "
      :class="[
        {
          [color.label.error]: isError,
          [color.label.focused]: !isError && isFocused,
          [color.label.primary]: !isError && !isFocused,
          [attributes.disabled]: isDisabled,
        },
        position.label[isFocused || placeholder ? 'focused' : 'primary'],
      ]"
      :for="componentId"
      ref="label"
    >
      <div class="w-max backdrop-filter backdrop-blur-3xl truncate px-1 mx-3">{{ label }}</div>
    </label>

    <!-- Input -->
    <input
      :type="type"
      class="border-b px-3 h-14 w-full outline-none font-sans pr-8 bg-transparent"
      :class="[
        {
          border: isOutlined,
          [border.error]: isError,
          [border.focused]: !isError && isFocused,
          [border.primary]: !isError && !isFocused,
          [attributes.disabled]: isDisabled,
        },
        color.input[isError ? 'error' : 'primary'],
        roundedTypes[rounded],
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
        color.icon.error[isError ? 'error' : 'primary'],
        icons[isLoading ? 'spinner' : 'close'],
        // Spinner also includes animation
      ]"
      @click="clearInput"
    ></i>
  </div>
</template>
