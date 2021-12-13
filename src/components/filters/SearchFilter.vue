<script>
export default {
  name: 'SearchFilter',
  props: {
    label: {
      type: String,
      default: 'Search',
    },
    outlined: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
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
    disabled: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    error: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    fixedLabel: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
    clearIcon: {
      type: Boolean,
      default: false,
      validator: (v) => [true, false].includes(v),
    },
  },
  computed: {
    inputClasses() {
      let { border, outlined, error, border_radius, rounded, color, focused } = this

      // Classes on focus, blurred and outlined
      let textColor = error ? color.input.error : color.input.primary
      let outline = { border: outlined }
      let borderColor = error ? border.error : focused ? border.focused : border.primary
      let borderRadius = border_radius[rounded] || 'rounded-none'

      return [textColor, outline, borderColor, borderRadius]
    },
    labelClasses() {
      let { error, focused, position, color } = this

      // Classes when outlined and focus
      let placement = focused ? position.label.focused : position.label.primary
      let textColor = error ? color.label.error : focused ? color.label.focused : color.label.primary

      return [placement, textColor]
    },
    iconClasses() {
      let { color, error } = this
      return error ? color.icon.error : color.icon.primary
    },
    componentId() {
      return 'el-' + (Math.random() + 1).toString(36).substring(7)
    },
  },
  data() {
    return {
      focused: false, // true if input has value or typing cursor
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
        error: 'border-error-400 placeholder-error-400',
      },
      border_radius: {
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
          primary: 'top-4',
          focused: 'text-xs -top-2',
        },
      },
    }
  },
}
</script>

<template>
  <div class="relative flex mb-4">
    <!-- Label -->
    <label
      v-if="!fixedLabel"
      class="
        absolute
        transform
        translate-x-2
        transition-all
        mx-1
        px-1
        rounded-3xl
        backdrop-filter backdrop-blur
        bg-current
        whitespace-nowrap
      "
      :class="labelClasses"
      :for="componentId"
    >
      <span>{{ label || '' }}</span>
    </label>

    <!-- Input -->
    <input
      :type="type"
      class="border-b px-3 h-14 w-full outline-none font-sans pr-8 bg-current"
      :class="inputClasses"
      :id="componentId"
      ref="searchInput"
      @focus="focused = true"
      @blur="focused = !value ? false : true"
      :disabled="disabled"
      v-model="value"
      :placeholder="fixedLabel ? label : ''"
    />

    <!-- Clear Icon -->
    <i
      v-if="value && clearIcon"
      class="i-mdi:close absolute px-5 right-0 top-0 bottom-0 m-auto cursor-pointer"
      :class="iconClasses"
      @click="value = ''"
    ></i>
  </div>
</template>
