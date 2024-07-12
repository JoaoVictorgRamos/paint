<template>
  <div class="avatar">
    <div
      class="initials photo avatar-size"
      :style="{
        cursor: cursor,
        position: 'relative',
      }"
    >
      {{ initials ? initials : "--" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "--",
    },
    cursor: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {};
  },
  computed: {
    initials() {
      // função para remover caracteres especiais
      function cleanName(name) {
        return name.replace(/[^a-zA-ZÀ-ÿ]/g, "");
      }

      const names = this.placeholder
        .trim()
        .split(" ")
        .map(cleanName)
        .filter((name) => name.length > 0);

      // pega a primeira letra do nome e do sobrenome
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }

      // se tiver apenas um nome, pega as duas primeiras letras desse nome
      const singleName = cleanName(this.placeholder);
      return singleName.slice(0, 2).toUpperCase();
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  position: relative;

  .no-photo {
    border-color: transparent !important;
  }

  .photo {
    border-radius: 50%;
    border: 1px solid #c8eae7;

    background-color: #e1f4f3;
    color: #009488;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    text-transform: capitalize;
    object-fit: cover;
  }

  .initials {
    user-select: none;
    z-index: 999;
  }
}

.avatar-size {
  width: 45px;
  height: 45px;

  font-size: 24px;
}
</style>
