<template>
  <v-app
    id="inspire"
    color="white"
    light
    :class="{
      'with-header': $route.name != 'm-nickname',
    }"
  >
    <!-- App Glass -->
    <div class="App-glass" v-if="isGlassOpened" @click="toggleGlass()" />

    <!-- Top bar -->
    <v-app-bar
      v-if="$route.name != 'm-nickname'"
      :flat="isOnTop"
      :class="{
        'flat-fixed': isOnTop,
      }"
      app
      fixed
      color="white"
      light
    >
      <!-- Menu Button -->
      <v-app-bar-nav-icon
        class="mr-0 disabled"
        @click.stop="isDrawerLeftOpen = !isDrawerLeftOpen"
      />

      <!-- Page Title -->
      <v-toolbar-title class="text-link" style="padding-left: 7.2px !important">
        <v-btn
          icon
          dark
          x-small
          fab
          class="bg-gold mr-3 ml-0 mb-1"
          outlined
          @click="betaCommunication"
        >
          <v-icon size="14.5px">mdi-beta</v-icon>
        </v-btn>

        <span
          v-if="$route.name == 'index'"
          @click="isDrawerLeftOpen = !isDrawerLeftOpen"
        >
          <b
            >DIRECT<span class="text-gold d-none d-sm-inline-block"
              >ORO</span
            ></b
          >
        </span>
        <nuxt-link v-else to="/" class="black--text">
          <b
            >DIRECT<span class="text-gold d-none d-sm-inline-block"
              >ORO</span
            ></b
          >
        </nuxt-link>
      </v-toolbar-title>

      <!-- Space Separator -->
      <v-spacer />

      <!-- Authenticated User Icon (Desktop) -->
      <v-btn
        v-if="isAuthenticated"
        :disabled="isWaiting"
        outlined
        rounded
        color="#d1a837"
        class="mr-2 pt-1 pl-3 d-none d-sm-flex"
        elevation="3"
        @click="showAuthUserInfo"
      >
        <v-icon class="mr-2">mdi-account-check</v-icon>
        <span class="pb-1" v-if="authenticatedUser">{{
          authenticatedUser?.name | truncate(9)
        }}</span>
        <span v-else>...</span>
      </v-btn>

      <!-- Authenticated User Icon (Desktop) -->
      <v-btn
        v-if="isAuthenticated"
        :disabled="isWaiting"
        :title="authenticatedUser?.name || 'DirectOro'"
        icon
        light
        fab
        small
        outlined
        color="#d1a837"
        elevation="3"
        class="d-flex mr-1 d-sm-none"
        @click="showAuthUserInfo"
      >
        <v-icon>mdi-account-check</v-icon>
      </v-btn>

      <!-- Login (Desktop) -->
      <v-btn
        v-if="!isAuthenticated && $route.name != 'auth'"
        :disabled="isWaiting"
        to="/auth"
        rounded
        color="white"
        class="mr-2 bg-gold pl-3 d-none d-sm-flex white--text"
        elevation="3"
      >
        <v-icon class="mr-2 white--text">mdi-key</v-icon>
        <span>Entrar</span>
      </v-btn>

      <!-- Login (Mobile) -->
      <v-btn
        v-if="!isAuthenticated && $route.name != 'auth'"
        :disabled="isWaiting"
        icon
        light
        fab
        small
        outlined
        color="white"
        elevation="3"
        class="d-flex mr-1 bg-gold d-sm-none"
        to="/auth"
      >
        <v-icon>mdi-key</v-icon>
      </v-btn>

      <!-- Register (Desktop) -->
      <v-btn
        v-if="!isAuthenticated && $route.name != 'auth-new'"
        :disabled="isWaiting"
        to="/auth/new"
        outlined
        rounded
        color="white"
        class="mx-2 bg-gold pl-3 d-none d-sm-flex"
        elevation="3"
      >
        <v-icon class="mr-2">mdi-account-plus</v-icon>
        <span>Registrar</span>
      </v-btn>

      <!-- Register (Mobile) -->
      <v-btn
        v-if="!isAuthenticated && $route.name != 'auth-new'"
        :disabled="isWaiting"
        icon
        light
        fab
        small
        outlined
        color="white"
        elevation="3"
        class="mx-2 bg-gold d-flex d-sm-none"
        to="/auth/new"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>

      <!-- Help -->
      <v-btn
        v-if="false"
        @click.stop="isDrawerRightOpen = !isDrawerRightOpen"
        icon
        color="#d1a837"
        class="ml-1"
      >
        <v-icon style="font-size: 27.9px">mdi-robot</v-icon>
      </v-btn>

      <!-- Notifications -->
      <v-btn icon color="#d1a837" class="ml-1" @click="toggleNotifications()">
        <v-badge
          v-if="notificationsUnread.length"
          :content="notificationsUnread.length"
          bottom
          left
          offset-x="10"
          offset-y="10"
          color="warning"
        >
          <v-icon style="font-size: 27.9px">mdi-bell</v-icon>
        </v-badge>

        <v-icon v-else style="font-size: 27.9px">mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Notification Snack -->
    <notification-snack :notification="notification" />

    <!-- Left side bar -->
    <v-navigation-drawer v-model="isDrawerLeftOpen" temporary app light>
      <!-- User profile -->
      <div class="v-navigation-drawer_header">
        <span class="text-center d-flex" style="font-size: 18px">
          <v-img
            aspect-ratio="1"
            :src="require('~/assets/media/trading.png')"
            alt="DirectOro"
            class="d-inline-block mr-3"
            height="24.3px"
            width="24.3px"
          />
          <b>DIRECT</b><b class="ml-1 text-gold">ORO</b>
        </span>
      </div>

      <!-- Item list -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :class="{
          'sharer-box bg-dark-gradient py-1': item.separator,
        }"
        @click="handleClick(item)"
        link
        exact
      >
        <template v-if="item.separator">
          <v-list-item-content>
            <h5 class="text-light" v-html="item.separator.title" />
          </v-list-item-content>
        </template>

        <template v-else>
          <v-list-item-icon>
            <v-icon :color="item.color || null">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <small>{{ item.title }}</small>
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-navigation-drawer>

    <!-- Right side bar -->
    <v-navigation-drawer v-model="isDrawerRightOpen" app temporary right light>
      <div class="v-navigation-drawer_header">
        <h5 style="font-size: 18px">
          <!-- Dictionary Icon -->
          <v-icon
            v-if="!isNotificationListOpen"
            style="position: relative; top: -3px"
            class="mr-2"
            color="#d1a837"
            >mdi-robot</v-icon
          >

          <!-- Notifications Icon -->
          <v-icon
            v-if="isNotificationListOpen"
            style="position: relative; top: -3px"
            class="mr-2"
            color="#d1a837"
            >mdi-bell</v-icon
          >

          <!-- Dictionary Title -->
          <span v-if="!isNotificationListOpen">DICCIONARIO</span>

          <!-- Notifications Title -->
          <span v-if="isNotificationListOpen">
            <nuxt-link
              to="/dashboard/notifications"
              class="white--text"
              style="text-decoration: none"
              v-if="isAuthenticated"
              >NOTIFICACIONES</nuxt-link
            >
            <span v-if="!isAuthenticated">NOTIFICACIONES</span>
          </span>
        </h5>
      </div>

      <!-- Bot Sidebar Box: Text presentation -->
      <div class="pa-1 pa-sm-3">
        <bot-sidebar
          v-if="isDrawerRightOpen && !isNotificationListOpen"
          :notifications="botSidebarItems"
        />

        <!-- Notification List -->
        <div v-if="isAuthenticated">
          <notification-list
            v-if="isNotificationListOpen"
            :notifications="notificationsUnread"
            :is-waiting="isWaiting"
            @onShowNotification="showNotification"
          />

          <div v-if="notificationsUnread.length < 1">
            <div class="py-5 text-center text-gold">
              <v-icon size="72px" class="text-gold">mdi-bell</v-icon>
              <p class="mt-5">No se han encontrado notificaciones nuevas</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gold pt-3">
          <v-icon size="72px" class="text-gold mb-6">mdi-bell</v-icon>
          <p>
            Necesitas estar registrado para acceder a las novedades de DirectOro
          </p>
          <!-- <div class="mt-9">
            <v-btn
              @click="isDrawerRightOpen = false"
              outlined
              color="white"
              rounded
              class="pl-2"
            >
              <v-icon>mdi-thumb-up</v-icon>
              <span class="ml-2 text-gold">Entiendo</span>
            </v-btn>
          </div> -->
        </div>
      </div>

      <!-- Notification List -->
    </v-navigation-drawer>

    <!-- Main Gallery -->
    <div
      v-if="$route.name === 'index' || $route.name === 'm-nickname'"
      class="gallery-holder"
    >
      <gallery :items="carouselList" :is-open="!isPresentationOpen" />

      <div
        class="presentation text-center pa-lg-16"
        :class="{ hidden: !isPresentationOpen }"
      >
        <!-- Main Presentation -->
        <div class="pt-6">
          <div v-if="$route.name == 'index'">
            <div
              class="presentation-logo mb-9 animate__animated animate__pulse"
            >
              <logo
                :url="homeLogoUrl"
                :href="$route.name == 'm-nickname' ? '' : ''"
              />
            </div>
            <div
              class="presentation-text mt-3 text-light animate__animated animate__fadeIn"
            >
              <h1 CLASS="mb-3">DIRECT<span class="text-gold">ORO</span></h1>
              <h3 class="mx-auto d-inline-block" style="max-width: 360px">
                <span>TRADING</span>
                <b class="text-gold">SIMPLE</b>,
                <b class="text-gold">INTUITIVO</b>,
                <b class="text-gold">RENTABLE</b> Y GUIADO POR INTELIGENCIA
                <b class="text-gold">ARTIFICIAL</b>
              </h3>
            </div>
          </div>

          <div
            v-if="hostMember && $route.name == 'm-nickname'"
            class="animate__animated animate__fadeIn"
          >
            <logo :url="hostMemberPictureUrl" size="xs" class="mb-9" />

            <div class="presentation-text mt-3 text-light">
              <h2
                class="mx-auto d-inline-block text-uppercase"
                style="max-width: 360px"
              >
                <b class="text-gold">{{ hostMember.name }}</b
                >, REPRESENTANTE OFICIAL DE <b class="text-gold">DIRECT</b>ORO
              </h2>
            </div>
          </div>
        </div>

        <!-- Interaction buttons -->
        <div
          class="presentation-actions text-center mt-15 animate__animated animate__fadeIn"
        >
          <div class="hidden-on-mobile">
            <!-- Stepper Toggler Buttons -->
            <v-btn
              @click="toggleStepper()"
              class="bg-gold"
              :rounded="!isStepperOpen"
              :icon="isStepperOpen"
            >
              <v-icon v-if="!isStepperOpen" class="mr-2">mdi-flag</v-icon>
              <v-icon v-else>mdi-close</v-icon>
              <span v-if="!isStepperOpen">¿Cómo funciona?</span>
            </v-btn>

            <v-btn
              v-if="
                $route.name != 'm-nickname' &&
                !isAuthenticated &&
                !isStepperOpen
              "
              to="/auth"
              class="ml-3"
              rounded
              elevation="0"
              text
            >
              <v-icon class="mr-2 text-light">mdi-key</v-icon>
              <span class="text-light">Iniciar Sesión</span>
            </v-btn>
          </div>

          <div class="hidden-on-desktop">
            <v-btn @click="toggleStepper()" class="bg-gold mb-3" rounded>
              <v-icon v-if="!isStepperOpen" class="mr-2">mdi-flag</v-icon>
              <v-icon v-else class="mr-2">mdi-check</v-icon>
              <span v-if="!isStepperOpen">¿Cómo funciona?</span>
              <span v-else>Listo</span>
            </v-btn>

            <v-btn to="/auth" rounded text elevation="0" class="">
              <v-icon class="mr-2 text-light">mdi-key</v-icon>
              <span class="text-light">Iniciar Sesión</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Page Content -->
    <div class="main-page-content animate__animated animate__fadeIn">
      <div class="py-12">
        <!-- EXPLANATION STEPPER -->
        <div ref="stepper_holder" class="px-6">
          <h3
            v-if="isStepperOpen"
            class="text-h4 text-center mb-15 mt-9 text-dark"
          >
            <span><b>¿Cómo funciona?</b></span>
          </h3>

          <v-row
            v-if="false && isStepperOpen"
            align="center"
            justify="center"
            class="text-center animate__animated"
            :class="{
              animate__bounce: isStepperOpen,
            }"
          >
            <v-col cols="12" lg="9">
              <v-stepper v-model="step" class="elevation elevation-9" dark>
                <!-- Stepper header -->
                <v-stepper-header>
                  <!-- Step 1 -->
                  <v-stepper-step :complete="step > 1" step="1">
                    {{ stepTitles.step1 }}
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <!-- Step 2 -->
                  <v-stepper-step :complete="step > 2" step="2">
                    {{ stepTitles.step2 }}
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <!-- Step 3 -->
                  <v-stepper-step step="3">
                    {{ stepTitles.step3 }}
                  </v-stepper-step>
                </v-stepper-header>

                <!-- Stepper body -->
                <v-stepper-items>
                  <!-- Company -->
                  <v-stepper-content step="1" class="pa-9 bg-gold">
                    <v-card class="mb-12 radius-6">
                      <step-1-form
                        :title="stepTitles.step1"
                        :description="stepDescriptions.description1"
                      />
                    </v-card>
                    <!-- actions -->
                    <stepper-walk
                      left-icon="mdi-close"
                      left-caption="Cerrar"
                      right-caption="Después"
                      @onLeftClick="toggleStepper()"
                      @onRightClick="step = 2"
                    />
                  </v-stepper-content>

                  <!-- Color settings & media content -->
                  <v-stepper-content step="2" class="pa-9 bg-gold">
                    <v-card class="mb-12 d-flex justify-center align-center">
                      <step-2-form
                        :title="stepTitles.step2"
                        :description="stepDescriptions.description2"
                      />
                    </v-card>

                    <!-- actions -->
                    <stepper-walk
                      left-caption="Antes"
                      right-caption="Después"
                      @onLeftClick="step = 1"
                      @onRightClick="step = 3"
                    />
                  </v-stepper-content>

                  <v-stepper-content step="3" class="pa-9 bg-gold">
                    <v-card class="mb-12 d-flex justify-center align-center">
                      <step-3-form
                        :title="stepTitles.step3"
                        :description="stepDescriptions.description3"
                      />
                    </v-card>

                    <!-- actions -->
                    <stepper-walk
                      left-caption="Antes"
                      right-caption="Entendido"
                      right-icon="mdi-check"
                      @onLeftClick="step = 2"
                      @onRightClick="toggleStepper()"
                    />
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-col>
          </v-row>

          <div
            v-if="isStepperOpen"
            class="stepper-box mb-15 text-center animate__animated"
            :class="{
              animate__bounce: isStepperOpen,
            }"
          >
            <v-stepper v-model="step" class="elevation elevation-9" dark>
              <!-- Stepper header -->
              <v-stepper-header
                class="bg-dark-gradient"
                style="border-bottom: solid 1px #d9d9d945"
              >
                <!-- Step 1 -->
                <v-stepper-step :complete="step > 1" step="1">
                  <b>{{ stepTitles.step1 }}</b>
                </v-stepper-step>
                <v-divider></v-divider>
                <!-- Step 2 -->
                <v-stepper-step :complete="step > 2" step="2">
                  <b>{{ stepTitles.step2 }}</b>
                </v-stepper-step>
                <v-divider></v-divider>
                <!-- Step 3 -->
                <v-stepper-step step="3">
                  <b>{{ stepTitles.step3 }}</b>
                </v-stepper-step>
              </v-stepper-header>

              <!-- Stepper body -->
              <v-stepper-items>
                <!-- Company -->
                <v-stepper-content step="1" class="pa-9 bg-dark-gradient">
                  <v-card class="mb-12 bg-tr-light">
                    <step-1-form
                      :title="stepTitles.step1"
                      :description="stepDescriptions.description1"
                    />
                  </v-card>
                  <!-- actions -->
                  <stepper-walk
                    left-icon="mdi-close"
                    left-caption=""
                    right-caption="Después"
                    @onLeftClick="toggleStepper()"
                    @onRightClick="step = 2"
                  />
                </v-stepper-content>

                <!-- Color settings & media content -->
                <v-stepper-content step="2" class="pa-9 bg-dark-gradient">
                  <v-card
                    class="mb-12 d-flex justify-center align-center bg-tr-light"
                  >
                    <step-2-form
                      :title="stepTitles.step2"
                      :description="stepDescriptions.description2"
                    />
                  </v-card>

                  <!-- actions -->
                  <stepper-walk
                    left-caption=""
                    right-caption="Después"
                    @onLeftClick="step = 1"
                    @onRightClick="step = 3"
                  />
                </v-stepper-content>

                <v-stepper-content step="3" class="pa-9 bg-dark-gradient">
                  <v-card
                    class="mb-12 d-flex justify-center align-center bg-tr-light"
                  >
                    <step-3-form
                      :title="stepTitles.step3"
                      :description="stepDescriptions.description3"
                    />
                  </v-card>

                  <!-- actions -->
                  <stepper-walk
                    left-caption=""
                    right-caption="Entendido"
                    right-icon="mdi-check"
                    @onLeftClick="step = 2"
                    @onRightClick="toggleStepper()"
                  />
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

            <div class="text-center mt-6 pt-9 text-dark">
              <recruiter />
            </div>
          </div>
        </div>

        <!-- MAIN PRESENTATION -->
        <v-row justify="center" align="center" class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <!-- YOUTUBE VIDEO -->
            <div
              v-if="
                false &&
                ($route.name === 'index' || $route.name === 'm-nickname')
              "
              class="text-center"
            >
              <h2
                class="text-dark xxs-box mx-auto mb-16 mt-9 displayer"
                data-phrases-writer
                id="displayer"
              ></h2>
              <client-only>
                <div class="text-center black video-box mb-12">
                  <youtube-video
                    video-id="hySNRByF7ac"
                    @playing="playing"
                    host="https://www.youtube.com"
                    class="d-inline-block"
                    player-width="640"
                  />
                </div>
              </client-only>
            </div>

            <!-- DYNAMIC CONTENT -->
            <nuxt />
          </v-col>
        </v-row>

        <!-- Phrase -->
        <div
          v-if="isStepperOpen"
          class="my-12 d-flex justify-center mx-auto"
          style="max-width: 369px"
        >
          <blockquote class="blockquote">
            <h3 class="text-dark text-center">
              &#8220;Si buscas resultados distintos, no hagas siempre lo
              mismo&#8221;
            </h3>
            <footer class="mt-3 text-center">
              <span class="text-dark">
                <em>&mdash;Albert Einstein</em>
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <quick-buttons
      :hidden="
        !isFloatingButtonsVisible ||
        isSharing ||
        isStepperOpen ||
        isMessengerDialogOpen ||
        isWhatsappDialogOpen ||
        isInstagramDialogOpen ||
        isDrawerLeftOpen ||
        isDrawerRightOpen
      "
      @onStartWhatsapp="startWhatsapp()"
      @onStartFacebookMessenger="startMessenger()"
      @onStartInstagram="startInstagram()"
    />

    <!-- Confirmation Dialog -->
    <confirmation-dialog
      :is-active="isConfirmationOpened"
      :title="confirmation && confirmation.title"
      :message="confirmation && confirmation.message"
      :color="confirmation && confirmation.color ? confirmation.color : null"
      :is-loading="isWaiting"
      :confirm-button-text="confirmation && confirmation.confirmButtonText"
      @onConfirm="confirmation?.onConfirm()"
      @onClose="confirmation?.onClose()"
    />

    <!-- Information Dialog -->
    <information-dialog
      :active="isInformationDialogOpen"
      :title="information && information.title ? information.title : null"
      :subtitle="
        information && information.subtitle ? information.subtitle : null
      "
      :description="
        information && information.description ? information.description : null
      "
      :media-url="
        information && information.mediaUrl ? information.mediaUrl : null
      "
      :media-max-width="
        information && information.mediaMaxWidth
          ? information.mediaMaxWidth
          : null
      "
      :close-caption="
        information && information.closeCaption
          ? information.closeCaption
          : null
      "
      :href="information && information.href ? information.href : null"
      :href-target="
        information && information.hrefTarget ? information.hrefTarget : null
      "
      :href-icon="
        information && information.hrefIcon ? information.hrefIcon : null
      "
      :href-caption="
        information && information.hrefCaption ? information.hrefCaption : null
      "
      :to="information && information.to ? information.to : null"
      :to-icon="information && information.toIcon ? information.toIcon : null"
      :to-caption="
        information && information.toCaption ? information.toCaption : null
      "
      :rating="information && information.rating ? information.rating : null"
      @onClose="closeInformation"
    />

    <!-- Whatsapp dialog -->
    <WhatsappDialog :active="isWhatsappDialogOpen" @onClose="closeWhatsapp()" />

    <!-- Facebook dialog -->
    <MessengerDialog
      :active="isMessengerDialogOpen"
      @onClose="closeMessenger()"
    />

    <!-- Instagram Dialog -->
    <InstagramDialog
      :active="isInstagramDialogOpen"
      @onClose="closeInstagram()"
    />

    <!-- Sharer Dialog -->
    <div class="social-sharer-holder">
      <AssistantDialog
        :model="isSharing"
        :persistent="false"
        text="¡Comparte DirectOro!"
        details="Es un servicio que merece la pena ser compartido!"
        @on-assistant-close="toggleSharing"
      >
        <social-sharer :url="urlToShare" class="mt-3" />
      </AssistantDialog>
    </div>

    <!-- Notification Dialog -->
    <div v-if="notificationToShow">
      <notification-dialog
        :is-active="isNotificationDialogOpened"
        :notification="notificationToShow"
        @onClose="closeNotificationDialog"
        @onToggleReading="toggleReading"
      />
    </div>

    <!-- Page Footer -->
    <div
      class="App-footer elevation-6 white--text text-center d-block pa-15 bg-tr-white"
    >
      <div class="d-inline-block">
        <span class="text-dark"><b>DIRECT</b><b class="text-gold">ORO</b></span>
      </div>
      <span class="text-dark">&copy; {{ new Date().getFullYear() }}</span
      ><span class="text-dark">
        - By
        <b
          ><a href="https://ciudadbotica.com" target="_blank" class="text-dark"
            >Ciudad <span>Bótica</span></a
          ></b
        ></span
      >

      <div class="text-dark mt-9 xxs-box mx-auto">
        <small
          ><nuxt-link
            class="ma-2 text-dark"
            active-class="font-weight-bold"
            to="/"
            exact=""
            >Inicio</nuxt-link
          ></small
        >
        <small
          ><nuxt-link
            class="ma-2 text-dark"
            active-class="font-weight-bold"
            to="/about"
            >Nosotros</nuxt-link
          ></small
        >
        <small
          ><nuxt-link
            class="ma-2 text-dark"
            active-class="font-weight-bold"
            to="/terms"
            >Condiciones de Uso</nuxt-link
          ></small
        >
        <small
          ><nuxt-link
            class="ma-2 text-dark"
            active-class="font-weight-bold"
            to="/privacy"
            >Políticas de Privacidad</nuxt-link
          ></small
        >
        <small
          ><nuxt-link
            class="ma-2 text-dark"
            active-class="font-weight-bold"
            to="/qa"
            >Preguntas Frecuentes</nuxt-link
          ></small
        >
      </div>
    </div>
  </v-app>
</template>

<script>
const DEFAULT_URL_TO_SHARE = "https://live.ciudadbotica.com/";

export default {
  middleware: ["load-auth"],

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);

    this.$bus.$on("hide-floating-buttons", this.hideFloatingButtons);
    this.$bus.$on("show-floating-buttons", this.showFloatingButtons);
    this.$bus.$on("open-info", this.openInformation);
    this.$bus.$on("notify", this.notify);
    this.$bus.$on("confirm", this.confirm);
    this.$bus.$on("stop-confirm", this.stopConfirm);
    this.$bus.$on("toggle-sharing", this.toggleSharing);
    this.$bus.$on("toggle-glass", this.toggleGlass);
    this.$bus.$on("load-auth-user", this.loadAuthUser);

    this.$bus.$on("open-notification-dialog", this.openNotificationDialog);
    this.$bus.$on("toggle-notification-reading", this.toggleReading);
    this.$bus.$on("remove-notification", this.removeNotification);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);

    this.$bus.$off("hide-floating-buttons");
    this.$bus.$off("show-floating-buttons");
    this.$bus.$off("open-info");
    this.$bus.$off("notify");
    this.$bus.$off("confirm");
    this.$bus.$off("stop-confirm");
    this.$bus.$off("toggle-sharing");
    this.$bus.$off("toggle-glass");
    this.$bus.$off("load-auth-user");

    this.$bus.$off("open-notification-dialog");
    this.$bus.$off("toggle-notification-reading");
    this.$bus.$off("remove-notification");

    // Recaptcha
    this.$recaptcha.destroy();
  },

  async mounted() {
    this.isWhatsappDialogOpen = false;
    this.isMessengerDialogOpen = false;
    this.isInstagramDialogOpen = false;

    this.handlePhrasesDisplayer();

    if (this.isAuthenticated && !this.authenticatedUser) {
      this.loadAuthUser();
    }

    // Recaptcha
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }

    // Load Notifications
    if (this.isAuthenticated) {
      this.loadNotifications();
    }
  },

  props: {
    source: String,
  },

  data: () => ({
    // isDigitalProductOpened: false,
    notification: null,
    confirmation: null,
    isInformationDialogOpen: false,
    isConfirmationOpened: false,
    waitingMessage: "",
    isOnTop: true,
    isFloatingButtonsVisible: true,
    isSharing: false,
    isDrawerLeftOpen: null,
    isDrawerRightOpen: null,
    isPresentationOpen: true,
    isStepperOpen: false,
    isWhatsappDialogOpen: false,
    isMessengerDialogOpen: false,
    isInstagramDialogOpen: false,
    isNotificationListOpen: false,
    isNotificationDialogOpened: false,
    notificationToShow: null,
    urlToShare: "",
    step: 1,
    right: false,
    left: false,
    isGlassOpened: false,
    information: null,
    notificationsUnread: [],
    notifications: [],
    stepTitles: {
      step1: "Conecta",
      step2: "Enseña",
      step3: "Gana",
    },
    stepDescriptions: {
      description1: `Comienza conectando tu asistente virtual a tu plataforma educativa en línea. Es un proceso simple y rápido que te permitirá personalizar la experiencia de aprendizaje.`,
      description2: `Tu asistente virtual se convierte en tu aliado educativo. Puedes programarlo para enseñar lecciones, responder preguntas y proporcionar información relevante. Tus alumnos tendrán acceso a un tutor virtual disponible las 24 horas.`,
      description3: `AAprovecha al máximo tu asistente virtual para aumentar tus ingresos. Ofrece cursos adicionales, vende material de estudio y permite que tu asistente realice ventas en automático. Esto significa más ganancias para ti sin esfuerzo adicional.`,
    },
    botSidebarItems: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "¡Hola!",
        subtitle:
          "<b class='text-gold'>¿Necesitas aprender rápidamente algunos consejos?</b>. Conoce nuestras preguntas para orientar mejor tu camino'",
        to: "/bot",
        imageUrl: require("~/assets/media/nano-bot.png") + "?" + new Date(),
      },
    ],
    carouselList: [
      {
        id: 3,
        src: require("~/assets/media/bg-trading-transformed.jpeg"),
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    player() {
      return this.$refs.youtube.player;
    },

    logoUrl() {
      return require("~/assets/media/trading.png") + "?" + new Date();
    },

    homeLogoUrl() {
      return require("@/assets/media/trading.png") + "?" + new Date();
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isSuperAuthenticated() {
      return this.$store.getters.isSuperAuthenticated;
    },

    authenticatedToken() {
      return this.isAuthenticated ? this.$store.getters.token : null;
    },

    authenticatedUser() {
      return this.$store.getters.authenticatedUser;
    },

    authenticatedUserPictureUrl() {
      return (
        this.authenticatedUser?.pictureUrl || require("~/assets/media/user.png")
      );
    },

    items() {
      const closeConfirmation = this.startClosing;

      let leftMenuItems = [];

      if (!this.isAuthenticated) {
        // PUBLIC ITEMS
        leftMenuItems = [
          { title: "Inicio", icon: "mdi-home-heart", to: "/" },
          {
            title: "Nosotros",
            icon: "mdi-account-multiple",
            to: "/about",
          },
          {
            title: "Preguntas Frecuentes",
            icon: "mdi-head-question",
            to: "/qa",
          },
          {
            title: "Consejos de Trading",
            icon: "mdi-lightbulb",
            to: "/tips",
          },
          // Auth section
          {
            separator: {
              title: "<span class='text-gold'>Elite</span> Club",
            },
          },
          {
            title: "Iniciar sesión",
            icon: "mdi-key",
            to: "/auth",
          },
          {
            title: "Crear una cuenta",
            icon: "mdi-account-plus",
            to: "/auth/new",
          },
          {
            title: "Políticas de Privacidad",
            icon: "mdi-eye-lock",
            to: "/privacy",
          },
          {
            title: "Condiciones de Uso",
            icon: "mdi-scale-balance",
            to: "/terms",
          },
        ];
      } else if (!this.isSuperAuthenticated) {
        // PARTNER ITEMS
        leftMenuItems = [
          { title: "Inicio", icon: "mdi-home-heart", to: "/" },
          {
            title: "Preguntas Frecuentes",
            icon: "mdi-head-question",
            to: "/qa",
          },
          {
            title: "Consejos de Trading",
            icon: "mdi-lightbulb",
            to: "/tips",
          },
          // Auth section
          {
            separator: {
              title: "<span class='text-gold'>Elite</span> Club",
            },
          },
          {
            title: "Mi Panel",
            icon: "mdi-gamepad",
            to: "/dashboard",
          },
          {
            title: "Notificaciones",
            icon: "mdi-bell",
            to: "/dashboard/notifications",
          },
          {
            title: "Mi Cuenta",
            icon: "mdi-account-check",
            to: "/dashboard/settings",
          },
          {
            icon: "mdi-power",
            title: "Salir",
            color: "red",
            onClick: () => {
              this.startClosing();
            },
          },
        ];
      } else {
        // SUPER USER
        leftMenuItems = [
          { title: "Inicio", icon: "mdi-home-heart", to: "/" },
          {
            title: "Mi Panel",
            icon: "mdi-gamepad",
            to: "/dashboard",
          },
          // Auth section
          {
            separator: {
              title: "<span class='text-gold'>Elite</span> Club",
            },
          },
          {
            title: "Notificaciones",
            icon: "mdi-bell",
            to: "/dashboard/notifications",
          },
          {
            title: "Miembros",
            icon: "mdi-account-multiple",
            to: "/dashboard/members",
          },
          {
            title: "Preguntas Frecuentes",
            icon: "mdi-head-question",
            to: "/dashboard/qa",
          },
          {
            title: "Consejos",
            icon: "mdi-lightbulb",
            to: "/dashboard/tips",
          },
          {
            title: "Mi Cuenta",
            icon: "mdi-account-check",
            to: "/auth/new",
          },
          {
            icon: "mdi-power",
            title: "Salir",
            color: "red",
            onClick: () => {
              closeConfirmation();
            },
          },
        ];
      }

      return leftMenuItems;
    },

    hostMember() {
      return this.$store.getters.host;
    },

    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },

    hostMemberPictureUrl() {
      return this.hostMember?.pictureUrl && this.$route.name == "m-nickname"
        ? this.hostMember?.pictureUrl + "?" + new Date()
        : this.defaultPictureUrl;
    },
  },

  watch: {
    $route(to, from) {
      this.closeInformation();

      setTimeout(() => {
        this.handlePhrasesDisplayer();
      }, 333); // Waiting for DOM rendering

      this.isDrawerRightOpen = false;
      this.isDrawerLeftOpen = false;
      this.isStepperOpen = false;

      if (this.isAuthenticated) {
        this.loadNotifications();

        if (!this.authenticatedUser) {
          this.loadAuthUser();
        }
      }
    },

    isDrawerRightOpen(v) {
      if (v) {
        this.isDrawerLeftOpen = false;
      } else {
        this.isNotificationListOpen = false;
      }
    },
  },

  methods: {
    betaCommunication() {
      const betaInfo = {
        title: "¡Descubre la Beta de DirectOro!",
        description:
          "Estamos emocionados de presentar la fase beta de DirectOro, la plataforma pionera que lleva la educación y el entrenamiento en trading a nuevas alturas mediante el poder de la inteligencia artificial avanzada.",
        mediaUrl: require("~/assets/media/trading.png"),
      };

      this.$inform(betaInfo);
    },

    showNotification(notification) {
      this.$bus.$emit("open-notification-dialog", notification);
    },

    handlePhrasesDisplayer() {
      if (!document) {
        return;
      }

      const displayerElement = document.getElementById("displayer");

      if (displayerElement) {
        const phrases = [
          "Trading con confianza, liderando el camino hacia el éxito.",
          "Uniéndonos en el trading, construyendo juntos un futuro sólido en DirectOro.",
          "Vive el trading, únete a la comunidad de DirectOro.",
          "Haz crecer tu futuro con DirectOro Trading.",
          "Innovación en trading, unidos en DirectOro.",
          "Avanza en el mercado con la comunidad de trading de DirectOro",
          "Confianza y éxito en trading, solo en DirectOro.",
          "Transforma tu futuro financiero con DirectOro Trading.",
          "Juntos logramos más en DirectOro Trading.",
          "VIVE EL TRADING, construye tu libertad",
          "¡Esta es tu oportunidad para cambiarlo todo!",
        ];

        // Showing sequence of phrases
        this.$writePhrases(phrases, displayerElement);
      }
    },

    loadAuthUser() {
      const token = this.$store.getters.token;
      this.waitingMessage = "Cargando información del usuario";
      return this.$store
        .dispatch("getAuthenticatedUser", token)
        .catch((error) => {
          console.error("[error]", error);
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401 || errorStatus == 403
              ? "Necesita autorización para continuar. Cerrando..."
              : "Ha ocurrido un inconveniente al cargar los datos del usuario";

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
            onNotify: () => {
              if (errorStatus == 401 || errorStatus == 403) {
                this.$router.push("/auth");
                this.$notify({
                  message: "Ingresa nuevamente las credenciales del sistema",
                });
              }
            },
          });
        })
        .finally(() => {
          this.waitingMessage = "";
        });
    },

    loadNotifications() {
      return this.$store
        .dispatch("getNotifications", {
          token: this.authenticatedToken,
          page: 1,
        })
        .then(({ notifications }) => {
          this.notifications = notifications;
          this.notificationsUnread = notifications.filter(
            (n) => n.readAt === null
          );
        })
        .catch((error) => {
          console.error("[error]", error);
          this.$notify({
            message:
              "Se ha presentado un inconveniente al cargar las notificaciones",
            color: "red",
          });
        });
    },

    toggleNotifications() {
      this.isNotificationListOpen = !this.isNotificationListOpen;
      this.isDrawerRightOpen = this.isNotificationListOpen;
    },

    showAuthUserInfo() {
      if (!this.authenticatedUser) {
        return this.$notify({
          message: "Cargando usuario. Aguarde un momento por favor...",
          timeout: 4599,
        });
      }

      const { nickname, name, description, email } = this.authenticatedUser;
      const userPictureUrl = this.authenticatedUserPictureUrl;

      this.openInformation({
        title: name,
        description: "Correo electrónico registrado",
        subtitle: email,
        mediaMaxWidth: "120px",
        mediaUrl: userPictureUrl + "?" + new Date(),
        pictureUrl: userPictureUrl + "?" + new Date(),
        to: `/dashboard`,
        toIcon: "mdi-gamepad",
        toCaption: "Mi Panel",
      });
    },

    startClosing() {
      const stop = this.stopConfirm;
      const close = this.closeApp;

      this.confirm({
        title: "¿Estás seguro?",
        message: "Se cerrará el sistema y todas sus funcionalidades",
        onConfirm: () => {
          close();
          stop();
        },
        onClose: () => {
          stop();
        },
      });
    },

    closeApp() {
      this.waitingMessage = "Por favor espere...";
      this.$store
        .dispatch("signout")
        .then(() => {
          this.$notify({
            message: "Te has desconectado correctamente...",
            color: "info",
            timeout: 3330,
          });

          window.location.href = "/";
        })
        .catch((error) => {
          console.error("[error]", error);
          this.$notify({
            message: "Ha ocurrido un error al quitar cerrar la sesión.",
            color: "red",
          });
        })
        .finally(() => {
          this.waitingMessage = "";
        });
    },

    handleClick(item) {
      if (!item.onClick) {
        return false;
      }
      item.onClick();
    },

    handleScroll() {
      this.isOnTop = window.scrollY === 0;
    },

    hideFloatingButtons() {
      this.isFloatingButtonsVisible = false;
    },

    showFloatingButtons() {
      this.isFloatingButtonsVisible = true;
    },

    sendContactData(contactData) {
      console.log("[@todo: contactData]", contactData);
    },

    playing() {
      console.log("\o/ we are watching!!!");
    },

    toggleSharing(url) {
      this.isSharing = !this.isSharing;
      this.urlToShare = this.isSharing && url ? url : DEFAULT_URL_TO_SHARE;
    },

    toggleGlass() {
      this.isGlassOpened = !this.isGlassOpened;
      if (!this.isGlassOpened) {
        this.$bus.$emit("on-close-glass");
      }
    },

    scrollToTop(top) {
      window.scrollTo(0, top);
    },

    togglePresentation() {
      this.isPresentationOpen = !this.isPresentationOpen;
    },

    toggleStepper() {
      this.isStepperOpen = !this.isStepperOpen;

      if (this.isStepperOpen) {
        this.step = 1;
      }

      setTimeout(() => {
        const stepperBox = this.$refs["stepper_holder"];
        const stepperBoxPosition = stepperBox.getBoundingClientRect();
        const stepperBoxPositionTop = this.isStepperOpen
          ? stepperBoxPosition.y - 150
          : 0;

        this.scrollToTop(stepperBoxPositionTop);
      }, 99);
    },

    // Whatsapp
    startWhatsapp() {
      this.isWhatsappDialogOpen = true;
    },
    closeWhatsapp() {
      this.isWhatsappDialogOpen = false;
    },

    // Messenger
    startMessenger() {
      this.isMessengerDialogOpen = true;
    },
    closeMessenger() {
      this.isMessengerDialogOpen = false;
    },

    // Instagram
    startInstagram() {
      this.isInstagramDialogOpen = true;
    },
    closeInstagram() {
      this.isInstagramDialogOpen = false;
    },

    // Notification
    notify(notification) {
      this.notification = notification;
      setTimeout(() => {
        this.notification = null;
        if (
          notification &&
          notification.afterNotify &&
          typeof notification.afterNotify === "function"
        ) {
          notification.afterNotify();
        }
      }, (this.notification && this.notification.timeout) || 3003);
    },

    // Information
    openInformation(info) {
      this.information = info;
      setTimeout(() => {
        this.isInformationDialogOpen = true;
      }, 123);
    },
    closeInformation() {
      console.log("closing dialog");
      this.isInformationDialogOpen = false;
      setTimeout(() => {
        this.information = null;
      }, 123);
    },

    // Confirmation
    confirm(confirmation) {
      this.confirmation = confirmation;
      this.$nextTick(() => {
        this.isConfirmationOpened = true;
      });
    },

    stopConfirm() {
      setTimeout(() => {
        this.confirmation = null;
      }, 333); // > Visual effect removing

      this.$nextTick(() => {
        this.isConfirmationOpened = false;
      });
    },

    // Notification
    openNotificationDialog(notification) {
      this.notificationToShow = notification;
      setTimeout(async () => {
        if (!notification.readAt) {
          await this.toggleReading(notification._id);
        }
        this.isNotificationDialogOpened = true;
      }, 666);
    },

    closeNotificationDialog() {
      this.isNotificationDialogOpened = false;
      setTimeout(() => {
        this.notificationToShow = null;
      }, 666);
    },

    toggleReading(notificationId) {
      return this.$store
        .dispatch("toggleReading", {
          token: this.authenticatedToken,
          notificationId,
        })
        .then((notification) => {
          console.log("[notification]", notification);
          this.$notify({
            message: "La notificación se ha actualizado correctamente",
            color: "info",
          });

          this.notificationToShow = { ...notification };

          this.loadNotifications();

          this.$bus.$emit("load-notifications");

          if (this.isNotificationDialogOpened) {
            this.closeNotificationDialog();
          }
        })
        .catch((error) => {
          console.log("[error]", error);
          this.$notify({
            message: "Ha ocurrido un inconveniente al marcar la 'lectura'",
            color: "red",
          });
        });
    },
  },
};
</script>
