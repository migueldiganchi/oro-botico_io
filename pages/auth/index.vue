<template>
  <page
    :title="pageTitle"
    :description="pageDescription"
    name="auth"
    icon="mdi-key"
  >
    <div class="App-xs-box mx-auto pa-6 mb-9">
      <signin-form @onAuth="sendCredentials" :is-waiting="isWaiting" />
    </div>

    <div class="text-center text-h7 mb-0 text-dark">
      <div><h4>¿No tienes cuenta?</h4></div>

      <p class="App-container App-xxs-box my-9 mx-auto text-dark">
        Si no tienes las credenciales de acceso, crea una cuenta
      </p>

      <nuxt-link to="/auth/new" class="text-dark">
        <b>Crear una cuenta</b>
      </nuxt-link>
    </div>
  </page>
</template>

<script>
export default {
  name: "Auth",
  mounted() {
    if (this.isAuthenticated) {
      this.$bus.$emit("notify", {
        message: "Usuario conectado",
      });

      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 999);
    }
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "Inicio",
          disabled: false,
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "Iniciar sesión",
          disabled: true,
          icon: "mdi-key",
          to: "/auth",
        },
      ],
      waitingMessage: "",
    };
  },
  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
    pageTitle() {
      return "Inicia Sesión";
    },
    pageDescription() {
      return (
        this.waitingMessage ||
        "Por favor ingresa tus credenciales de acceso y sigue disfrutando de DirectOro"
      );
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    sendCredentials(credentials) {
      this.waitingMessage =
        "Enviando credenciales. Aguarda un momento por favor...";

      return this.$store
        .dispatch("authenticateUser", credentials)
        .then((user) => {
          const { name } = user;

          // Welcome user!
          this.$notify({
            message: `¡Bienvenid@ a DirectOro ${name}!`,
            color: "green",
            timeout: 4500,
          });

          // Go Dashboard
          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 999);
        })
        .catch((error) => {
          this.waitingMessage = "";
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401
              ? `No se encontró el correo electrónico ${credentials.email}`
              : errorStatus == 403
              ? "Las credenciales ingresadas son incorrectas"
              : "Ha ocurrido un error al iniciar la sesión.";

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
          });
        });
    },
  },
};
</script>
