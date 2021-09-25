import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { BooleanFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class RadioEditBooleanFieldWidget extends BooleanFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    const positiveOption: VNode = h(
      getControl('Radio'),
      { props: { value: true } },
      this.positiveLabel,
    );

    const negativeOption: VNode = h(
      getControl('Radio'),
      { props: { value: false } },
      this.negativeLabel,
    );

    return h(
      getControl('RadioGroup'),
      { props: { value: this.value }, on: { change: this.onChange } },
      this.negativeFirst ? [negativeOption, positiveOption] : [positiveOption, negativeOption],
    );
  }
}
