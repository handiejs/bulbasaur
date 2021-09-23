import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectValue, getControl } from '../../../../vendors/handie';

import { RelationFieldHeadlessWidget } from '../../../headless';

@Component
export default class SelectEditM2oFieldWidget extends RelationFieldHeadlessWidget<ObjectValue> {
  private options: any[] = [];

  private render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: { value: this.internalValue, placeholder: this.getPlaceholder() },
        on: { change: this.onChange },
      },
      this.options.map(opt =>
        h(getControl('Option'), {
          props: { label: opt[this.labelKey], value: opt[this.valueKey] },
        }),
      ),
    );
  }

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
