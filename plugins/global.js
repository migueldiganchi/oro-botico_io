import Vue from "vue";

// Global
import Logo from "~/components/Logo.vue";
import Page from "~/components/Page.vue";
import Castle from "~/components/Castle.vue";
import Breadcrumbs from "~/components/App/UI/Breadcrumbs.vue";
import Recruiter from "~/components/App/UI/Recruiter.vue";
import ValidationErrors from "@/components/App/UI/ValidationErrors";

// Settings Step
import Step1Form from "~/components/App/UI/Forms/Steps/Step1Form.vue";
import Step2Form from "~/components/App/UI/Forms/Steps/Step2Form.vue";
import Step3Form from "~/components/App/UI/Forms/Steps/Step3Form.vue";

// Dialogs
import NotificationDialog from "~/components/App/UI/Dialogs/NotificationDialog.vue";
import InformationDialog from "~/components/App/UI/Dialogs/InformationDialog.vue";
import ConfirmationDialog from "~/components/App/UI/Dialogs/ConfirmationDialog.vue";
import AssistantDialog from "~/components/App/UI/Dialogs/AssistantDialog.vue";
import ColorPickerDialog from "~/components/App/UI/Dialogs/ColorPickerDialog.vue";
import MessengerDialog from "~/components/App/UI/Dialogs/MessengerDialog.vue";
import WhatsappDialog from "~/components/App/UI/Dialogs/WhatsappDialog.vue";
import InstagramDialog from "~/components/App/UI/Dialogs/InstagramDialog.vue";
import StepperWalk from "~/components/App/UI/StepperWalk.vue";
import QuickButtons from "~/components/App/UI/QuickButtons.vue";
import Gallery from "~/components/App/UI/Gallery.vue";
import Editor from "~/components/App/UI/Editor.vue";
import SocialSharer from "~/components/App/UI/SocialSharer.vue";

// Grid Menu
import GridMenu from "@/components/App/UI/Grid/GridMenu";
import GridMenuItem from "@/components/App/UI/Grid/GridMenuItem";

// Bot
import BotConversation from "~/components/App/Bot/BotConversation";
import BotSuggestion from "~/components/App/Bot/BotSuggestion";
import BotSidebar from "~/components/App/Bot/BotSidebar";
import BotQA from "~/components/App/Bot/BotQA";

// Questions
import QuestionForm from "~/components/App/Questions/QuestionForm";
import QuestionFormDialog from "~/components/App/Questions/QuestionFormDialog";

// Notification
import NotificationSnack from "~/components/App/Notifications/NotificationSnack";
import Notification from "~/components/App/Notifications/Notification";
import NotificationCard from "~/components/App/Notifications/NotificationCard";
import NotificationCards from "~/components/App/Notifications/NotificationCards";
import NotificationList from "~/components/App/Notifications/NotificationList";
import NotificationListItem from "~/components/App/Notifications/NotificationListItem";

// Article
import ArticleList from "~/components/App/Articles/ArticleList";
import ArticleListItem from "~/components/App/Articles/ArticleListItem";

// Tips
import TipForm from "~/components/App/Tips/TipForm";
import TipFormDialog from "~/components/App/Tips/TipFormDialog";
import TipList from "~/components/App/Tips/TipList";
import TipListItem from "~/components/App/Tips/TipListItem";

// Members
import MemberBusinessForm from "~/components/App/Members/MemberBusinessForm";
import MemberForm from "~/components/App/Members/MemberForm";
import MemberStatusForm from "~/components/App/Members/MemberStatusForm";
import MemberStatusFormDialog from "~/components/App/Members/MemberStatusFormDialog";
import MemberList from "~/components/App/Members/MemberList";
import MemberCard from "~/components/App/Members/MemberCard";
import Member from "~/components/App/Members/Member.vue";

// File management
import FileManager from "@/components/App/Files/FileManager";
import FileUploader from "@/components/App/Files/FileUploader";

// Auth
import SigninForm from "~/components/App/Auth/SigninForm";
import SignupForm from "~/components/App/Auth/SignupForm";
import ResetForm from "~/components/App/Auth/ResetForm";
import PasswordForm from "~/components/App/Auth/PasswordForm";

const components = {
  Logo,
  Page,
  Castle,

  Breadcrumbs,
  FileManager,
  FileUploader,
  Recruiter,
  ValidationErrors,

  Step1Form,
  Step2Form,
  Step3Form,

  AssistantDialog,
  NotificationDialog,
  InformationDialog,
  ConfirmationDialog,
  ColorPickerDialog,
  MessengerDialog,
  WhatsappDialog,
  InstagramDialog,
  StepperWalk,
  QuickButtons,
  Gallery,
  Editor,
  SocialSharer,

  GridMenu,
  GridMenuItem,

  BotConversation,
  BotSuggestion,
  BotSidebar,
  BotQA,

  QuestionForm,
  QuestionFormDialog,

  TipForm,
  TipFormDialog,
  TipList,
  TipListItem,

  MemberBusinessForm,
  MemberForm,
  MemberStatusForm,
  MemberStatusFormDialog,
  MemberList,
  MemberCard,
  Member,

  NotificationSnack,
  Notification,
  NotificationCard,
  NotificationCards,
  NotificationList,
  NotificationListItem,

  ArticleList,
  ArticleListItem,

  SigninForm,
  SignupForm,
  ResetForm,
  PasswordForm,
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});

Vue.prototype.$notify = (notification) => {
  Vue.prototype.$bus.$emit("notify", notification);
};

Vue.prototype.$confirm = (confirmation) => {
  Vue.prototype.$bus.$emit("confirm", confirmation);
};

Vue.prototype.$stopConfirm = () => {
  Vue.prototype.$bus.$emit("stop-confirm");
};

Vue.prototype.$interact = (interaction) => {
  Vue.prototype.$bus.$emit("interact", interaction);
};

Vue.prototype.$stopInteract = () => {
  Vue.prototype.$bus.$emit("stop-interact");
};

Vue.prototype.$inform = (explanation) => {
  Vue.prototype.$bus.$emit("open-info", explanation);
};

Vue.prototype.$stopExplain = () => {
  Vue.prototype.$bus.$emit("stop-explain");
};

Vue.prototype.$wait = (waitingMessage) => {
  Vue.prototype.$bus.$emit("wait", waitingMessage);
};

Vue.prototype.$stopWait = () => {
  Vue.prototype.$bus.$emit("stop-wait");
};

Vue.prototype.$openTipForm = (tip) => {
  Vue.prototype.$bus.$emit("start-tip-form", tip);
};

Vue.prototype.$stopTipForm = () => {
  Vue.prototype.$bus.$emit("stop-tip-form");
};
