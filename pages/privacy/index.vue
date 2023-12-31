<template>
  <page
    :breadcrumbs="breadcrumbItems"
    name="privacy"
    title="Políticas de Privacidad"
    description="Comprende cómo usamos la información de nuestros usuarios"
  >
    <div class="box mx-auto text-justify mt-15">
      <ul>
        <li>
          <b>1. Información que Recopilamos: </b>Recopilamos información que nos
          proporcionas al registrarte, como tu nombre y dirección de correo
          electrónico. También podemos recopilar información sobre cómo utilizas
          Oro Bótico y la información generada por tus asistentes virtuales.
        </li>

        <li>
          <b>2. Uso de la Información: </b>Utilizamos tus datos para
          proporcionar y mejorar Oro Bótico, así como para comunicarnos contigo.
          No compartimos tu información personal con terceros, excepto cuando
          sea necesario para operar nuestros servicios.
        </li>

        <li>
          <b>3. Seguridad de Datos: </b>Tomamos medidas para proteger tus datos,
          pero ninguna transmisión de datos por Internet es 100% segura. Hacemos
          todo lo posible para garantizar la seguridad de tus datos, pero no
          podemos garantizar su seguridad absoluta.
        </li>

        <li>
          <b>4. Cambios en la Política de Privacidad y Términos de Uso: </b>
          Podemos actualizar nuestros Términos de Uso y Política de Privacidad
          ocasionalmente. Te notificaremos sobre cambios significativos y te
          daremos la oportunidad de revisar y aceptar los nuevos términos antes
          de que entren en vigencia. 
          <br>
          <br>
          <br>
          Estas políticas y términos proporcionan una
          visión más completa de cómo se manejan los datos y cómo se utilizan
          los servicios de Oro Bótico. Ten en cuenta que estos son solo ejemplos
          y puedes personalizarlos según las necesidades específicas de tu
          plataforma.
        </li>
      </ul>
    </div>
  </page>
</template>

<script>
export default {
  data: () => ({
    breadcrumbItems: [
      {
        text: "Inicio",
        disabled: false,
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Términos y Condiciones de Uso",
        disabled: true,
        icon: "mdi-eye-lock",
        to: "/privacy",
      },
    ],
  }),
};
</script>

<style lang="scss">
  ul {
    list-style: none;
    li {
      margin-bottom: 27px;
    }
  }
</style>
