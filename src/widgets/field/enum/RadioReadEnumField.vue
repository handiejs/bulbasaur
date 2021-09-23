<template>
  <span>{{ displayText }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { EnumFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class RadioReadEnumFieldWidget extends EnumFieldHeadlessWidget {}
</script>
