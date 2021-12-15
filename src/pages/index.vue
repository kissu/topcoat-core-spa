<template>
  <div>
    <!-- Note: need to make a library like page for all components -->
    <h1 class="pb-6">Search Filters</h1>
    <div class="grid grid-cols-3 gap-2">
      <filter-search is-outlined rounded="lg" label="Outlined, Rounded & Loader" is-loading />

      <filter-search is-outlined rounded label="Outlined, Rounded & Error" is-error />
      <filter-search
        is-outlined
        rounded
        label="Outlined, Placeholder & Clear Button"
        is-clearable
        placeholder="Search"
      />
      <filter-search is-disabled label="No Outline, Disabled" />
      <filter-search is-disabled is-outlined label="Outlined, Flat & Disabled" />
      <filter-search label="Default" />
    </div>
  </div>
</template>
