<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="@/assets/logo.png" alt="logo">
                Vue 2
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Regístrate
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="Registrar">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nombre de Usuario
                            </label>
                            <input type="text" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                :class="{'!border-red-500': isUsernameValid}" placeholder="example" required v-model="username">
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Correo Electrónico
                            </label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@gmail.com" required v-model="email">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Contraseña
                            </label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required v-model="password">
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign up
                        </button>
                        <div v-if="errors.length > 0">
                            <div v-for="error in errors" :key="error" class="text-red-500 text-sm font-medium">{{ error }}</div>
                        </div>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Ya tienes una cuenta ?
                            <RouterLink to="/auth/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                Iniciar Sesión
                            </RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Register } from '@/api/auth';
import { SaveUserData, UpdateAuth, UserLogged } from '@/stores/userStore';
import { RouterLink } from 'vue-router';

export default {
    name: 'RegisterView',
    data() {
        return {
            email: '',
            password: '',
            username: '',
            errors: [],
        };
    },
    components: {
        RouterLink
    },
    methods: {
        async Registrar() {
            try {
                this.validateForm();
                const response = await Register({ email: this.email, password: this.password, username: this.username });

                if (response && response.status == 200) {
                    //guardamos la info del usuario y su 
                    UpdateAuth(true)
                    SaveUserData(response.res?.usuario,response.res?.rol)

                    //agregamos la coockie access_token dependiendo de si el usuario quiere recordar la sesión
                    this.$cookies.set('access_token', response.res.access_token, 60 * 60 * 24 * 7);

                    //si todo salió bien redireccionamos al home
                    this.$router.push({ name: 'home' });
                }else{
                    this.errors = response.res;
                }
            } catch (error) {
                this.errors.push('An error occurred while trying to register.');
                console.error(error);
            }
        },
        validateForm() {
            this.errors = [];
            this.validateEmail();
            this.validatePassword();
            this.validateUsername();
        },
        validateEmail() {
            if (!this.email) {
                this.errors.push('Email is required.');
            } else {
                const re = /\S+@\S+\.\S+/;
                if (!re.test(this.email)) {
                    this.errors.push('Email is invalid.');
                }
            }
        },
        validatePassword() {
            if (!this.password) {
                this.errors.push('Password is required.');
            } else if (this.password.length < 6) {
                this.errors.push('Password must be at least 6 characters.');
            }
        },
        validateUsername() {
            if (!this.username) {
                this.errors.push('Username is required.');
            }
        }
    },
    mounted() {
        if (UserLogged) {
            this.$router.push({ name: 'home' });
        }
    },
    computed: {
        isEmailValid() {
            return this.errors.includes('Email is invalid.') || this.errors.includes('Email is required.');
        },
        isPasswordValid() {
            return this.errors.includes('Password must be at least 6 characters.') || this.errors.includes('Password is required.');
        },
        isUsernameValid() {
            return this.errors.includes('Username is required.');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
