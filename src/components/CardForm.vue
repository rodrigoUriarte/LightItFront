<template>
<!--  <ValidationObserver ref="form" v-slot="{ handleSubmit }">-->
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
            :label="submitLabel?submitLabel:'Save'"
          >
          </Button>
          <router-link v-if="backRoute" :to="backRoute">
            <Button  label="Back" class="p-button-secondary"></Button>
          </router-link>
        </template>
      </Card>
    </form>
<!--  </ValidationObserver>-->
</template>

<script>
//import {ValidationObserver} from 'vee-validate';

export default {
  //components: {ValidationObserver},
  name: "CardForm",
  props: ['title', 'backRoute', 'loading', 'validationMessage', 'submitLabel'],

  methods: {
    async save() {
      this.$emit('save');
    }
  }

}
</script>

<style scoped>

</style>
