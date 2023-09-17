<template>
  <page
    name="auth-new"
    :title="pageTitle"
    :description="pageDescription"
    back-text="Inicio"
    icon="mdi-account-plus"
  >
    <div class="App-xs-box mx-auto pa-6">
      <signup-form @onSave="createUser" :is-waiting="isWaiting" />

      <!-- Recaptcha -->
      <recaptcha
        @error="onRecaptchaError"
        @success="onRecaptchaSuccess"
        @expired="onRecaptchaExpired"
      />
    </div>

    <div class="text-center text-h7 mt-9 mb-0 text-dark">
      <h4>¿Ya tienes cuenta?</h4>

      <p class="App-container App-xxs-box my-9 mx-auto">
        Si tienes las credenciales de acceso, puedes acceder aquí
      </p>

      <nuxt-link to="/auth" class="text-dark">
        <b>Iniciar sesión</b>
      </nuxt-link>
    </div>
  </page>
</template>

<script>
export default {
  name: "New-User",
  async mounted() {
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
      waitingMessage: "",
      breadcrumbItems: [
        {
          text: "Inicio",
          disabled: false,
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "Nuevo usuario",
          disabled: true,
          icon: "mdi-account-plus",
          to: "/auth/new",
        },
      ],
    };
  },
  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
    pageTitle() {
      return "Crea tu cuenta";
    },
    pageDescription() {
      return (
        this.waitingMessage ||
        "Comieza a disfrutar ahora de nuestro Planeta Trading"
      );
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async createUser(newUser) {
      const recaptchaToken = await this.$recaptcha.execute("login");
      console.info("ReCaptcha token:", recaptchaToken);

      this.waitingMessage = "Enviando las nuevas credenciales...";
      return this.$store
        .dispatch("createUser", newUser)
        .then((createdUser) => {
          this.$notify({
            message: `¡Genial ${createdUser.name}! Tu cuenta se ha creado exitosamente!`,
            timeout: 3900,
          });
          setTimeout(() => {
            this.$router.push("/");
            this.$notify({
              message:
                "Por favor revisa tu correo electrónico para verificar la cuenta",
              timeout: 4500,
            });
          }, 4500);
        })
        .catch((error) => {
          console.error("[error]", error);

          // Get Error Status
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          console.error("[errorStatus]", errorStatus);

          // Get Error Message
          const errorMessage =
            errorStatus == 401
              ? `No se encontró el correo electrónico ${credentials.email}`
              : errorStatus == 403
              ? "La contraseña ingresada es incorrecta"
              : errorStatus == 303
              ? "El correo electrónico que intenta dar de alta ya se encuentra registrado"
              : "Ha ocurrido un inconveniente al crear la cuenta.";

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
          });
        })
        .finally(() => {
          this.waitingMessage = "";
        });
    },

    // Recaptcha Handlers
    onRecaptchaError(onRecaptchaErrorParam) {
      console.info("onRecaptchaErrorParam", onRecaptchaErrorParam);
    },

    onRecaptchaSuccess(onRecaptchaSuccessParam) {
      console.info("onRecaptchaSuccessParam", onRecaptchaSuccessParam);
    },

    onRecaptchaExpired(onRecaptchaExpiredParam) {
      console.info("onRecaptchaExpiredParam", onRecaptchaExpiredParam);
    },
  },
};
</script>
