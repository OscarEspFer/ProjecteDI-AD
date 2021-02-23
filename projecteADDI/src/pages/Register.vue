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
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

      <q-input
        filled
        v-model="dni"
        label="DNI"
        lazy-rules
        :rules="[ val => val && val.length > 0 && isValid && val.length <= 9 || 'Please type something']"
       />

       <q-input
        filled
        v-model="username"
        label="Usuari"
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
      <q-input
        filled
        v-model="confirm_password"
        label="Confirmar Contrasenya"
        type="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 && val == password || 'Please type something']"
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
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    isValid () {
      const regExp = new RegExp('[0-9]{8}[A-Z]')
      return regExp.test(this.dni)
    }
  }
}
</script>
