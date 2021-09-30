import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ListValue, getControl, createNode } from 'handie-vue';
import { RelationFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditM2mFieldWidget extends RelationFieldHeadlessWidget<ListValue> {
  private options: any[] = [];

  private render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: { value: this.internalValue, placeholder: this.getPlaceholder(), multiple: true },
        on: { change: this.onChange },
      },
      this.options.map(opt =>
        createNode(h, 'Option', {
          props: { label: opt[this.labelKey], value: opt[this.valueKey] },
        }),
      ),
    );
  }

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
