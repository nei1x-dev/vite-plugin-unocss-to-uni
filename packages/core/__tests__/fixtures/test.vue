<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-green-500 text-2xl i-carbon-campsite" />
    <div class="border bg-blue-200 px-2 !bg-red-500">
      0123456789
    </div>
    <div class="p-1">
      abckefghijklmnopqrstuvwxyz
    </div>
    <div class="py-3.5">
      py-3.5
    </div>
    <button class="bg-[hsl(2.7,81.9%,69.6%)]">
      {{ title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const title = 'hello world'
</script>
