<template>
  <span>{{ value ? positiveLabel : negativeLabel }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { BooleanFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SwitchReadBooleanFieldWidget extends BooleanFieldHeadlessWidget {}
</script>
