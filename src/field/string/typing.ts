import { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import { StringFieldWidgetConfig } from 'handie-vue';

interface InputStringFieldWidgetConfig extends StringFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

export { InputStringFieldWidgetConfig };
