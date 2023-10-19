<template>
  <div class="login-form-wrapper">
    <div class="login-logo">
      <img src="../../../assets/images/logo.png" alt="" />
    </div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ record }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="email"
        :rules="[{ required: true, message: $t('login.form.email.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.email"
          :placeholder="$t('login.form.email.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :rules="[{ required: false, message: $t('login.form.code.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.code"
          :placeholder="$t('login.form.code.placeholder')"
        >
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
      </a-form-item>

      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    email: '', // 演示默认值
    password: '',
    code: 123,
  });
  const userInfo = reactive({
    email: '',
    password: '',
    code: '',
    rememberPassword: true,
  });

  const handleSubmit = async () => {
    if (loading.value) return;
    setLoading(true);
    try {
      const loginData = {
        email: userInfo.email,
        password: userInfo.password,
        code: userInfo.code,
        rememberPassword: userInfo.rememberPassword,
      };
      await userStore.login(loginData);

      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      router.push({
        name: (redirect as string) || 'users',
        query: {
          ...othersQuery,
        },
      });
      console.log('Redirected to:', (redirect as string) || 'users');
      Message.success(t('login.form.login.success'));
      if (loginConfig.value.rememberPassword) {
        // 更新登录配置
        loginConfig.value.email = userInfo.email;
        loginConfig.value.password = userInfo.password;
      }
    } catch (err) {
      console.log(err);
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<script lang="ts">
  export default {
    name: 'login',
  };
</script>

<style lang="less" scoped>
  .login-form-wrapper {
    color: #ffffff;
    align-content: center;
    text-align: center;
    .login-logo {
      img {
        width: 290px;
        align-items: center;
      }
    }
  }
  .login-form {
    color: #ffffff;
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: #ffffff;
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      padding-top: 15px;
      color: #ffffff;
      font-size: 15px;
      line-height: 24px;
      font-weight: 800;
      text-align: center;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
