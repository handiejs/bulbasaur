import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { EnumFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class RadioEditEnumFieldWidget extends EnumFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h(
      getControl('RadioGroup'),
      { props: { value: this.internalValue }, on: { change: this.onChange } },
      this.options.map(opt =>
        h(
          getControl('Radio'),
          { props: { value: opt.value, disabled: opt.disabled } },
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