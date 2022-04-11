import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { TableViewStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class TableViewWidget extends TableViewStructuralWidget {
  public created(): void {
    this.setStyleClassNames(this.$style);
  }

  public render(h: CreateElement): VNode {
    return h('div', { class: [this.getStyleClassName('TableView'), this.config.className] }, [
      this.renderSearch(),
      this.renderActionBar(),
      this.renderDataTable(),
    ]);
  }
}
