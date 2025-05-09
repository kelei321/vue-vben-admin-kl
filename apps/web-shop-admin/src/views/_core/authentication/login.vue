<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, reactive, ref } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { captchaApi } from '#/api';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const captchaData = reactive({
  captcha: '',
  key: '',
  loading: false,
});
const loading = ref(false);

async function loadCaptcha() {
  try {
    loading.value = true;
    const res = await captchaApi();
    captchaData.captcha = res.code;
    captchaData.key = res.key;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadCaptcha();
});
const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      defaultValue: 'admin',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'account',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      defaultValue: '123456',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'pwd',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputCaptcha',
      componentProps: {
        captcha: captchaData.captcha,
        loading: captchaData.loading,
        class: 'focus:border-primary',
        onCaptchaClick: loadCaptcha,
        placeholder: $t('authentication.code'),
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.verifyRequiredTip') }),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="
      (values) => authStore.authLogin({ ...values, key: captchaData.key })
    "
  />
</template>
