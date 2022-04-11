import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, isFunction, pick, getControl } from 'handie-vue';
import { DateFilterStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateRangeDateFilterWidget extends DateFilterStructuralWidget<DateValue[]> {
  private handleRangeChange(_, dates: (Date | null)[] | null): void {
    this.onRangeChange(dates);

    if (this.searchImmediately) {
      this.$$view.reload();
    }
  }

  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('filter.dateFormat'));
  }

  public render(h: CreateElement): VNode {
    const { disableDate, showNow } = pick(this.config, ['disableDate', 'showNow']) as Record<
      string,
      any
    >;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getRangeValue(), date, this.$$search.getValue());
    }

    return h(getControl('DateRangePicker'), {
      props: {
        value: this.getRangeValue(),
        placeholder: this.getRangePlaceholders(),
        format: this.getDisplayFormat(),
        separator: this.getSeparator(),
        pickerOption: options,
      },
      on: { change: this.handleRangeChange },
    });
  }
}
