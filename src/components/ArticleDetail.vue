<template>
  <Page>
    <ActionBar title="記事詳細"/>
    <GridLayout columns="*" rows="*">
      <!-- TODO: 一時的に表示切り替えにしてるけど、後々ページ遷移できるようにしたい -->
      <template>
        <WebView :src="articlePage" />
      </template>
    </GridLayout>
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
