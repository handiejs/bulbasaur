<template>
  <span>{{ value }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { StringFieldHeadlessWidget } from '../../../headless';

@Component
export default class InputReadStringFieldWidget extends StringFieldHeadlessWidget {}
</script>
