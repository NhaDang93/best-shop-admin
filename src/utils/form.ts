import { translate } from 'src/i18n/translate';
import {
  rxASCII,
  rxMustContainAlphabet,
  rxMustContainNumber,
} from 'src/utils/regex';
import * as Yup from 'yup';
import { StringSchema } from 'yup';

export type TranslationType = (ns: any, option?: any) => any;

export const customRuleEmail = ({
  name = '',
  maxLength = 255,
  isRequired = true,
  messageRequired = `${translate('dialog:enter_your_$field', {
    field: name?.toLocaleLowerCase(),
  })}`,
  messageFormatEmail = translate('dialog:you_entered_invalid_field_format', {
    field: translate(name),
  }),
}: {
  name: string;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  messageRequired?: string;
  messageFormatEmail?: string;
}) => {
  const yupEmail = (yup: StringSchema<any>) => {
    return yup
      .max(
        maxLength,
        translate(`dialog:$field_must_contain_up_to_$max_characters`, {
          field: name,
          max: maxLength,
        })
      )
      .email(messageFormatEmail)
      .test(name, messageFormatEmail, (email) => {
        const localPart = email?.indexOf('@') ?? 0;
        if (localPart > 63) {
          return false;
        }
        return true;
      });
  };
  const yup = Yup.string();
  if (isRequired) {
    const yupResult = yup.required(translate(messageRequired));

    return yupEmail(yupResult);
  }
  const yupResult = yup.notRequired();

  return yupEmail(yupResult);
};

export const customRulePassword = ({
  name = '',
  minLength = 8,
  maxLength = 32,
  isRequired = true,
  messageRequired = `${translate('dialog:enter_your_$field', {
    field: name?.toLocaleLowerCase(),
  })}`,
}: {
  name: string;
  minLength?: number;
  maxLength?: number;
  validate?: (val: any) => any;
  isRequired?: boolean;
  messageRequired?: string;
}) => {
  const yupMinMax = (yup: StringSchema<any>) => {
    return yup
      .test(
        name,
        translate(
          'dialog:password_cannot_contain_space_and_non_printable_characters'
        ),
        (password: any) =>
          password ? (rxASCII.exec(password) as unknown as boolean) : true
      )
      .min(
        minLength,
        translate('dialog:$field_must_contain_at_least_$min_characters', {
          field: name,
          min: minLength,
        })
      )
      .max(
        maxLength,
        translate('dialog:$field_must_contain_up_to_$max_characters', {
          field: name,
          max: maxLength,
        })
      )
      .test(
        name,
        translate(
          'dialog:$field_must_contain_at_least_$alphabet_alphabet_and_$number_number',
          {
            field: translate(name),
            alphabet: 1,
            number: 1,
          }
        ),
        (password) =>
          password
            ? (rxMustContainNumber.exec(password) as unknown as boolean)
            : true
      )
      .test(
        name,
        translate(
          'dialog:$field_must_contain_at_least_$alphabet_alphabet_and_$number_number',
          {
            field: translate(name),
            alphabet: 1,
            number: 1,
          }
        ),
        (password) =>
          password
            ? (rxMustContainAlphabet.exec(password) as unknown as boolean)
            : true
      );
  };
  const yup = Yup.string();
  if (isRequired) {
    const yupResult = yup.required(translate(messageRequired));
    return yupMinMax(yupResult);
  }
  const yupResult = yup.notRequired();
  return yupMinMax(yupResult);
};
