<template>
  <Page>
    <ActionBar title="記事一覧"/>
    <GridLayout columns="*" rows="*">
      <!-- 後々、検索機能付けたらページも分ける or モーダルでも良いかも -->
      <Button text="Zennの記事取得しまっせ！" @tap="onClick()" />
      <ActivityIndicator :busy="isLoading"/>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import { fetchZennArticles } from '../api/zenn'
  import Articles from './Articles.vue'
  import Vue from "nativescript-vue"

  export default defineComponent({
    components: {
      Articles
    },
    setup(){
      const articles = ref();
      const isLoading = ref(false);
      
      const onClick = async() => {      
        isLoading.value = true;
        // Zenn
        const resnponse = await fetchZennArticles();
        articles.value = resnponse.data.articles;

        if(articles.value){
          Vue.prototype.$navigateTo(Articles, {
            props: {
              articles: articles.value
            }
          });
        }

        isLoading.value = false;
      }

      return {
        articles,
        isLoading,
        onClick,
      }
    }
  })
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
</style>
