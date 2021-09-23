import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { ActionHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class ButtonActionWidget extends ActionHeadlessWidget {
  private render(h: CreateElement): VNode {
    const { primary, danger } = this.action;
    const props: Record<string, any> = { disabled: this.disabled };

    if (primary) {
      props.color = 'primary';
    }

    if (danger) {
      props.color = 'danger';
    }

    const classNames: string[] = ['ActionWidget', 'ButtonActionWidget'];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    return h(
      getControl('Button'),
      { class: classNames, props, on: { click: () => this.onExecute() } },
      this.resolveContent(),
    );
  }
}
