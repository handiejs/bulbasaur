<template>
  <p>{{ value }}</p>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { TextFieldHeadlessWidget } from '../../../headless';

@Component
export default class TextareaReadTextFieldWidget extends TextFieldHeadlessWidget {}
</script>
