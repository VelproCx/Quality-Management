<template>
  <div class="container">
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
      <div class="footer">
        <p>Ver.0.1</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background-image: url('../../assets/images/login_bg.jpeg');
    .content {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: right;
      margin-right: 200px;
      .content-inner {
        display: flex;
        position: absolute;
        background-color: rgb(30, 41, 59);
        // height: 550px;
        padding: 88px 50px;
        float: right;
        border-radius: 2%;
        align-items: center;
      }
      .footer {
        display: flex;
        position: absolute;
        color: white;
        align-items: center;
        margin-top: 500px;
        margin-right: 187px;
      }
    }
  }
</style>
