<template>
  <span>{{ displayText }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { ObjectValue } from '../../../../vendors/handie';

import { RelationFieldHeadlessWidget } from '../../../headless';

@Component
export default class SelectReadM2oFieldWidget extends RelationFieldHeadlessWidget<ObjectValue> {
  private optionMap: Record<string, any> = {};

  private get displayText(): string {
    return this.optionMap[this.internalValue as any] || '';
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
