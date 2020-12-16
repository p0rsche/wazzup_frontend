<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="../assets/img/logo.png"
          alt="Notes app"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ getFormValue("headerText") }}
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        :action="getFormValue('formAction')"
        @submit.prevent="handleAuth"
        method="POST"
      >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="login" class="sr-only">Login</label>
            <input
              id="login"
              name="login"
              type="text"
              v-model.lazy.trim="login"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Login"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model.lazy.trim="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <a
              href=""
              @click.prevent="changeAction()"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {{ getFormValue("questionText") }}
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: lock-closed -->
              <svg
                v-if="!loading"
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- Loading spinner -->
              <svg
                v-else
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ getFormValue("btnText") }}
          </button>
        </div>
      </form>
    </div>
    <Toast v-if="error && error.message" :text="error.message" @close="clearErrMsg()"/>
  </div>
</template>

<script lang="ts">
// TODO extract loading button to separate component, error
import { Component, Prop, Vue } from "vue-property-decorator";
import Toast from '@/components/Toast.vue';

interface ConfigObject {
  [key: string]: string;
}

const loginConfig: ConfigObject = {
  headerText: "Sign in to your account",
  url: "/api/auth/login",
  questionText: "Don't have an account?",
  btnText: "Sign in",
};

const registerConfig: ConfigObject = {
  headerText: "Register new account",
  url: "/api/auth/register",
  questionText: "Already registered?",
  btnText: "Sign up",
};

@Component({
  components: {
    Toast,
  },
  data() {
    return {
      error: null,
      loading: false,
      login: '',
      password: ''
    };
  },
})
export default class LoginForm extends Vue {
  public loading!: boolean;
  public user!: { [key: string]: string };
  public error!: unknown;
  public login!: string;
  public password!: string;


  @Prop() private text!: string;

  getFormValue(name: string): string {
    return this.isLoginPage ? loginConfig[name] : registerConfig[name];
  }

  changeAction(): void {
    const name = this.isLoginPage ? "register" : "login";
    this.$router.push({ name });
  }

  handleAuth() {
    this.loading = true;
    this.clearErrMsg();
    if (this.login && this.password) {
      const action = this.isLoginPage ? "login" : "register";
      this.$store
        .dispatch(action, { login: this.login, password: this.password })
        .then(() => {
          // successfull login
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  clearErrMsg() {
    this.error = null;
  }

  // computed
  get isLoginPage() {
    return this.$route.name === "login";
  }

  get loggedIn() {
    return this.$store.getters.loggedIn;
  }
}
</script>
