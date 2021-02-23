<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Qualificacions APP
        </q-toolbar-title>

        <div>{{ dataValencia }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'LogIn',
    caption: 'login.dev',
    icon: 'login',
    link: '#/Login'
  },
  {
    title: 'Abouts',
    caption: 'about.dev',
    icon: 'info',
    link: '#/About'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    dataValencia () {
      const timeStamp = new Date(Date.now())
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return timeStamp.toLocaleDateString('ca-ES', options)
    }
  }
}
</script>
