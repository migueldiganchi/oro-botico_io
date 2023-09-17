<template>
  <div class="recruiter-box small-box">
    <v-icon class="text-h1 my-12 text-dark">mdi-emoticon-cool</v-icon>

    <p class="text-dark mt-6 mb-12 pa-0 text-h6 text-thin">
      <span>
        Me interesa unirme a <b>Oro Bótico</b> para <b>aprender trading</b> de
        manera personalizada con la ayuda de <b>asistentes virtuales</b>. ¡Estoy
        emocionado por comenzar este <b>viaje hacia el éxito financiero</b>!
        Regístrame ahora y comencemos <b>juntos</b>.
      </span>
    </p>

    <div class="mb-9">
      <v-btn
        to="/auth/new"
        large
        rounded
        outlined
        elevation="3"
        class="bg-gold"
      >
        <span>Me anoto!</span>
        <v-icon class="ml-3">mdi-account-plus</v-icon>
      </v-btn>
    </div>

    <div class="mb-9 mx-auto x-small-box">
      <br />
      <small class="text-dark"
        ><b class="text-dark">¡ATENCIÓN!</b> Al darle click a este botón se
        abrirá un formulario de registro a <b>Libertex</b></small
      >
      <div v-if="false">
        <br />
        <br />
        <br />
        <i class="mdi mdi-crown text-gold text-h2 text-shadow" />
        <br />
        <br />
        <br />
        <span class="text-dark"
          >Ya soy parte de <b>Oro Bótico</b>, y me encantaría tener mi propio
          sitio promocional</span
        >
        <br />
        <br />
      </div>
    </div>
  </div>
</template>
