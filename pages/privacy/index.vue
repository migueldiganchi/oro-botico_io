<template>
  <page
    :breadcrumbs="breadcrumbItems"
    name="privacy"
    title="Políticas de Privacidad"
    description="Comprende cómo usamos la información de nuestros usuarios"
  >
    <div class="box mx-auto text-justify mt-15">
      Las <b>Políticas de Privacidad de Oro Bótico</b> es aplicable a todos
      los usuarios del sitio web desde el momento de la navegación por el mismo
      y/o de la aceptación de los Términos y Condiciones de Uso, y tiene como
      objetivo que los usuarios conozcan el trato que LC les dar a sus datos
      personales.

      <ol class="mt-3 pa-3">
        <li class="pl-3 mb-6">
          <b>Disposiciones generales.</b> Toda información y datos
          proporcionados voluntariamente por los alumnos durante la asistencia a
          nuestros cursos, es incluida en una base de datos cuyo objetivo es el
          de proporcionar un servicio personalizado y a la altura de las
          necesidades de los alumnos. Esos datos también podrán ser utilizados
          por LC para elaborar estadísticas, estudios de mercado y diseñar
          campañas de marketing. Oro Bótico adoptará los recaudos técnicos y
          organizativos necesarios en lo que respecta a la custodia,
          almacenamiento y conservación de la información con el fin de evitar
          su alteración o acceso no autorizado, como todos los resguardos
          legales necesarios para asegurar la protección de los datos personales
          y la privacidad de acuerdo a lo establecido por la Ley 25.326 de
          Protección de Datos Personales, el Decreto Reglamentario 1558/2001 y
          las Disposiciones de la Dirección Nacional de Protección de Datos
          Personales (DNPDP). La presente Política de Privacidad se aplica a
          toda información personal de los usuarios que se hayan obtenido por la
          utilización del sitio web y de la contratación de los servicios
          ofrecidos en el mismo. Debido a que la gran mayoría de las actividades
          se realizan bajo transmisión de datos vía Internet, el alumno es
          consciente de los riesgos que implican transferir información a través
          de medios online, asumiendo los riesgos propios de utilizar este tipo
          de plataformas virtuales.
        </li>

        <li class="pl-3 mb-6">
          <b>Finalidad.</b> El uso de los datos proporcionados se utiliza para
          validar la identidad del usuario y la correcta proveeduría de los
          servicios adquiridos, tanto como la fiabilidad y cumplimiento de las
          normas de uso y políticas de permanencia en la comunidad.
          Notificaciones pertinentes y de interés referidos a los servicios de
          Oro Bótico. Las mismas no serán compartidas en ninguna ocasión y
          bajo ningún aspecto con otra empresa o entidad externa, quedando sus
          datos resguardados bajo la normativa de la ley 25.326 de Protección de
          los Datos Personales de Argentina.
        </li>

        <li class="pl-3 mb-6">
          <b>Datos sensibles.</b> En cumplimiento de lo establecido en los arts.
          2, 7 y 8 de la Ley 25.326, Oro Bótico no solicitará información
          que sea incompatible con la finalidad del sitio web o de sus
          servicios, ni que directa o indirectamente revele datos sensibles de
          los usuarios, como ser datos que revelan origen racial y étnico,
          opiniones políticas, convicciones religiosas, filosóficas o morales,
          afiliación sindical, información referente a la salud o a la vida
          sexual. De la misma manera Oro Bótico sugiere a los usuarios no
          incluir esta información en el sitio web.
        </li>

        <li class="pl-3 mb-6">
          <b>Administración de la información.</b> Oro Bótico utilizará la
          información para los siguientes fines: a) identificación y
          autenticación, b) administración y gestión comercial, c) mejora del
          servicio, d) fines estadísticos, e) envío de notificaciones,
          promociones o publicidad y actividades similares. Los datos personales
          no serán difundidos ni empleados para un fin distinto o incompatible
          al tenido en cuenta al ser ingresados en la base.
        </li>

        <li class="pl-3 mb-6">
          <b>Uso de cookies.</b> Los usuarios conocen y aceptan de plena
          conformidad que Oro Bótico podrá utilizar un sistema de
          seguimiento mediante el uso de cookies. Las Cookies son archivos que
          se alojan en el disco rígido, con una duración limitada en el tiempo
          que ayudan a personalizar los servicios. Las mismas permitirán recoger
          datos a efectos de la autenticación de usuarios, validación de
          identidad y para evaluar el comportamiento y la demografía de los
          usuarios con el fin de ofrecerles un mejor servicio. Asimismo, podrán
          utilizarse con fines estadísticos tales como: fecha de la primera
          visita, número de veces que se ha visitado, fecha de la última visita,
          URL y dominio de la que proviene, explorador utilizado, resolución de
          la pantalla, entre otras acciones del Usuario. También son utilizadas
          las Cookies para promover y hacer cumplir las reglas y seguridad del
          sitio. Toda esta información no será asociada a los datos personales
          de los usuarios.
        </li>

        <li class="pl-3 mb-6">
          El sitio web puede contener enlaces o links publicitarios con sitios
          web de terceros o con los brokers recomendados. Sin embargo LC no
          dispone de control alguno ni ostenta responsabilidad alguna sobre las
          políticas o medidas de protección de datos de otras aplicaciones y/o
          sitios web.
        </li>
      </ol>
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
