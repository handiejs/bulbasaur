import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl, createNode } from 'handie-vue';
import { MultiEnumFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditMultiEnumFilterWidget extends MultiEnumFilterHeadlessWidget {
  private render(h: CreateElement): VNode {
    const props: Record<string, any> = {
      value: this.internalValue,
      placeholder: this.getPlaceholder(),
      multiple: true,
    };

    if (this.config.className) {
      props.className = this.config.className;
    }

    return h(
      getControl('Select'),
      { props, on: { change: this.onChange } },
      this.options.map(opt =>
        createNode(h, 'Option', { props: { label: opt.label, value: opt.value } }),
      ),
    );
  }
}
