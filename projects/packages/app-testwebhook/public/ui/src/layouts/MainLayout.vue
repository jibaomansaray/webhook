<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Webhook Dump</q-toolbar-title>
        </q-toolbar>
      </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    return {}
  }
})
</script>
