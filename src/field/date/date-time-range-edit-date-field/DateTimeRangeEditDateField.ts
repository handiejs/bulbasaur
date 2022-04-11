import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, isFunction, pick, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateTimeRangeEditDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }

  public render(h: CreateElement): VNode {
    const { disableDate, showNow } = pick(this.config, ['disableDate', 'showNow']) as Record<
      string,
      any
    >;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getRangeValue(), date, this.$$view.getValue());
    }

    return h(getControl('DateTimeRangePicker'), {
      props: {
        value: this.getRangeValue(),
        placeholder: this.getRangePlaceholders(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        separator: this.getSeparator(),
        pickerOption: options,
      },
      on: { change: (_, dates) => this.onRangeChange(dates) },
    });
  }
}
