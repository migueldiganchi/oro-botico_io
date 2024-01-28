<template>
  <page
    name="settings"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="mx-auto">
      <!-- PERSONAL INFORMATION -->
      <v-row class="pa-0 ma-0" justify="center">
        <!-- MEMBER FOR INFORMATION -->
        <v-col cols="12" md="6" class="pa-0 pr-sm-3 ma-0 pb-9">
          <member-form
            :user="authUser"
            :is-waiting="isWaiting"
            :countries="countries"
            :cities="cities"
            @onSave="saveAuthUser"
          />
        </v-col>

        <!-- BUSINESS INFORMATION -->
        <v-col v-if="false" cols="12" md="6" class="pa-0 pl-sm-3 ma-0">
          <member-business-form
            :user="authUser"
            :is-waiting="isWaiting"
            @onSave="saveAuthUser"
          />
        </v-col>
      </v-row>
    </div>
  </page>
</template>

<script>
import countriesData from "@/data/countries-data";
import citiesData from "@/data/cities-data";

export default {
  middleware: ["auth"],

  mounted() {
    if (!this.authenticatedUser) {
      this.loadAuthUser();
    }
  },

  data: () => ({
    waitingMessage: "",
    authUser: null,
    countries: countriesData,
    cities: citiesData,
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Mi Panel",
        icon: "mdi-gamepad",
        to: "/dashboard",
      },
      {
        text: "Mi Cuenta",
        icon: "mdi-account-check",
        to: "/dashboard/settings",
        disabled: true,
      },
    ],
  }),

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isSuperAuthenticated() {
      return this.$store.getters.isSuperAuthenticated;
    },

    authenticatedUser() {
      return this.$store.authenticatedUser;
    },

    authenticatedToken() {
      return this.$store.getters.token;
    },

    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Mi Cuenta";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Administra información de tu cuenta";
    },
  },

  methods: {
    loadAuthUser() {
      this.waitingMessage = "Cargando información...";

      return this.$store
        .dispatch("getAuthenticatedUser", this.authenticatedToken)
        .then((authUser) => {
          this.authUser = { ...authUser };
        })
        .catch((error) => {
          console.error("[error]", error);
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401
              ? "Necesita autorización"
              : errorStatus == 403
              ? "Las credenciales para ver esta información son incorrectas"
              : "Ha ocurrido un inconveniente al cargar los datos del usuario";

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

    saveAuthUser(userDataToSave) {
      const token = this.authenticatedToken;

      if (
        userDataToSave.pictureUrl &&
        userDataToSave.pictureUrl != this.authUser.pictureUrl
      ) {
        this.authUser.pictureUrl = userDataToSave.pictureUrl;
      }

      if (userDataToSave.name && userDataToSave.name != this.authUser.name) {
        this.authUser.name = userDataToSave.name;
      }

      if (
        userDataToSave.description &&
        userDataToSave.description != this.authUser.description
      ) {
        this.authUser.description = userDataToSave.description;
      }

      if (
        userDataToSave.locationCountry &&
        userDataToSave.locationCountry != this.authUser.locationCountry
      ) {
        this.authUser.locationCountry = userDataToSave.locationCountry;
      }

      if (
        userDataToSave.locationCity &&
        userDataToSave.locationCity != this.authUser.locationCity
      ) {
        this.authUser.locationCity = userDataToSave.locationCity;
      }

      if (
        userDataToSave.locationAddress &&
        userDataToSave.locationAddress != this.authUser.locationAddress
      ) {
        this.authUser.locationAddress = userDataToSave.locationAddress;
      }

      if (userDataToSave.phone && userDataToSave.phone != this.authUser.phone) {
        this.authUser.phone = userDataToSave.phone;
      }

      if (
        userDataToSave.paymentDetails &&
        userDataToSave.paymentDetails != this.authUser.paymentDetails
      ) {
        this.authUser.paymentDetails = userDataToSave.paymentDetails;
      }

      const {
        pictureUrl,
        name,
        description,
        locationCountry,
        locationCity,
        locationAddress,
        phone,
        paymentDetails,
      } = this.authUser;

      const authUserToSave = {
        pictureUrl,
        name,
        description,
        locationCountry,
        locationCity,
        locationAddress,
        phone,
        paymentDetails,
      };

      this.waitingMessage = "Guardando información del usuario";
      return this.$store
        .dispatch("saveAuthenticatedUser", {
          userToSave: authUserToSave,
          token,
        })
        .then(() => {
          this.$bus.$emit("finish-user-form");
          this.$bus.$emit("finish-payment-details-form");

          this.$notify({
            message: "El usuario se ha guardado correctamente",
            color: "success",
          });
        })
        .catch((error) => {
          console.error("[error]", error);
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401
              ? "Necesita autorización para ingresar"
              : errorStatus == 403
              ? "Las credenciales para ingresar no son correctas"
              : "Ha ocurrido un inconveniente al guardar los datos del usuario";

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
          });
        })
        .finally(() => {
          this.waitingMessage = "";
          this.loadAuthUser();
        });
    },
  },
};
</script>
