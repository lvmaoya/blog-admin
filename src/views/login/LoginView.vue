<template>
  <div class="login">
    <div class="login-content" v-loading="loading">
      <div class="picture">
      </div>
      <div class="login-form">
        <h3 class="title">Welcome back!</h3>
        <span class="sub-title">Please enter your details</span>
        <form>
          <div>
            <input type="text" placeholder="" v-model="formData.username">
            <div class="placeholder" data-placeholder="Email"></div>
          </div>
          <div>
            <input :type="isPasswordVisible ? 'password' : 'text'" placeholder="" v-model="formData.password">
            <div class="placeholder" data-placeholder="Password">
              <svg t="1735746413847" @click="isPasswordVisible = !isPasswordVisible" v-if="isPasswordVisible"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1525" width="200"
                height="200">
                <path
                  d="M944.88154297 325.83235676c-18.43242187-15.78515625-46.17949219-13.640625-61.96464844 4.79003907C788.48632813 440.88997395 653.29296875 504.12727864 512 504.12727864c-141.29296875 0-276.48632813-63.23730469-370.91601563-173.49609375-15.78515625-18.43066406-43.53222656-20.58398438-61.96289062-4.79003906-18.43066406 15.78515625-20.58398438 43.53222656-4.79003906 61.96289063 36.72070313 42.87304688 78.33691406 79.63769531 124.28613281 109.88085937L130.2734375 616.04720052c-12.13769531 21.0234375-4.93066406 47.89160156 16.08398438 60.02929687a43.69482422 43.69482422 0 0 0 21.92871093 5.89746094c15.1875 0 29.96191406-7.88378906 38.10058594-21.98144531l69.09082031-119.671875c32.50195313 14.94140625 65.93554688 26.65722656 100.125 35.14746093l-21.92871093 124.36523438c-4.21875001 23.90625001 11.7421875 46.69628906 35.6484375 50.90625001 2.58398438 0.45703125 5.15039063 0.67675781 7.68164062 0.6767578 20.92675781 0 39.46289063-15.00292969 43.22460938-36.32519531l22.078125-125.21777344c16.43554688 1.42382813 33.00292969 2.14453125 49.69335937 2.14453125 16.68164063 0 33.2578125-0.72070313 49.69335938-2.14453125l22.078125 125.21777344c3.76171875 21.32226563 22.29785156 36.32519531 43.22460937 36.32519531 2.53125001 0 5.09765625-0.21972656 7.68164063-0.6767578 23.89746094-4.20996094 39.85839844-27.00878906 35.64843749-50.90625001l-21.92871093-124.36523438c34.18945313-8.48144531 67.62304688-20.20605469 100.125-35.14746093l69.09082031 119.671875c8.13867188 14.09765625 22.91308594 21.98144531 38.10058594 21.98144531 7.453125 0 15.01171875-1.8984375 21.92871093-5.89746094 21.0234375-12.13769531 28.22167969-39.01464844 16.08398438-60.02929687l-68.33496094-118.37109375c45.94921875-30.24316406 87.56542969-67.0078125 124.28876953-109.88085938 15.78515625-18.43066406 13.640625-46.17773438-4.79882812-61.96289061z"
                  fill="#000000" p-id="1526"></path>
              </svg>
              <svg t="1735746831902" @click="isPasswordVisible = !isPasswordVisible" v-else viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1833" width="200" height="200">
                <path d="M640 512a128 128 0 1 1-256 0 128 128 0 0 1 256 0z" fill="#000000" p-id="1834"></path>
                <path
                  d="M934.144 492.928C842.069333 308.736 678.570667 213.333333 512 213.333333c-166.528 0-330.069333 95.402667-422.144 279.594667a42.666667 42.666667 0 0 0 0 38.144C181.930667 715.264 345.429333 810.666667 512 810.666667c166.528 0 330.069333-95.402667 422.144-279.594667a42.666667 42.666667 0 0 0 0-38.144zM512 725.333333c-126.677333 0-256.085333-69.12-335.786667-213.333333C255.914667 367.786667 385.28 298.666667 512 298.666667c126.677333 0 256.085333 69.12 335.786667 213.333333-79.701333 144.213333-209.109333 213.333333-335.786667 213.333333z"
                  fill="#000000" p-id="1835"></path>
              </svg>
            </div>
          </div>
          <div class="captcha">
            <input type="text" placeholder="" maxlength="4" v-model="formData.captcha" @keypress.enter="submitForm">
            <div class="placeholder" data-placeholder="Captcha"></div>
            <div>
              <img :src="authCodeUrl" @click="getCodeData">
            </div>
          </div>
        </form>
        <div class="button-group">
          <button type="submit" @click="submitForm">Log in</button>
          <button type="submit">Log in with Wechat</button>
        </div>
        <div class="visitor">
          <span>Don't have an account? </span>
          <span>Visitor</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, type UserLoginParams } from "@/service/login";
import { onMounted, reactive, ref } from "vue";
import cache from "@/utils/cache";
import { useRouter, useRoute } from "vue-router";
import { BASE_URL } from "@/service/request/config";
import axios, { AxiosError } from 'axios';
import Message from '@/components/message/index';

const router = useRouter();
const route = useRoute();
let formData = reactive<UserLoginParams>({
  username: "",
  password: "",
  captcha: "",
});
const isPasswordVisible = ref(false)

let authCodeUrl = ref("");

// 获取登陆验证码
const getCodeData = async () => {
  const response = await axios.get(BASE_URL + "/captcha", {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'image/png',
      'access-control-allow-credentials': true
    }
  });
  const base64 = btoa(
    new Uint8Array(response.data)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  authCodeUrl.value = `data:image/png;base64,${base64}`;
};
const loading = ref(false)
// 提交登录
const submitForm = async () => {
  loading.value = true;
  try {

    const loginRes = await login(formData);
    const token = loginRes.token;
    cache.setCache("token", token);
    cache.setCache("user", loginRes.user);
    let loginSuccessUrl = (route.query.redirect as string) || "/console/home";
    router.replace({
      path: loginSuccessUrl,
    });
    Message.service({
      type: 'success',
      text: "登录成功",
      duration: 3000
    })
  } catch (error: any) {
    Message.service({
      type: 'error',
      text: error.message,
      duration: 3000
    })
    console.error(error);
  } finally {
    loading.value = false;
  }
};
// 游客登录
const visitorLogin = () => {
  cache.setCache("_token", "VISITORLOGIN");
  router.replace({
    path: "/main/home",
  });
};

onMounted(() => {
  getCodeData();
});

</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-bg-color);

  .login-content {
    width: 800px;
    height: 580px;
    display: flex;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    // box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
    overflow: hidden;
    background-color: #e9e9e9;
    padding: 6px;
    box-sizing: border-box;

    .picture {
      width: 70%;
      height: 100%;
    }

    .login-form {
      width: 340px;
      height: 100%;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 30px 30px 30px;
      box-sizing: border-box;
      background-color: white;
      border-radius: 10px;

      .title {
        font-size: 22px;
        margin: 10px 0;
        font-weight: 600;
      }

      .sub-title {
        font-size: 12px;
        color: #999;
        text-align: center;
      }

      form {
        margin: 60px 0 50px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;


        &>div {
          position: relative;

          &:nth-child(2n) {
            .placeholder svg {
              width: 15px;
              padding: 0 10px;
              height: 100%;
              position: absolute;
              right: 0;
              pointer-events: all;
              cursor: pointer;
              z-index: 2;
            }
          }

          input {
            width: 100%;
            height: 30px;
            border: none;
            box-sizing: border-box;
            border-bottom: 1px solid #333;
            padding: 0px 35px 0px 0px;
            fill: none;

            &:focus {
              border: none;
              border-bottom: 1px solid var(--primary-color);
              outline: none;
            }
          }

          input:focus+.placeholder::before {
            transform: scale(0.75) translateY(-30px);
            color: var(--primary-color);
          }

          input:not(:placeholder-shown)+.placeholder::before {
            transform: scale(0.75) translateY(-30px);
          }

          .placeholder {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
            pointer-events: none;

            &::before {
              content: attr(data-placeholder);
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              display: flex;
              color: #666;
              align-items: center;
              transform: scale(1);
              transform-origin: left center;
              transition: all 0.15s linear;
            }
          }
        }

        .captcha {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;

          input {
            width: 40%;
          }

          &>div {
            width: 60%;

            img {
              width: 100%;
              height: 30px;
              display: block;
            }
          }
        }
      }

      .button-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;

        button {
          background-color: red;
          border: none;
          height: 35px;
          border-radius: 40px;
          font-weight: 600;
          font-size: 12px;
          transition: all 0.3s;

          &:first-child {
            background-color: black;
            color: white;
          }

          &:last-child {
            background-color: #f3f3f3;
          }

          &:active {
            transform: scale(0.98);
          }
        }
      }

      .visitor {
        margin-top: auto;
        font-size: 12px;
        color: #999;

        span {
          &:last-child {
            color: black;
          }
        }
      }
    }
  }
}
</style>
