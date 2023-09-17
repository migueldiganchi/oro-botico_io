<template>
  <v-list three-line>
    <template v-for="(notification, index) in notifications">
      <div class="notification-list-item" :key="index">
        <v-subheader v-if="notification.header" :key="notification.header">{{
          notification.header
        }}</v-subheader>

        <v-list-item :key="notification.title">
          <v-list-item-content>
            <!-- Notification Title -->
            <v-list-item-title>
              <span v-html="notification.title" />
            </v-list-item-title>

            <!-- Notification Subtitle -->
            <v-list-item-subtitle>
              <span v-html="notification.subtitle" />
            </v-list-item-subtitle>

            <!-- Notification Image -->
            <div
              v-if="notification.imageUrl"
              class="text-left notification-list-item_image"
            >
              <h4 class="my-6 text-thin">
                ¡Conoce nuestro
                <b class="text-gold">Diccionario Trading</b>!
              </h4>

              <div class="notification-list-item_actions mt-3 d-flex">
                <v-btn
                  rounded
                  color="white"
                  icon
                  @click.prevent="$emit('onClose')"
                >
                  <v-icon
                    style="text-decoration: none !important"
                    class="text-dark"
                    >mdi-close</v-icon
                  >
                </v-btn>

                <v-btn
                  rounded
                  :href="notification.to"
                  color="bg-dark"
                  target="_blank"
                  class="ml-2"
                >
                  <span class="white--text mr-3"> Ir </span>
                  <v-icon
                    style="text-decoration: none !important"
                    class="white--text"
                    >mdi-arrow-right</v-icon
                  >
                </v-btn>
              </div>

              <p class="mt-6 text-muted">
                <small
                  >Al darle click al botón 'Ir' esta ventana será dirigida a
                  nuestro bot de consulta entrenado con Inteligencia Artificial.
                </small>
              </p>
            </div>

            <!-- Notification Space -->
            <br />
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-divider
        v-if="index < notifications.length - 1"
        :key="`${index}-idx`"
        :inset="true"
      />
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
