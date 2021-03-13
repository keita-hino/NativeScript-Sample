<template>
  <Page>
    <ActionBar title="検索フォーム"/>
    <GridLayout columns="*" rows="*">
      <SearchBar hint="Zennで検索したいキーワードを入力してください" v-model="searchText" @submit="onSearch()" />
      <!-- 後々、検索機能付けたらページも分ける or モーダルでも良いかも -->
      <ActivityIndicator :busy="isLoading"/>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import { searchZennArticles } from '../api/zenn'
  import Articles from './Articles.vue'
  import Vue from "nativescript-vue"

  export default defineComponent({
    components: {
      Articles
    },
    setup(){
      const articles = ref();
      const isLoading = ref(false);
      const searchText = ref('')
      
      const onSearch = async() => {      
        isLoading.value = true;
        const encodedURI = encodeURI(searchText.value)
        
        const resnponse = await searchZennArticles(encodedURI);
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
        searchText,
        isLoading,
        onSearch
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
