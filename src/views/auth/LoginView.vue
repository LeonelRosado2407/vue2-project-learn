<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="@/assets/logo.png" alt="logo">
                Vue 2
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Iniciar Sesión
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="IniciarSesion">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
                                Electrónico</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="example@gmail.com" required="" v-model="email">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" v-model="password">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start ">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="hover:cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""
                                        v-model="remmeber" @checked="remmeber"
                                    >
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300 hover:cursor-pointer">Remember me</label>
                                </div>
                            </div>
                            <a href="#"
                                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot
                                password?</a>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign in
                        </button>
                        <div v-if="errors.length > 0">
                            <div v-for="error in errors" :key="error" class="text-red-500 text-sm font-medium">{{error}}</div>
                        </div>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            No tienes una cuenta aún? 
                            <RouterLink to="/auth/register"
                                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Registrate
                            </RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { Loggin } from '@/api/auth';
import { UpdateAuth,SaveUserData,UserLogged } from '@/stores/userStore';
import { RouterLink } from 'vue-router';
export default {
    name: 'LoginView',
    components: {
        RouterLink
    },
    data() {
        return {
            email: '',
            password: '',
            errors : [],
            remmeber: false
        }
    },
    methods: {
        async IniciarSesion() {
            try {
                const response = await Loggin(this.email, this.password);
                console.log(this.remmeber);
                

                if (response && response.status == 200) {
                    //guardamos la info del usuario y su 
                    UpdateAuth(true)
                    SaveUserData(response.data?.usuario,response.data?.rol)
                    //agregamos la coockie access_token dependiendo de si el usuario quiere recordar la sesión

                    if(this.remmeber)
                        this.$cookies.set('access_token', response.data.access_token, 60 * 60 * 24 * 7);
                    else{
                        this.$cookies.set('access_token', response.data.access_token);
                    }

                    //si todo salió bien redireccionamos al home
                    this.$router.push({ name: 'home' });
                }else{
                    this.errors = response.data;
                }

            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        if (UserLogged) {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>

<style lang="scss" scoped></style>