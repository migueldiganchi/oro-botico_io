<template>
  <v-card
    :disabled="isWaiting"
    :elevation="disabled ? '' : '3'"
    dark
    color="dark"
    class="pb-9"
  >
    <div
      class="d-flex black align-center pa-3 pl-6 radius_36 mb-9"
      style="border-bottom: solid 1px #c9c9c936 !important"
    >
      <h4 class="text-light">Información Personal</h4>
      <v-spacer />
      <v-btn
        icon
        elevation="3"
        outlined
        class="bg-dark"
        @click="disabled = !disabled"
      >
        <v-icon v-if="disabled">mdi-pencil</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
    </div>

    <v-form @submit.prevent="send" class="px-6 px-sm-9">
      <div
        :class="{
          'mb-9': !disabled,
        }"
      >
        <!-- Picture Url -->
        <div class="mb-9 text-center">
          <!-- Avatar -->
          <div class="mb-6">
            <v-avatar size="90px">
              <img
                :src="form.pictureUrl ? form.pictureUrl : defaultPictureUrl"
                alt="John"
            /></v-avatar>
          </div>

          <file-uploader
            v-if="!disabled"
            :is-uploading="isWaiting"
            :file="file"
            :disabled="isWaiting"
            @onSelectedFile="uploadFile"
            caption="Subir"
          />

          <p v-if="!disabled" class="ma-0 mt-3 App-xxs-box mx-auto">
            <small>Sube una imagen si deseas cambiar tu foto de perfil</small>
          </p>
        </div>

        <!-- Name input -->
        <div class="mb-6">
          <v-text-field
            v-model="form.name"
            :error="nameErrors.length > 0"
            :disabled="isWaiting || disabled"
            ref="nameInput"
            rounded
            outlined
            color="amber"
            label="Nombre"
            @input="isValid('name')"
          />

          <!-- Name Input Validation -->
          <validation-errors :errors="nameErrors" />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <v-text-field
            v-model="form.phone"
            :error="phoneErrors.length > 0"
            :disabled="isWaiting || disabled"
            rounded
            outlined
            color="amber"
            label="Teléfono / Whatsapp"
            @input="isValid('phone')"
          />

          <!-- Phone Input Validation -->
          <validation-errors :errors="phoneErrors" />
        </div>

        <!-- Location Country -->
        <div class="mb-4">
          <v-select
            v-model="form.locationCountry"
            :items="countries"
            :disabled="isWaiting || disabled"
            item-value="key"
            item-text="name"
            color="amber"
            rounded
            label="País"
            item-color="green darken-5"
            outlined
            @input="selectCountry"
          >
            <template v-slot:selection="{ item }">
              <img
                :src="getFlagUrl(item.flag)"
                :alt="item.name"
                style="max-width: 36px !important"
              /><span v-text="item.name" class="ml-3" />
            </template>
            <template v-slot:item="{ item }">
              <v-img
                :src="getFlagUrl(item.flag)"
                :alt="item.name"
                max-width="36px"
              /><span v-text="item.name" class="ml-3" />
            </template>
          </v-select>

          <!-- Location Country Validation -->
          <validation-errors :errors="locationCountryErrors" />
        </div>

        <!-- Location Province -->
        <div v-if="isProvinceEnabled" class="mb-4">
          <v-select
            v-model="form.locationProvince"
            :items="provinces"
            :disabled="isWaiting || disabled"
            color="amber"
            rounded
            label="Provincia"
            item-color="green darken-5"
            outlined
          />
        </div>

        <!-- Location City -->
        <div class="mb-4">
          <v-autocomplete
            v-model="form.locationCity"
            :items="cities"
            :disabled="isWaiting || disabled || !cities.length"
            item-value="key"
            item-text="name"
            color="amber"
            rounded
            label="Ciudad"
            item-color="green darken-5"
            outlined
            @change="selectCity"
          />

          <!-- Location City Validation -->
          <validation-errors :errors="locationCityErrors" />
        </div>

        <!-- Location Address -->
        <div class="mb-9">
          <v-textarea
            v-model="form.locationAddress"
            :disabled="isWaiting || disabled"
            :error="locationAddressErrors.length > 0"
            rounded
            outlined
            color="amber"
            label="Domicilio (Opcional)"
          />

          <!-- Address Input Validation -->
          <validation-errors :errors="locationAddressErrors" />
        </div>

        <!-- Email input -->
        <div class="mb-9">
          <h3>hello@ciudadbotica.com</h3>

          <p class="pt-6 px-6">
            <small class="text-gold"
              ><b>IMPORTANTE</b>: Si deseas modificar el
              <b>correo electrónico</b> con el que registraste la cuenta, por
              favor escríbenos a
              <a
                href="mailto:hello@ciudadbotica.com?subject=Quiero ser parte de Oro Bótico&body=Me interesa registrarme en el Club de Enseñanza Gratuita de Trading"
                style="text-decoration: none"
                ><b class="text-gold">hello@ciudadbotica.com</b></a
              ></small
            >
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="!disabled" class="text-center">
        <v-btn
          :disabled="isWaiting"
          type="submit"
          rounded
          outlined
          class="pl-2 bg-gold"
          elevation="3"
        >
          <v-icon class="mr-2 google-icon">mdi-check</v-icon>
          <span class="">Guardar</span>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

const nameMinLength = 3;
const nameMaxLength = 33;
const phoneMinLength = 9;
const phoneMaxLength = 300;
const locationAddressMinLength = 3;
const locationAddressMaxLength = 300;

export default {
  beforeMount() {
    this.$bus.$on("finish-user-form", this.finish);
  },
  beforeDestroy() {
    this.$bus.$off("finish-user-form");
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(nameMinLength),
        maxLength: maxLength(nameMaxLength),
      },
      locationCountry: {
        required,
      },
      locationCity: {
        required,
      },
      locationAddress: {
        minLength: minLength(locationAddressMinLength),
        maxLength: maxLength(locationAddressMaxLength),
      },
      phone: {
        required,
        minLength: minLength(phoneMinLength),
        maxLength: maxLength(phoneMaxLength),
      },
    },
  },
  props: {
    user: {
      type: Object,
      default: () => null,
    },
    isWaiting: {
      type: Boolean,
      default: () => false,
    },
    countries: {
      type: Array,
      default: () => [],
    },
    cities: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isProvinceEnabled: false,
      disabled: true,
      file: null,
      formCheckIn: false,
      waitingMessage: "",
      form: {
        pictureUrl: "",
        name: "",
        email: "",
        phone: "",
        locationAddress: "",
        locationCountry: "",
        locationProvince: "",
        locationCity: "",
      },
      nameErrors: [],
      phoneErrors: [],
      locationCountryErrors: [],
      locationCityErrors: [],
      locationAddressErrors: [],
    };
  },
  computed: {
    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },
  },
  watch: {
    user(userValue) {
      if (userValue != null) {
        this.form.pictureUrl = userValue.pictureUrl;
        this.form.name = userValue.name;
        this.form.email = userValue.email;
        this.form.phone = userValue.phone;
        this.form.locationCountry = userValue.locationCountry;
        this.form.locationAddress = userValue.locationAddress;
        this.selectCountry(userValue.locationCountry);
        this.$nextTick(() => {
          this.form.locationCity = userValue.locationCity;
        });
      }
    },
    disabled(isDisabled) {
      if (!isDisabled) {
        setTimeout(() => {
          this.$refs.nameInput.focus();
        }, 111);
      } else {
        this.$emit("onCancel");
      }
    },
  },
  methods: {
    onUpdate(text) {
      this.text = text;
    },

    // Select Location Country
    selectCountry(locationCountry) {
      this.form.locationCountry = locationCountry;
      this.$emit("onSelectedCountry", locationCountry);
    },

    // Select Location City
    selectCity(locationCity) {
      this.form.locationCity = locationCity;
    },

    // Flag URL
    getFlagUrl(flagFileName) {
      return (
        require(`~/assets/media/countries/${flagFileName}`) +
        "?timestamp=" +
        new Date()
      );
    },

    // Media File Uploading
    uploadFile(uploadedData) {
      const { file } = uploadedData;

      this.waitingMessage = "Cargando imagen de perfil...";
      return this.$firebase
        .storage()
        .ref(
          "/eco-files/profiles/" +
            new Date().getTime().toString() +
            "_" +
            file.name
        )
        .put(file, {
          contentType: "image/*",
        })
        .then((fileData) => {
          fileData.task.on(
            "state_changed",
            (snapshot) => {
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              console.error("[Error on uploading file]", error);
            },
            async () => {
              this.form.pictureUrl =
                await fileData.task.snapshot.ref.getDownloadURL();

              this.$notify({
                message: "Subida exitosa!",
                color: "info",
                timeout: 639,
              });
            }
          );
        })
        .catch((error) => {
          this.$notify({
            color: "danger",
            message:
              "Se ha producido un inconveniente al subir la imagen de perfil",
          });
        })
        .finally(() => {
          this.waitingMessage = "";
          this.clearFile();
        });
    },

    // Media File Cleaning
    clearFile() {
      this.file = null;
    },

    // Save User Information
    send() {
      if (!this.formCheckIn) {
        this.formCheckIn = true;
      }

      // Validate form
      if (!this.isValid()) {
        return this.$notify({
          message: "El formulario tiene errores",
          timeout: 1999,
          color: "red",
        });
      }

      this.$emit("onSave", this.form);
    },

    // Check Validation of Fields and General Form
    isValid(field) {
      if (!this.formCheckIn) {
        return true;
      }

      this.nameErrors = [];
      this.locationCountryErrors = [];
      this.locationCityErrors = [];
      this.locationAddressErrors = [];
      this.phoneErrors = [];

      // Name Validation
      if (!field || field === "name") {
        if (!this.$v.form.name.required) {
          this.nameErrors.push({
            key: "required",
            text: "El nombre es necesario",
          });
        }
        if (!this.$v.form.name.minLength) {
          this.nameErrors.push({
            key: "minLength",
            text: `El nombre es demasiado corto (min: ${nameMinLength})`,
          });
        }
        if (!this.$v.form.name.maxLength) {
          this.nameErrors.push({
            key: "maxLength",
            text: `El nombre es demasiado largo (max: ${nameMaxLength})`,
          });
        }
      }

      // Location Country Validation
      if (!field || field === "locationCountry") {
        if (!this.$v.form.locationCountry.required) {
          this.locationCountryErrors.push({
            key: "required",
            text: "El país es necesario",
          });
        }
      }

      // @todo: Location Province Validation

      // Location City Validation
      if (!field || field === "locationCity") {
        if (!this.$v.form.locationCity.required) {
          this.locationCityErrors.push({
            key: "required",
            text: "La ciudad es necesaria",
          });
        }
      }

      // Location Address Validation
      if (!field || field === "locationAddress") {
        if (!this.$v.form.locationAddress.minLength) {
          this.locationAddressErrors.push({
            key: "minLength",
            text: `La dirección es demasiado corta (min: ${locationAddressMinLength})`,
          });
        }
        if (!this.$v.form.name.maxLength) {
          this.locationAddressErrors.push({
            key: "maxLength",
            text: `La dirección es demasiado  larga (max: ${locationAddressMaxLength})`,
          });
        }
      }

      // Phone Validation
      if (!field || field === "phone") {
        if (!this.$v.form.phone.required) {
          this.phoneErrors.push({
            key: "required",
            text: "El teléfono es necesario",
          });
        }
        if (!this.$v.form.phone.minLength) {
          this.phoneErrors.push({
            key: "minLength",
            text: `El teléfono es demasiado corta (min: ${phoneMinLength})`,
          });
        }
        if (!this.$v.form.phone.maxLength) {
          this.phoneErrors.push({
            key: "maxLength",
            text: `Es demasiada información para el teléfono (max: ${phoneMaxLength})`,
          });
        }
      }

      return (
        !this.nameErrors.length &&
        !this.locationCountryErrors.length &&
        !this.locationCityErrors.length &&
        !this.locationAddressErrors.length &&
        !this.phoneErrors.length
      );
    },

    // Finish Edition
    finish() {
      this.formCheckIn = false;
      this.disabled = true;
      this.nameErrors = [];
      this.locationAddressErrors = [];
      this.locationCountryErrors = [];
      this.locationCityErrors = [];
      this.phoneErrors = [];
    },
  },
};
</script>
