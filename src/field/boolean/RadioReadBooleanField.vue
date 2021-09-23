<template>
  <span>{{ value ? positiveLabel : negativeLabel }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { BooleanFieldHeadlessWidget } from '../../../headless';

@Component
export default class RadioReadBooleanFieldWidget extends BooleanFieldHeadlessWidget {}
</script>
