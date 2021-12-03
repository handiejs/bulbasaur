import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { ActionHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class ButtonActionWidget extends ActionHeadlessWidget {
  private render(h: CreateElement): VNode {
    const { primary, danger } = this.action;

    const classNames: string[] = ['ActionWidget', 'ButtonActionWidget'];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    const props: Record<string, any> = { className: classNames.join(' '), disabled: this.disabled };

    if (this.config.size) {
      props.size = this.config.size;
    }

    if (primary) {
      props.color = 'primary';
    }

    if (danger) {
      props.color = 'danger';
    }

    return h(
      getControl('Button'),
      { props, on: { click: () => this.onExecute() } },
      this.resolveContent(),
    );
  }
}
