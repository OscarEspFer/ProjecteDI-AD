<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Nom complet"
        />

      <q-input
        filled
        v-model="dni"
        label="DNI"
       />

       <q-input
        filled
        v-model="username"
        label="Usuari"
      />

      <q-input
        filled
        v-model="password"
        label="Contrasenya"
        type="password"
      />
      <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width" label="Registra't" />
          </q-card-actions>
    </q-form>

  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      dni: '',
      username: '',
      password: ''
    }
  }
}
</script>
