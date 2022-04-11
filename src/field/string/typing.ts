import { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import { StringFieldWidgetConfig } from 'handie-vue';

interface InputStringFieldWidgetConfig extends StringFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

interface UrlStringFieldWidgetConfig extends StringFieldWidgetConfig {
  readonly scheme?: string | string[];
  readonly noAuthority?: boolean;
}

export { InputStringFieldWidgetConfig, UrlStringFieldWidgetConfig };
