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
    },
    rounded: {
      type: [Boolean, String],
      default: false,
      validator: (size) => [true, false, 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(size),
    },
    type: {
      type: String,
      default: 'text',
      validator: (type) => ['text', 'number'].includes(type),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disableLabelAnimation: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputClasses() {
      // Classes on focus, blurred and outlined
      let classes = [this.outlined ? 'bg-white dark:bg-black border' : 'bg-transparent']

      if (!this.error) {
        classes.push(this.focused ? 'border-primary-400' : 'border-neutral-400')
      } else {
        // If error = true
        classes.push('border-error-400 placeholder-error-400')
      }

      // Rounded can be a boolean or a string
      if (this.rounded) {
        let roundedIsBoolean = typeof this.rounded == 'boolean'
        classes.push(roundedIsBoolean ? 'rounded' : `rounded-${this.rounded}`)
      }

      return classes
    },
    labelClasses() {
      // Classes when outlined and focus
      let classes = [
        {
          'bg-white dark:bg-black': this.outlined,
        },
        this.focused ? 'text-xs top-0 text-primary-400' : 'top-6 text-neutral-500',
      ]

      // Handle error classes
      if (!this.error) {
        classes.push(this.focused ? 'text-primary-400' : 'text-neutral-500')
      } else {
        classes.push('text-error-400')
      }
      return classes
    },
    componentId() {
      return 'el-' + (Math.random() + 1).toString(36).substring(7)
    },
  },
  data() {
    return {
      focused: false, // true if input has value or typing cursor
      value: '',
    }
  },
}
</script>

<template>
  <div class="relative flex mb-4">
    <!-- Label -->
    <label
      v-if="!disableLabelAnimation"
      class="absolute transform translate-x-2 transition-all text px-1"
      :class="labelClasses"
      :for="componentId"
    >
      <span class="relative bottom-2">{{ label || '' }}</span>
    </label>
    <!-- Input -->
    <input
      :type="type"
      class="border-b px-3 h-14 w-full outline-none font-sans placeholder-neutral-500"
      :class="inputClasses"
      :id="componentId"
      ref="searchInput"
      @focus="focused = true"
      @blur="focused = !value ? false : true"
      :disabled="disabled"
      v-model="value"
      :placeholder="disableLabelAnimation ? label : ''"
    />
  </div>
</template>
