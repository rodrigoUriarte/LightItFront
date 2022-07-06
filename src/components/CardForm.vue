<template>
    <form @submit.prevent="save">
      <Card>
        <template #title>
          {{ title }}
        </template>
        <template #content>
          <div class="formgrid grid">
            <div v-if="validationMessage" class="col-12">
              <Message severity="error" class="mt-0" :closable="false">{{ validationMessage }}</Message>
            </div>
          </div>
          <slot name="content"></slot>
        </template>
        <template #footer>
          <Button
            class="mr-1"
            type="submit"
            :disabled="loading"
            :label="submitLabel"
          >
          </Button>
        </template>
      </Card>
    </form>
</template>

<script>

export default {
  name: "CardForm",
  props: ['title', 'loading', 'validationMessage', 'submitLabel'],

  methods: {
    async save() {
      this.$emit('save');
    }
  }

}
</script>

<style scoped>

</style>
