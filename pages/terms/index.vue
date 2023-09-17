<template>
  <page
    :breadcrumbs="breadcrumbItems"
    name="terms"
    title="Términos y Condiciones de Uso"
    description="Conoce las reglas y condiciones de nuestra solución"
  >
    <div class="box mx-auto text-justify mt-15">
      <ul>
        <li>
          <b>1. Aceptación de los Términos: </b>
          Por supuesto, aquí tienes las políticas de privacidad y los términos
          de uso más extendidos: Términos de Uso 1. Aceptación de los Términos
          Bienvenido a Oro Bótico, el servicio que te permite crear asistentes
          virtuales para la enseñanza de trading. El uso de Oro Bótico está
          sujeto a los siguientes términos y condiciones. Al acceder o utilizar
          nuestros servicios, aceptas estos términos y condiciones y te
          comprometes a cumplirlos. Si no estás de acuerdo con estos términos,
          no uses Oro Bótico.
        </li>

        <li>
          <b>2. Uso de Oro Bótico: </b>Oro Bótico te permite crear asistentes
          virtuales de enseñanza de trading. Tienes la responsabilidad de
          garantizar que el contenido generado cumpla con todas las leyes
          aplicables. No debes utilizar Oro Bótico para actividades ilegales o
          dañinas.
        </li>

        <li>
          <b>3. Propiedad Intelectual: </b>Todo el contenido generado en Oro
          Bótico es propiedad de los usuarios. No obstante, al utilizar nuestros
          servicios, nos otorgas una licencia para usar, modificar y distribuir
          ese contenido con fines de funcionamiento, promoción y mejora de Oro
          Bótico.
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
        icon: "mdi-scale-balance",
        to: "/terms",
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
