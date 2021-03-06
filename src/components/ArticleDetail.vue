<template>
  <Page>
    <ActionBar title="記事詳細"/>
    <template>
      <WebView :src="articlePage" />
    </template>
  </Page>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  export default defineComponent({
    props: {
      articlePage: {
        type: String,
        required: true
      }
    },
    setup(){
      return {
      }
    }
  })
</script>

<style scoped>
</style>
