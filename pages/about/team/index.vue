<template>
  <page
    name="team"
    title="Historias Reales"
    description="Conoce las historias de los fundadores y los partners de Oro Bótico"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="my-9">
      <member-list :members="members" @onMemberClick="openMemberInfo" />
    </div>
  </page>
</template>

<script>
export default {
  async asyncData({ store }) {
    let members = [];
    let errorMessage = "";

    try {
      const membersData = await store.dispatch("getUsers", {
        page: 1,
        pageSize: 3,
        filters: {
          term: "", // @TODO
          country: "", // @TODO
          labels: [], // @TODO
          city: "", // @TODO
        },
      });

      const { users } = membersData;
      members = [...users];
    } catch (error) {
      console.error("[error]", error);
      errorMessage =
        "Ha ocurrido un inconveniente al obtener a los miembros del equipo. Estamos redirigiendo a la página de inicio";
    }

    return {
      members,
      errorMessage,
    };
  },

  mounted() {
    if (this.errorMessage != "") {
      this.$notify({
        color: "red",
        message: errorMessage,
      });

      setTimeout(() => {
        this.$router.push("/");
      }, 3333);
    }
  },

  data() {
    return {
      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "Nosotros",
          icon: "mdi-account-multiple",
          to: "/about",
        },
        {
          text: "Historias",
          disabled: true,
          icon: "mdi-book-open-page-variant",
          to: "/about/team",
        },
      ],
    };
  },
  methods: {
    openMemberInfo(member) {
      const memberInfo = {
        title: member.name,
        subtitle: member.description,
        description: member.bio,
        mediaUrl: member.pictureUrl || this.defaultPictureUrl,
        to: `/members/${member.nickname}`,
        toCaption: "Ver Perfil",
        toIcon: "mdi-robot",
      };

      this.$inform(memberInfo);
    },
  },
};
</script>
