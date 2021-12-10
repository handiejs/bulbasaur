import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  FilterDescriptor,
  isBoolean,
  isNumber,
  isNumeric,
  getControl,
  getRenderer,
} from 'handie-vue';
import { SearchHeadlessWidget } from 'handie-vue/dist/widgets';

import defaultBehaviors from './behavior';

@Component
export default class FormSearchWidget extends SearchHeadlessWidget {
  private resolveLabelWidth(): string {
    const labelWidth =
      this.config.formControlLabelWidth || this.getBehavior('formControlLabelWidth');

    return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
  }

  private resolveSearchable(): boolean {
    return isBoolean(this.config.searchable)
      ? this.config.searchable
      : this.getBehavior('searchable') !== false;
  }

  private resolveResettable(): boolean {
    return isBoolean(this.config.resettable)
      ? this.config.resettable
      : this.getBehavior('resettable') === true;
  }

  private handleSearch(evt: any): void {
    this.submit();

    if (evt) {
      evt.preventDefault();
    }
  }

  private renderFilter(h: CreateElement, filter: FilterDescriptor): VNode {
    return h(getControl('FormField'), { props: { label: filter.label } }, [
      h(getRenderer('FilterRenderer'), {
        props: { filter, value: this.condition[filter.name] },
        on: { change: this.setFilterValue },
      }),
    ]);
  }

  private renderFilterRow(h: CreateElement, filters: FilterDescriptor[]): VNode {
    return h(
      'div',
      { staticClass: 'FormSearch-filterRow' },
      filters.map(filter => this.renderFilter(h, filter)),
    );
  }

  private renderFilters(h: CreateElement): VNode[] {
    const filterNodes: VNode[] = [];
    const rows = (this.config.arrangement || '').split('|') as any[];

    let needLayout = false;

    if (rows.length > 0) {
      const availableRows: number[] = [];

      rows.forEach(row => {
        if (isNumeric(row) && Number(row) > 0) {
          availableRows.push(row);
        }
      });

      needLayout = availableRows.length === rows.length;
    }

    if (needLayout) {
      const remainedFilters = this.filters.filter(({ hidden }) => hidden !== true);

      do {
        filterNodes.push(this.renderFilterRow(h, remainedFilters.splice(0, rows.shift() * 1)));
      } while (remainedFilters.length > 0 && rows.length > 0);

      if (remainedFilters.length > 0) {
        filterNodes.push(this.renderFilterRow(h, remainedFilters));
      }
    } else {
      this.filters.forEach(filter => {
        if (!filter.hidden) {
          filterNodes.push(this.renderFilter(h, filter));
        }
      });
    }

    return filterNodes;
  }

  private render(h: CreateElement): VNode {
    const formControlSize = this.getBehavior('formControlSize');
    const formChildren: (VNode | null)[] = this.renderFilters(h);
    const standalone = this.getBehavior('actionsStandalone') === true;
    const searchable = this.resolveSearchable();
    const buttonProps: Record<string, any> = {
      className: 'FormSearch-button',
      size: formControlSize,
      nativeType: standalone ? 'button' : 'submit',
    };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: VNode[] = [];

    if (searchable) {
      buttons.push(
        h(getControl('Button'), { props: buttonProps, on: { click: this.handleSearch } }, '查询'),
      );
    }

    if (this.resolveResettable()) {
      buttons.push(
        h(
          getControl('Button'),
          {
            props: { className: 'FormSearch-button', size: formControlSize },
            on: {
              click: evt => {
                this.reset();
                evt.preventDefault();
              },
            },
          },
          '重置',
        ),
      );
    }

    const buttonGroup: VNode | null =
      buttons.length > 0
        ? h(
            'div',
            { staticClass: 'FormSearch-buttonGroup', class: { 'is-standalone': standalone } },
            buttons,
          )
        : null;

    if (standalone || !searchable) {
      // for submission when the Enter key pressed
      formChildren.push(
        h('div', { staticStyle: { display: 'none' } }, [
          h(
            getControl('Button'),
            {
              props: { nativeType: 'submit' },
              on: { click: this.handleSearch },
            },
            '替身查询',
          ),
        ]),
      );
    }

    if (!standalone) {
      formChildren.push(buttonGroup);
    }

    const form = h(
      getControl('Form'),
      {
        props: {
          value: this.condition,
          controlSize: formControlSize,
          layout: this.getBehavior('formLayout'),
          labelOption: { width: this.resolveLabelWidth() },
        },
      },
      formChildren,
    );

    return h('div', { staticClass: 'FormSearch' }, standalone ? [form, buttonGroup] : [form]);
  }

  protected created(): void {
    this.setBehaviors('search.form', defaultBehaviors);
    this.initCondition();
  }
}
