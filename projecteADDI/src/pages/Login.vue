<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

      <q-input
        filled
        v-model="username"
        label="Usuari"
        hint="usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="password"
        label="Contrasenya"
        type="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Accedeix al registre<a href="#/Register">Registre</a></p>
          </q-card-section>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
