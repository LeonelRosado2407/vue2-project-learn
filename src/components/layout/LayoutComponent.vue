<template>
    <div class="bg-gray-50 w-full h-[100vh]">
        <NavbarComponent />
        <slot>

        </slot>
    </div>
</template>

<script>
    import NavbarComponent from './NavbarComponent.vue';

    export default {
        name:'LayoutComponent',
        components: {
            NavbarComponent
        }
    }
</script>
