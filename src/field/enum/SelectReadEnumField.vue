<template>
  <span>{{ displayText }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { EnumFieldHeadlessWidget } from '../../../headless';

@Component
export default class SelectReadEnumFieldWidget extends EnumFieldHeadlessWidget {}
</script>
