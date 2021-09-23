<template>
  <span>{{ displayText }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { ListValue } from '../../../../vendors/handie';

import { RelationFieldHeadlessWidget } from '../../../headless';

@Component
export default class SelectReadM2mFieldWidget extends RelationFieldHeadlessWidget<ListValue> {
  private optionMap: Record<string, any> = {};

  private get displayText(): string {
    return this.internalValue.map(val => this.optionMap[val]).join('、');
  }

  protected created(): void {
    this.fetchRelatedList(
      {},
      data =>
        (this.optionMap = data.reduce(
          (prev, opt) => ({ ...prev, [opt[this.valueKey]]: opt[this.labelKey] }),
          {},
        )),
    );
  }
}
</script>
