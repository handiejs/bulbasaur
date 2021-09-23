import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from '../../../../vendors/handie';

import { EnumFieldHeadlessWidget } from '../../../headless';

@Component
export default class RadioEditEnumFieldWidget extends EnumFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h(
      getControl('RadioGroup'),
      { props: { value: this.internalValue }, on: { input: this.onChange } },
      this.options.map(opt =>
        h(
          getControl('Radio'),
          { props: { label: opt.value, value: opt.value, disabled: opt.disabled } },
          opt.hint
            ? [
                opt.label,
                h(getControl('Tooltip'), { props: { content: opt.hint } }, [
                  h(getControl('Icon'), {
                    props: {
                      refs: this.config.hintIcon || this.getCommonBehavior('field.hintIcon'),
                    },
                  }),
                ]),
              ]
            : opt.label,
        ),
      ),
    );
  }
}
