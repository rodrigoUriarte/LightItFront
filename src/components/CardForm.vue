<template>
    <form @submit.prevent="save">
      <Card>
        <template #title>
          {{ title }}
        </template>
        <template #content>
          <slot name="content"></slot>
        </template>
        <template #footer>
          <span class="mr-2">
            <Button
              class="mr-1"
              type="submit"
              :disabled="loading"
              :label="submitLabel"
            >
            </Button>
          </span>
          <slot name="footer"></slot>
        </template>
      </Card>
    </form>
</template>

<script>

export default {
  name: "CardForm",
  props: ['title', 'loading', 'submitLabel'],

  methods: {
    async save() {
      this.$emit('save');
    }
  }

}
</script>

<style scoped>

</style>
