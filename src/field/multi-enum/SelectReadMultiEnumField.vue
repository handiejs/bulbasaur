<template>
  <span>{{ displayText }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { MultiEnumFieldHeadlessWidget } from '../../../headless';

@Component
export default class SelectReadMultiEnumFieldWidget extends MultiEnumFieldHeadlessWidget {}
</script>
