import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { BooleanFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SwitchEditBooleanFieldWidget extends BooleanFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h(getControl('Switch'), { props: { value: this.value }, on: { change: this.onChange } });
  }
}
