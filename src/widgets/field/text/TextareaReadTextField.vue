<template>
  <p>{{ value }}</p>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { TextFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class TextareaReadTextFieldWidget extends TextFieldHeadlessWidget {}
</script>
