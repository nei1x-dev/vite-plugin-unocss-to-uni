<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-green-500 text-2xl i-carbon-campsite" />
    <div class="border bg-blue-200 px-2 -i-bg-red-500">
      0123456789
    </div>
    <div class="p-1">
      abckefghijklmnopqrstuvwxyz
    </div>
    <div class="py-3-point-5">
      py-3.5
    </div>
    <button class="bg--l-hsl-p-2-point-7-comma-81-point-9-pct--comma-69-point-6-pct--q--r-">
      {{ title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const title = 'hello world'
</script>
