<template>
  <page
    name="about"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="box mx-auto">
      <!-- Team Section: Title -->
      <v-row class="mt-12">
        <v-col cols="12">
          <h3 class="mb-9 text-center text-thin">
            Conoce al <b>Equipo</b> responsable de<br /><b
              >construir Oro Bótico</b
            >
          </h3>
        </v-col>
      </v-row>

      <!-- Team Section: Body -->
      <v-row justify="center" class="mb-9">
        <v-col
          cols="12"
          sm="6"
          md="6"
          class="text-center"
          v-for="member in teamMembers"
          :key="member.name"
        >
          <v-avatar size="120" class="mb-4 elevation-4">
            <img
              :src="getPictureUrl(member)"
              :alt="member.name"
              style="border-radius: 50%"
            />
          </v-avatar>
          <h3 class="text-h6 mb-2">
            <b>{{ member.name }}</b>
          </h3>
          <p class="grey--text text--darken-3">
            {{ member.role }}
          </p>
        </v-col>
      </v-row>

      <!-- Hero Section -->
      <v-row style="font-size: 19.9px">
        <v-col>
          <div class="box">
            <h1 class="mb-9">
              <v-icon class="red--text text-h1">mdi-heart</v-icon>
            </h1>

            <p class="mb-9">
              <b>Oro Bótico</b> nace con la necesidad de
              <b>agilizar la inducción al negocio del Trading</b> y se enfoca en
              quienes estén interesados en convertirse rápidamente en dueños de
              <b>su propio negocio de Trading</b>.
            </p>
          </div>
        </v-col>
      </v-row>

      <!-- Mission -->
      <v-row style="font-size: 19.9px">
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-9"><b>Misión</b></h2>
          <p class="mb-9">
            Proveer las <b>herramientas tecnológicas</b> necesarias que permitan
            <b>acelerar sus negocios en el Trading</b> y
            <b>generar ingresos en forma automática</b>.
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-9"><b>Visión</b></h2>
          <p class="text-thin mb-0 pb-0">
            Ayudar a <b>mejorar el rendimiento económico</b> de las personas en
            latino-américa contando con la capacidad de crear productos
            digitales propios basados en <b>Inteligencia Artificial</b> que
            ayuden a nuestros estudiantes a adquirir esta increíble habilidad
            <b>en tiempo record</b>.
          </p>
        </v-col>
      </v-row>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      profiles: [],

      teamMembers: [
        {
          name: "Orfelia Diganchi",
          role: "Co-fundadora y Directora de Logística",
          icon: "mdi-chart-line",
          mediaFileName: "gringa.jpeg",
        },
        {
          name: "Alejandro Orieta",
          role: "Co-fundador y Jefe de Estrategia",
          icon: "mdi-strategy",
          mediaFileName: "ale.png",
        },
        {
          name: "Roberto Perez",
          role: "Co-fundador y Gerente Creativo",
          icon: "mdi-truck-delivery",
          mediaFileName: "rober.jpg",
        },
        {
          name: "Miguel Diganchi",
          role: "Fundador y Director General",
          icon: "mdi-server-network",
          mediaFileName: "mike.jpeg",
        },
      ],

      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "¿Qué es Oro Bótico?",
          disabled: true,
          icon: "mdi-account-multiple-outline",
          to: "/about",
        },
      ],
    };
  },

  computed: {
    pageTitle() {
      return "¿Qué es Oro Bótico?";
    },

    pageDescription() {
      return "<b>Comunidad Virtual dedicada al aprendizaje y perfeccionamiento de Trading</b>";
    },
  },

  methods: {
    getPictureUrl(member) {
      return require(`@/assets/media/team/${member.mediaFileName}`);
    },
  },
};
</script>
