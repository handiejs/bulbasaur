import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { TableViewHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class TableViewWidget extends TableViewHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h('div', { staticClass: 'TableView', class: this.config.className }, [
      this.renderSearch(),
      this.renderActionBar(),
      this.renderDataTable(),
    ]);
  }
}
