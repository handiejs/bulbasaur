import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectViewWidgetState, isBoolean, capitalize, getControl } from 'handie-vue';
import { FormViewStructuralWidget } from 'handie-vue/dist/widgets';

import { DetailViewWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

@Component
export default class DetailViewWidget extends FormViewStructuralWidget<
  ObjectViewWidgetState,
  DetailViewWidgetConfig
> {
  private isActionBarOutside(): boolean {
    if (isBoolean(this.config.actionBarOutside)) {
      return this.config.actionBarOutside!;
    }

    return isBoolean(this.getBehavior('actionBarOutside'))
      ? this.getBehavior('actionBarOutside')
      : this.getCommonBehavior('view.objectViewActionBarOutside', false);
  }

  private resolveActionBarAlignment(): 'left' | 'center' | 'right' {
    if (this.config.actionBarAlignment) {
      return this.config.actionBarAlignment;
    }

    return (
      this.getBehavior('actionBarAlignment') ||
      this.getCommonBehavior('view.objectViewActionBarAlignment', 'left')
    );
  }

  public created(): void {
    this.setBehaviors('view.detail', defaultBehaviors);
    this.fetchData();
  }

  public render(h: CreateElement): VNode {
    const outside = this.isActionBarOutside();
    const actionBar = this.renderActionBar(this.$style['DetailViewWidget-actionBar']);

    return h(
      getControl('Wait'),
      {
        props: {
          className: [
            this.$style.DetailViewWidget,
            this.$style[
              `DetailViewWidget--actionBar${capitalize(this.resolveActionBarAlignment())}`
            ],
            { [this.$style['DetailViewWidget--actionBarOutside']]: outside },
            this.config.className,
          ],
          busy: this.loading,
        },
      },
      outside
        ? [
            h('div', { class: this.$style['DetailViewWidget-formContainer'] }, [
              this.renderForm({
                className: this.$style['DetailViewWidget-form'],
                readonly: true,
              }),
            ]),
            actionBar,
          ]
        : [
            this.renderForm({
              className: this.$style['DetailViewWidget-form'],
              readonly: true,
              children: [actionBar],
            }),
          ],
    );
  }
}
