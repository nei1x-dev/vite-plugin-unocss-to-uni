<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-green-500 text-2xl i-carbon-campsite" />
    <div class="border bg-blue-200 px-2 !bg-red-500">
      0123456789
    </div>
    <div class="p-1" :class="'text-yellow-500'">
      abckefghijklmnopqrstuvwxyz
    </div>
    <div class="bg-[hsl(2.7,81.9%,69.6%)] py-3.5 grid-cols-[0.7fr_repeat(7,1fr)]">
      py-3.5
    </div>
    <p
      class="font-medium text-xs p-2.5"
      :class="1 ? 'text-10px leading-tight p-2.5' : 'm-3.5'"
    >
      p-2.5
    </p>
    <div class="m-0.5 p-1" :class="'text-yellow-500 p-2.5'">
      abckefghijklmnopqrstuvwxyz
    </div>
    <button class="btn" :class="true ? '' : 'h-0'">
      123
    </button>
  </div>
</template>
