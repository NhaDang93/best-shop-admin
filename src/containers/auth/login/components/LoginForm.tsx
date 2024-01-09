// ** React Imports
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { styled, useTheme } from '@mui/material/styles';

import { useState } from 'react';
// ** MUI Components
import InputForm from '@/components/shared-components/designs/input-form';
import InputPassword from '@/components/shared-components/designs/input-password';
import { useUnLayoutContext } from '@/layouts/UnAuthLayout';
import { customRuleEmail, customRulePassword } from '@/utils/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';

export enum LoginFormEnum {
  password = 'password',
  email = 'email',
}

const FormContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  gap: '24px',
  flexWrap: 'wrap',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '@media (min-width:1024px)': {
    justifyContent: 'center',
  },
}));

export type LoginForm = Record<LoginFormEnum, any>;

const ButtonSubmit = ({
  loading,
  isValid,
}: {
  loading: boolean;
  isValid: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Button
      fullWidth
      size="large"
      variant="contained"
      color="primary"
      sx={{
        textTransform: 'none',
        fontSize: '1.125rem',
        fontWeight: 500,
      }}
      type="submit"
      disabled={!isValid || loading}
    >
      {t('sign_in')}
    </Button>
  );
};

const LoginWrapper = styled(Box)(() => ({
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: 'rgba(33, 43, 54, 0.1) 0px 14px 40px 0px',
  border: '1px solid rgb(211, 216, 222)',
  padding: '40px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '40%',
  marginTop: '80px',
  '@media (min-width:200px)': {
    width: '90%',
  },
  '@media (min-width:400px)': {
    width: '80%',
  },
  '@media (min-width:1024px)': {
    width: '80%',
  },
  '@media (min-width:1200px)': {
    width: '40%',
  },
  '@media (min-width:1400px)': {
    width: '40%',
  },
}));

const LoginComponent = () => {
  const { t } = useTranslation();

  const { login } = useUnLayoutContext();

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formContext = useForm<LoginForm>({
    defaultValues: {},
    resolver: (data, context, options: any) => {
      return yupResolver(
        yup.object().shape({
          password: customRulePassword({ name: t('password') }),
          email: customRuleEmail({ name: t('email') }),
        })
      )(data, context, options);
    },
    mode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = formContext;

  const onSubmit = async (data?: LoginForm) => {
    if (data) {
      login?.(data);
    }
  };

  return (
    <LoginWrapper className="content-center">
      <Typography
        style={{
          fontWeight: 500,
          fontSize: theme.spacing(8.5),
        }}
      >
        {t('welcome')}!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 400,
          fontSize: theme.spacing(4),
        }}
      >
        {t('dialog:you_can_sign_in_to_access_with_your_email')}
      </Typography>
      <FormContainer
        id="hook-form"
        component="form"
        onSubmit={handleSubmit?.(onSubmit)}
      >
        <InputForm
          label="Email"
          control={control}
          name={LoginFormEnum.email}
          placeholder="Nhập Email"
          required
          sx={{
            '.MuiInputBase-root': {
              height: '40px',
            },
          }}
          errorMessage={errors?.email?.message as string}
        />
        <InputPassword
          control={control}
          label="Mật khẩu"
          name={LoginFormEnum.password}
          errorMessage={errors?.password?.message as string}
          required
          sx={{
            '.MuiInputBase-root': {
              height: '40px',
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{
                width: '40px',
                '&.Mui-checked': {
                  color: '#FFC20E',
                },
              }}
            />
          }
          label={t('common:remember_login_status')}
        />
        <ButtonSubmit loading={isLoading} isValid={isValid} />
      </FormContainer>
    </LoginWrapper>
  );
};

export default LoginComponent;
