<template>
  <v-card :disabled="isWaiting" class="pb-9" :elevation="disabled ? '' : '3'">
    <div class="d-flex bg-tr-white align-center pa-3 pl-6 radius_36 mb-9">
      <h4 class="text-dark">Información Elite</h4>
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
      <!-- Username -->
      <div class="mb-4">
        <v-text-field
          v-model="form.nickname"
          :disabled="isWaiting || disabled"
          ref="nicknameInput"
          rounded
          outlined
          color="amber"
          label="Nickname (Apodo)"
        />

        <!-- Username Validation -->
        <validation-errors :errors="nicknameErrors" />
      </div>

      <div class="mb-9 px-6">
        <h3 class="mb-3">BIO</h3>
        <p class="ma-0 pa-0">
          <small
            >Es lo primero que verán los usuarios en tu perfil o descripción
            como Trader</small
          >
        </p>
      </div>

      <!-- Personal BIO -->
      <div class="mb-9 text-left">
        <Editor v-model="text" :disabled="disabled" />
      </div>

      <!-- partnerUrl -->
      <div class="mb-4">
        <v-text-field
          v-model="form.partnerUrl"
          :disabled="isWaiting || disabled"
          rounded
          outlined
          color="amber"
          label="Link de Afiliado"
        />

        <!-- Partner Url Validation -->
        <validation-errors :errors="partnerUrlErrors" />
      </div>

      <!-- instagramUser -->
      <div class="mb-4">
        <v-text-field
          v-model="form.instagramUser"
          :disabled="isWaiting || disabled"
          rounded
          outlined
          color="amber"
          label="Usuario de Instagram"
        />

        <!-- Partner Url Validation -->
        <validation-errors :errors="instagramUserErrors" />
      </div>

      <!-- wpMessage -->
      <div class="mb-4">
        <v-textarea
          v-model="form.wpMessage"
          :disabled="isWaiting || disabled"
          :error="wpMessageErrors.length > 0"
          rounded
          outlined
          color="amber"
          label="Mensaje de Bienvenida en Whatsapp"
        />

        <!-- Wp Message Validation -->
        <validation-errors :errors="wpMessageErrors" />
      </div>

      <!-- Actions -->
      <div v-if="!disabled" class="text-center mt-9">
        <v-btn
          :disabled="isWaiting"
          type="submit"
          rounded
          outlined
          class="pl-2 bg-gold"
          elevation="3"
        >
          <span>
            <v-icon class="mr-2 google-icon">mdi-check</v-icon>
            <span class="">Guardar</span>
          </span>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { required, url, minLength, maxLength } from "vuelidate/lib/validators";

const nicknameMinLength = 3;
const nicknameMaxLength = 33;
const instagramUserMinLength = 3;
const instagramUserMaxLength = 33;
const wpMessageMinLength = 15;
const wpMessageMaxLength = 300;

export default {
  validations: {
    form: {
      nickname: {
        required,
        minLength: minLength(nicknameMinLength),
        maxLength: maxLength(nicknameMaxLength),
      },
      partnerUrl: {
        required,
        url,
      },
      instagramUser: {
        required,
        minLength: minLength(instagramUserMinLength),
        maxLength: maxLength(instagramUserMaxLength),
      },
      wpMessage: {
        required,
        minLength: minLength(wpMessageMinLength),
        maxLength: maxLength(wpMessageMaxLength),
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
  },

  data() {
    return {
      form: {
        nickname: "",
        bio: "",
        instagramUser: "",
        partnerUrl: "",
        wpMessage: "",
      },
      // Validation Arrays
      text: "",
      nicknameErrors: [],
      partnerUrlErrors: [],
      instagramUserErrors: [],
      wpMessageErrors: [],
      disabled: true,
    };
  },

  watch: {
    user(data) {
      if (data != null) {
        this.form.nickname = data.nickname;
        this.form.bio = data.bio;
        this.form.instagramUser = data.instagramUser;
        this.form.partnerUrl = data.partnerUrl;
        this.form.wpMessage = data.wpMessage;
      }
    },

    disabled(isDisabled) {
      if (!isDisabled) {
        setTimeout(() => {
          this.$refs.nicknameInput.focus();
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
  },
};
</script>
