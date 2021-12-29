<template>
  <div>
    <!-- Note: need to make a library like page for all components -->
    <h1 class="pb-6">Search Filters</h1>
    <div class="grid grid-cols-3 gap-2">
      <t-text-input label="Default" border-width="2" border-color="dark" border-highlight-color="secondary" />
      <t-text-input label="Default Outlined & Loading" is-outlined is-loading />
      <t-text-input label="Outlined & Clearable" is-outlined is-clearable="true" />
      <t-text-input label="Label" placeholder="Placeholder & Rounded 3xl" is-rounded="3xl" is-outlined />
      <t-text-input
        label="Label"
        placeholder="Inside Label & dark color"
        label-location="inside"
        is-rounded="3xl"
        inner-bg-color="dark"
        is-outlined
        is-disabled="true"
      />
      <t-text-input
        label="Label"
        placeholder="Border width is 4"
        border-width="4"
        is-rounded="3xl"
        is-outlined
      />
    </div>
  </div>
</template>
