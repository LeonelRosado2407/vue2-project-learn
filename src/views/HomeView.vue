<template>
  <LayoutComponent>
    Hola desde el home
  </LayoutComponent>
</template>

<script>
// @ is an alias to /src
import LayoutComponent from '@/components/layout/LayoutComponent.vue';

export default {
  name: 'HomeView',
  components: {
    LayoutComponent
  }
}
</script>
