<template>
  <main class="sign-up">
    <div class="sign-up__container">
      <div class="sign-up__content">
        <header class="sign-up__header">
          <h1 class="sign-up__title">Registro</h1>
          <p class="sign-up__descr">Bem-vindo, por favor cadastre sua conta.</p>
        </header>
        <form class="sign-up__form form" @submit.prevent="onSubmit">
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <Lvinput
                  type="text"
                  v-model="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  bottom-bar
                />
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <Lvinput
                  type="text"
                  v-model="email"
                  label="Email"
                  placeholder="Digite seu email"
                  bottom-bar
                />
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <Lvinput
                  id="password"
                  :type="!showPassword ? 'password' : 'text'"
                  v-model="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  bottom-bar
                />
                <i
                  class="light-icon-eye"
                  @click="showPassword = !showPassword"
                ></i>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="input">
              <div class="input__container">
                <Lvinput
                  id="password"
                  :type="!showConfirmPassword ? 'password' : 'text'"
                  v-model="confirm_password"
                  label="Repita sua senha"
                  placeholder="Digite novamente sua senha"
                  bottom-bar
                />
                <i
                  class="light-icon-eye"
                  @click="showConfirmPassword = !showConfirmPassword"
                ></i>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="component component--primary form__button">
              <Lvbutton class="btn" type="submit" size="md" :outlined="false">
                Registrar-se
              </Lvbutton>
            </div>
          </div>
          <div class="form__row sign-up__sign">
            Já tem uma conta? &nbsp;<a
              class="link"
              href.prevent=""
              @click="redirect"
              >Entrar.</a
            >
          </div>
          <div class="form__row sign-up__terms">
            <a class="link" href.prevent=""
              >Termo de uso. Política de Privacidade</a
            >
          </div>
        </form>
      </div>
      <div class="sign-up__image">
        <svg
          class="chart"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 800 960"
        >
          <defs>
            <linearGradient
              id="a"
              y1="1"
              x2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#5c6ccd"></stop>
              <stop offset="1" stop-color="#5753b5"></stop>
            </linearGradient>
            <linearGradient
              id="c"
              x1="0.5"
              x2="0.5"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#a7a7ff"></stop>
              <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
            </linearGradient>
            <linearGradient
              id="e"
              x1="0.5"
              x2="0.5"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#54d8ff"></stop>
              <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <g class="b" transform="translate(25 -58)">
            <g class="c" transform="translate(-585.529 331.726)">
              <path
                class="d"
                d="M330,764.877V546.706s308.5,143.1,555,152.089c266.539-8.71,312.693-69.952,520.308-152.089,177.416-68.461,354.346-87.251,524.168-82.413s317.013,78.793,517.612,86.372c353.879-30.534,534.429-184.911,558.338-249.388v544.74L330,846.259Z"
                transform="translate(-317.723 -288.325)"
              ></path>
              <path
                class="e"
                d="M313,493.785S619.512,640.3,861.863,643.452s335.438-75.606,521.062-149.472,362.09-86.472,524.554-83.989,320.4,79.889,520.019,84,522.561-133.8,558.472-248.748"
                transform="translate(-298.268 -234.833)"
              ></path>
              <g class="f" transform="translate(1072.897 247.907)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
              <g class="f" transform="translate(718.407 383.633)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
            </g>
            <g class="c" transform="translate(-712.529 564.726)">
              <path
                class="d"
                d="M330,764.877V546.706s308.5,143.1,555,152.089c266.539-8.71,312.693-69.952,520.308-152.089,177.416-68.461,354.346-87.251,524.168-82.413s317.013,78.793,517.612,86.372c353.879-30.534,534.429-184.911,558.338-249.388v544.74L330,846.259Z"
                transform="translate(-317.723 -288.325)"
              ></path>
              <path
                class="e"
                d="M313,493.785S619.512,640.3,861.863,643.452s335.438-75.606,521.062-149.472,362.09-86.472,524.554-83.989,320.4,79.889,520.019,84,522.561-133.8,558.472-248.748"
                transform="translate(-298.268 -234.833)"
              ></path>
              <g class="f" transform="translate(1072.897 247.907)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
            </g>
            <g class="c" transform="translate(-743.926 354.582)">
              <path
                class="g"
                d="M330,687.576V354.422S631.107,685.647,878.452,698.112c275.977-2.807,278.239-171.952,520.751-264.548,203.024-72.706,357.942,125.622,527.763,130.459s287.023-135.926,518.71-145.705c300.179,14.727,541.051,202.792,559.742,212.9V768.716L330,768.958Z"
                transform="translate(-313.715 -344.568)"
              ></path>
              <path
                class="h"
                d="M312.953,279.164S623.431,616.493,866.082,619.648s325.629-198.754,520.459-266.824,363.846,129.84,526.511,132.324,318.406-148.686,518.271-144.577S2859.7,459.03,2986.03,549.234"
                transform="translate(-298.327 -266.489)"
              ></path>
              <g class="i" transform="translate(2114.927 61.363)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
              <g class="i" transform="translate(1155.767 60.537)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
            </g>
            <g class="c" transform="translate(-1046.649 464.919)">
              <path
                class="g"
                d="M330,687.576V354.422S631.107,685.647,878.452,698.112c275.977-2.807,278.239-171.952,520.751-264.548,203.024-72.706,357.942,125.622,527.763,130.459s287.023-135.926,518.71-145.705c300.179,14.727,541.051,202.792,559.742,212.9V768.716L330,768.958Z"
                transform="translate(-314.715 -344.568)"
              ></path>
              <path
                class="h"
                d="M312.953,279.164S623.431,616.493,866.082,619.648s325.629-198.754,520.459-266.824,363.846,129.84,526.511,132.324,318.406-148.686,518.271-144.577S2859.7,459.03,2986.03,549.234"
                transform="translate(-298.327 -266.489)"
              ></path>
              <g class="i" transform="translate(1701.637 192.18)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
              <g class="i" transform="translate(1073.43 73.636)">
                <circle class="j" cx="12.259" cy="12.259" r="12.259"></circle>
                <circle class="k" cx="12.259" cy="12.259" r="11.259"></circle>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from "vue";

import ApiService from "@/services/ApiService";
import { register } from "@/services/index";

import { validateMessage } from "@/utils/validateMessage";
import "light-icons/dist/light-icon.css";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async onSubmit() {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      try {
        const result = await ApiService.post(register.routes.create(), data);
        validateMessage(result, "top left");
        this.login(result.data).then(() => {
          this.$router.push({ name: "dashboard" });
          Vue.notify({
            group: "global",
            type: "success",
            title: "Paint",
            text: "Usuário logado com sucesso",
            position: "top left",
            duration: 5000,
            width: 500,
          });
        });
      } catch (error) {
        validateMessage(error, "top left");
      }
    },
    redirect() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.light-icon-eye {
  position: absolute;
  font-size: 30px;
  top: 31px;
  right: 10px;
  color: var(--placeholder-color);
  cursor: pointer;
}

.lv-input__element {
  color: var(--placeholder-color);
}

.input {
  flex: 1;
  width: 100%;
  transition: width 0.18s ease;
}

.input__container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 40px;
  width: 100%;
}

.input__container.error {
  height: auto;
}

.input__container.error pre {
  padding: 8px 8px 0;
}

.input__label {
  position: absolute;
  padding: 0 8px;
  top: 0;
  color: var(--secondary-text-color);
  cursor: text;
  font-size: 16px;
  transition: top 0.18s linear, font-size 0.18s linear;
}

.input__field {
  background: transparent;
  border: 0 solid var(--input-border-color);
  border-bottom-width: 2px;
  padding: 6px 8px;
  font-size: 16px;
  transition: border 0.28s ease-out;
}

.input__field:required + .input__label:after {
  content: "*";
  color: red;
}

.input__field:focus,
.input__field:not(:placeholder-shown) {
  border-color: var(--input-border-color-focus);
}

.input__field:focus + .input__label,
.input__field:not(:placeholder-shown) + .input__label {
  font-size: 14px;
  top: -16px;
}

.input:hover .input__field:placeholder-shown:not(:focus) {
  border-color: var(--input-border-color-hover);
}

.input-checkbox__field {
  position: absolute;
  height: 18px;
  width: 18px;
  margin: 0;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
}

.input-checkbox__container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-checkbox__label {
  padding: 0 16px;
  color: var(--secondary-text-color);
  cursor: pointer;
  font-size: 16px;
  line-height: 1.25;
}

.input-checkbox__square {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 18px;
  width: 18px;
  border: 1px solid hsl(242, 3%, 78%);
  border-radius: 4px;
  transition: border 0.28s ease-out, box-shadow 0.28s ease-out;
  z-index: 0;
}

.input-checkbox__square::before,
.input-checkbox__square::after {
  content: "";
  display: inline-block;
  width: 2px;
  background: var(--input-border-color);
  border-radius: 2px;
  transition: background 0.28s ease-out;
}

.input-checkbox__square::before {
  height: 4px;
  transform: rotate(-40deg) translate3d(-1.5px, 0, 0);
}

.input-checkbox__square::after {
  height: 8px;
  transform: rotate(40deg);
}

.input-checkbox:hover .input-checkbox__square::before,
.input-checkbox:hover .input-checkbox__square::after {
  background: var(--input-border-color-focus);
}

.input-checkbox__field:focus + .input-checkbox__square,
.input-checkbox__field:checked + .input-checkbox__square {
  border-color: var(--input-border-color-focus);
}

.input-checkbox__field:hover + .input-checkbox__square {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.32);
}

.input-checkbox__field:focus + .input-checkbox__square {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.32);
}

.input-checkbox__field:checked + .input-checkbox__square::before,
.input-checkbox__field:checked + .input-checkbox__square::after {
  background: var(--input-border-color-focus);
}

.btn {
  padding: 16px 56px !important;
}

.component--primary {
  display: grid;
}

.link {
  text-decoration: none;
  color: var(--primary-text-color);
  display: inline-block;
  text-decoration: underline;
  transition: color 0.28s ease-out;
  cursor: pointer;
}

.link:hover {
  color: var(--gradient-color-2);
}

.form {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.form__row {
  margin-bottom: 40px;
}

.form__row--two {
  margin: 0 -16px 0;
}

@media screen and (min-width: 500px) {
  .form__row--two {
    display: flex;
  }
}

.form__inline-input {
  padding: 0 16px;
  margin-bottom: 40px;
}

@media screen and (min-width: 500px) {
  .form__inline-input {
    width: 50%;
    flex: 1 0 auto;
  }
}

.form__button {
  text-align: center;
}

.sign-up {
  height: 100vh;
}

.sign-up__container {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}

.sign-up__image,
.sign-up__content {
  flex: 1;
}

.sign-up__image {
  display: none;
  background-image: linear-gradient(
    210deg,
    var(--gradient-color-1),
    var(--gradient-color-2)
  );
  position: relative;
  overflow: hidden;
}

.sign-up__image svg {
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  position: absolute;
}

@media screen and (min-width: 1000px) {
  .sign-up__image {
    display: block;
  }
}

.sign-up__content {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 14vh 24px 10vh;
  background-color: var(--bg-color);
}

.sign-up__header {
  margin-bottom: 48px;
  text-align: center;
}

.sign-up__title {
  margin-bottom: 16px;
  color: var(--primary-text-color);
}

.sign-up__descr {
  font-size: 1.25rem;
  color: rgba(var(--primary-text-color), 0.6);
}

.sign-up__form {
  width: 100%;
}

.sign-up__sign,
.sign-up__terms {
  text-align: center;
  margin-bottom: 20px;
}

.sign-up__sign {
  margin-top: -8px;
}

.sign-up__terms {
  margin-top: 80px;
}

.chart .a {
  fill: url(#a);
}

.chart .b {
  clip-path: url(#b);
}

.chart .c {
  opacity: 0.201;
}

.chart .d,
.chart .g {
  opacity: 0.7;
}

.chart .d {
  fill: url(#c);
}

.chart .e,
.chart .h,
.chart .k {
  fill: none;
}

.chart .e {
  stroke: #a3a0fb;
  stroke-width: 2px;
}

.chart .f,
.chart .i {
  fill: #fff;
}

.chart .f {
  stroke: #a4a1fb;
}

.chart .g {
  fill: url(#e);
}

.chart .h {
  stroke: #54d8ff;
  stroke-width: 2px;
}

.chart .i {
  stroke: #55d8fe;
  stroke-width: 2px;
}

.chart .j {
  stroke: none;
}
</style>
