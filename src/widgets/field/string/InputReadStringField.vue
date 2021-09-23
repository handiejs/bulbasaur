<template>
  <span>{{ value }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { StringFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class InputReadStringFieldWidget extends StringFieldHeadlessWidget {}
</script>
