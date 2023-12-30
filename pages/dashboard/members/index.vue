<template>
  <page
    name="users"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <!-- EMPTY USER LIST -->
    <div class="text-center mb-15">
      <v-btn
        v-if="true"
        rounded
        class="pl-2 green"
        color="white"
        @click="startInvitation"
      >
        <span>
          <v-icon>mdi-plus</v-icon>
          <span class="ml-2" style="position: relative; top: 1.8px"
            >Nueva invitación</span
          >
        </span>
      </v-btn>
    </div>

    <!-- USER LIST -->
    <member-list
      :members="members"
      :is-manager="isAuthenticated"
      @onMemberClick="openMemberInfo"
      @onOpenMemberStatusForm="openMemberStatusForm"
      @onLoadMore="loadMembers"
    />

    <!-- MEMBER STATUS FORM DIALOG -->
    <member-status-form-dialog
      :member="member"
      :active="isMemberStatusFormOpened"
      :loading="isWaiting"
      @onClose="closeMemberStatusForm"
    />
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  mounted() {
    this.loadMembers();
  },

  data: () => ({
    members: [],
    member: null,

    isMemberStatusFormOpened: false,

    waitingMessage: "",
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
        text: "Miembros",
        icon: "mdi-account-multiple",
        to: "/dashboard/members",
        disabled: true,
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Usuarios";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Administra a los miembros de DirectOro";
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },
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

    openMemberStatusForm(member) {
      this.isMemberStatusFormOpened = true;
      setTimeout(() => {
        this.member = member;
      }, 99);
    },

    closeMemberStatusForm() {
      this.isMemberStatusFormOpened = false;
      setTimeout(() => {
        this.member = null;
      }, 99);
    },

    loadMembers() {
      this.waitingMessage = "";
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

    startInvitation() {
      this.$notify({
        message: "@todo: Start invitation manager?",
      });
    },
  },
};
</script>
