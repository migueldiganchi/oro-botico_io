<template>
  <div class="text-center px-6">
    <!-- DYNAMIC CONTENT -->
    <!-- <div v-if="member">
      <member :member="member" />
    </div> -->

    <!-- FEATURES -->
    <div class="App-features mt-15">
      <h1 class="mb-15 text-h3 pb-9 text-dark">
        <b>¿Qué ofrecemos?</b>
      </h1>

      <v-row
        v-for="(feature, index) in features"
        :key="index"
        align="center"
        justify="center"
        class="App-features-item feature"
      >
        <v-col cols="4" md="3">
          <!-- Icon Holder -->
          <div class="text-center">
            <img
              :src="feature.mediaUrl"
              alt="Vendedor QR"
              class="d-inline-block feature-image"
            />
          </div>
        </v-col>

        <v-col cols="8" md="6">
          <b class="feature-title text-dark d-inline-block mb-3">
            {{ feature.title }}
          </b>
          <p v-if="feature.description" class="feature-description text-dark">
            <span>{{ feature.description }}</span>
          </p>
        </v-col>
      </v-row>
    </div>

    <div class="App-xxs-box pt-12 mt-15 mx-auto text-dark">
      <h3 class="mb-15">COMPARTE ESTE INCREÍBLE CONOCIMIENTO</h3>

      <!-- Sharing Button -->
      <div class="text-center">
        <v-btn
          @click="$bus.$emit('toggle-sharing', '/')"
          class="ml-3 bg-gold pl-3"
          rounded
          elevation="3"
          text
          large
        >
          <v-icon class="mr-2 text-light">mdi-share-variant</v-icon>
          <span class="text-light">Compartir</span>
        </v-btn>
      </div>
    </div>

    <!--PRESENTATION -->
    <v-row class="text-dark mt-15 pt-3" align="center" justify="center">
      <v-col cols="12" lg="7" class="pt-12">
        <div class="video-holder bg-dark elevation elevation-3 pa-3">
          <v-img :lazy-src="mainBackgroundUrl" :src="mainBackgroundUrl">
          </v-img>
        </div>
      </v-col>

      <v-col class="pt-12 px-6">
        <div
          class="text-lg-left text-sm-center text-center mt-0 mx-auto mx-lg-6"
          style="max-width: 540px"
        >
          <h1 class="text-thin">
            <b>Miles de personas están mejorando sus vidas</b> con esta nueva
            <b>explosión tecnológica</b> que les permite
            <b>generar ingresos usando solamente su teléfono móvil</b>.
          </h1>
        </div>
      </v-col>
    </v-row>

    <!-- COMPANIES -->
    <v-row v-if="companies && companies.length" class="mb-6">
      <v-col
        v-for="company in companies"
        :key="company.title"
        :md="company.flex"
        :lg="company.flex"
      >
        <v-card>
          <v-img
            :src="company.mediaUrl"
            class="white--text align-end pa-6"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="330px"
          >
            <v-card-title class="bg-tr-gradient-down app-card-title">
              <div
                class="text-center text-shadow-dark pa-3"
                style="min-width: 100%"
              >
                <span v-text="company.title" class="d-inline-block text-h5" />
              </div>
            </v-card-title>
            <v-card-actions>
              <div class="text-center" style="min-width: 100%">
                <v-btn
                  class="bg-gold"
                  rounded
                  @click.prevent="openInfo(company)"
                  fab
                >
                  <v-icon>mdi-domain</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- MEMBER STORIES -->
    <div v-if="$route.name != 'm-nickname'" class="mt-9">
      <h1 class="mb-12 pt-15 pb-9 text-dark small-box">
        <span><b>¡HAY EQUIPO!</b></span>
      </h1>

      <!-- MEMBER LIST -->
      <member-list :members="members" @onMemberClick="openMemberInfo" />
    </div>

    <!-- MEMBERS PRESENTATION TEXT -->
    <h1
      v-if="$route.name != 'm-nickname'"
      class="my-9 pt-15 text-h6 pb-9 text-dark small-box"
    >
      <span
        ><b
          >Conoce en profundidad a las historias de nuestros fundadores</b
        ></span
      >
    </h1>

    <!-- MEMBERS LINK -->
    <div v-if="$route.name != 'm-nickname'" class="mb-12">
      <v-btn
        to="/about/team"
        large
        rounded
        outlined
        elevation="3"
        class="bg-gold pr-2"
      >
        <span class="mr-2">Conocer más</span>
        <v-icon style="position: relative; top: 1.8px">mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <!-- CASH TITLE -->
    <h1 v-if="false" class="mb-9 mt-12 pt-15 pb-9 text-dark small-box">
      <v-icon class="green--text text-h3 pa-0 text--darken-3 mb-6 d-block"
        >mdi-cash</v-icon
      >
      <span
        ><b
          >Aprovecha ahora este increíble servicio completamente gratis</b
        ></span
      ><v-icon class="green--text text-h3 pa-0 text--darken-3 mt-6 d-block"
        >mdi-cash</v-icon
      >
    </h1>

    <!-- BENEFITS -->
    <v-row v-if="false" class="mb-9 pt-9">
      <v-col
        v-for="benefit in benefits"
        :key="benefit.title"
        md="12"
        sm="12"
        :lg="benefit.flex"
      >
        <v-card class="pt-9 px-6 pb-6 bg-dark text-light">
          <div class="picture is-circular">
            <v-img :src="benefit.mediaUrl" class="is-circular" />
          </div>
          <v-card-title>
            <div class="text-center text-dark" style="min-width: 100%">
              <span class="d-inline-block text-h5">
                <b v-text="benefit.title" />
              </span>
            </div>
          </v-card-title>
          <v-card-actions>
            <div class="text-center" style="min-width: 100%">
              <v-btn
                class="bg-gold"
                rounded
                @click.prevent="openInfo(benefit)"
                elevation="3"
                fab
              >
                <v-icon style="position: relative; top: 1.5px"
                  >mdi-page-next</v-icon
                >
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- PROMOTE -->
    <v-row class="mb-6 mt-12" align="center" justify="center">
      <v-col cols="12" lg="5" order="2" order-lg="1">
        <div class="text-lg-right">
          <h1
            class="text-dark d-inline-block text-thin"
            style="max-width: 540px !important"
          >
            <span
              >Gana <b>en dólares</b> recomendando los
              <b>extraordinarios servicios de Libertex</b> y aumenta tus
              ingresos automatizando los procesos de atención de tu
              negocio.</span
            >
          </h1>
        </div>
      </v-col>
      <v-col cols="12" lg="5" order="1" order-lg="2">
        <div class="icon-holder d-inline-block my-6">
          <img
            :src="socialScienceUrl"
            alt="Tu máquina de generar ingresos"
            class="my-9"
          />
        </div>
      </v-col>
    </v-row>

    <!-- TRADING LEARNING -->
    <v-row align="center" justify="center" class="mt-12 mb-9 pb-12">
      <v-col cols="12" sm="12" md="12" lg="5" class="text-center">
        <div class="icon-holder d-inline-block">
          <img
            :src="moneyMachineUrl"
            alt="Tu máquina de generar ingresos"
            class="my-9"
          />
        </div>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="5">
        <div class="text-lg-left" style="max-width: 450px; margin: auto">
          <h1 class="d-block text-thin text-dark mb-9">
            ¡<b>Aprende Trading</b> obteniendo <b>GRANDES GANANCIAS</b>!
          </h1>
          <h1 class="d-block text-dark text-thin mt-9">
            Convierte a tu celular en una
            <b>MÁQUINA DE GENERAR INGRESOS</b>
          </h1>
        </div>
      </v-col>
    </v-row>

    <!-- RECRUITER -->
    <recruiter class="mb-15 pb-12" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("toggle-digital-show", this.toggleDigitalShow);

    if (this.$route.name != "m-nickname") {
      this.loadMembers();
    }
  },

  destroyed() {
    this.$bus.$off("toggle-digital-show");
  },

  props: {
    member: {
      type: Object,
      default: () => null,
    },
  },

  data() {
    return {
      isDigitalProductOpened: false,
      isInformationDialogOpen: false,

      currentInfo: null,
      waitingMessage: "",
      companies: [], // @todo: Complete Sponsors
      members: [],

      // AI BENEFITS
      benefits: [
        {
          mediaUrl: require("~/assets/media/features/stopwatch.png"),
          title: "Ahorra tiempo",
          as: "Atiende múltiples clientes en simultáneo",
          action: "who-1",
          flex: 4,
          href: "https://ciudadbotica.com",
        },
        {
          mediaUrl: require("~/assets/media/features/transaction.png"),
          title: "Gana dinero",
          as: "Compartiendo productos o servicios a tus contactos",
          action: "who-2",
          flex: 4,
        },
        {
          mediaUrl: require("~/assets/media/features/smartphone.png"),
          title: "Trabaja cómodo",
          as: "Disfruta de la simplicidad de hacer dinero con tu móvil",
          action: "who-3",
          flex: 4,
        },
      ],
    };
  },

  computed: {
    mainBackgroundUrl() {
      return require("~/assets/media/mobile-money.jpg");
    },

    moneyMachineUrl() {
      return require("~/assets/media/smartphone.png");
    },

    socialScienceUrl() {
      return require("~/assets/media/advertising.png");
    },

    features() {
      return [
        // {
        //   key: 18,
        //   mediaUrl:
        //     require("~/assets/media/features/crown.png") + "?" + new Date(),
        //   title: "Servicio Deluxe",
        //   description:
        //     "Tendrás tu propio representante virtual atendiendo preguntas frecuentes de tus posibles clientes",
        // },

        {
          key: 27,
          mediaUrl:
            require("~/assets/media/features/calendar.png") + "?" + new Date(),
          title: "Horarios",
          description:
            "Tu Asistente Virtual proporcionará a tus alumnos horarios de atención y disponibilidad, mejorando la comunicación entre docentes y estudiantes para una experiencia educativa más fluida.",
        },

        {
          key: 1,
          mediaUrl:
            require("~/assets/media/features/brain.png") + "?" + new Date(),
          title: "Mindset",
          description:
            "Tu Ayudante Virtual brindará a tus alumnos consejos clave sobre el Mindset en el trading, fortaleciendo su mentalidad para enfrentar desafíos y lograr el éxito en sus operaciones.",
        },
        {
          key: 2,
          mediaUrl:
            require("~/assets/media/features/trading.png") + "?" + new Date(),
          title: "Señales de negociación",
          description:
            "Tu Asistente Virtual estará listo para guiar a tus alumnos en el análisis y las señales de negociación, proporcionando conocimientos valiosos para sus operaciones.",
        },
        // {
        //   key: 3,
        //   mediaUrl:
        //     require("~/assets/media/features/group-chat.png") +
        //     "?" +
        //     new Date(),
        //   title: "Clases en vivo",
        //   description:
        //     "Clases asistidas con IA podrán dar a tus alumnos la tranquilidad de que siempre estarán recibiendo asistencia",
        // },
      ];
    },

    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },
  },

  methods: {
    loadMembers() {
      this.waitingMessage = "Cargando Usuarios...";
      return this.$store
        .dispatch("getUsers", {
          page: 1,
          pageSize: 3,
          filters: {
            term: "", // @TODO
            country: "", // @TODO
            labels: [], // @TODO
            city: "", // @TODO
          },
        })
        .then((membersData) => {
          const { users: members } = membersData;
          this.members = [...members];
        })
        .catch((error) => {
          console.error("[error]", error);
          this.$notify({
            message: "Ha ocurrido un inconveniente al cargar a los miembros",
            color: "red",
          });
        });
    },

    toggleDigitalShow() {
      this.isDigitalProductOpened = !this.isDigitalProductOpened;
    },

    openInfo(info) {
      this.currentInfo = info;
      this.$inform(this.currentInfo);
    },

    openMemberInfo(member) {
      const memberInfo = {
        title: member.name,
        subtitle: member.description,
        description: member.bio,
        mediaUrl: member.pictureUrl || this.defaultPictureUrl,
        to: `/members/${member._id}`,
        toCaption: "Ver Perfil",
        toIcon: "mdi-robot",
      };

      this.openInfo(memberInfo);
    },

    showInfo(key) {
      let info = null;
      switch (key) {
        case "virtual-assistants":
          info = {
            mediaUrl: require("~/assets/media/ai.png"),
            // as: "U$D 600,00",
            title: "Asistentes Virtuales",
            description:
              "Tenemos la fórmula pre-cargada para que tu empresa tenga éxito. Chatbot conversacional que permite atender en automático",
          };
          break;
        case "digital-products":
          info = {
            mediaUrl: require("~/assets/media/web-dev.png"),
            // as: "U$D 450,00",
            title: "Productos Digitales",
            description:
              "Disfruta de prestigio de tener tu propio sitio web, difundiendo y enseñando a tus estudiantes Trading",
          };
          break;
        default:
          break;
      }

      this.openInfo(info);
    },
  },
};
</script>
