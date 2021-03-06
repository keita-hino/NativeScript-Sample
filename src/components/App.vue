<template>
  <Page>
    <ActionBar title="記事一覧"/>
    <GridLayout columns="*" rows="*">
      <!-- 後々、検索機能付けたらページも分ける or モーダルでも良いかも -->
      <Button v-if="!articles" text="Zennの記事取得しまっせ！" @tap="onClick()" />
      <ActivityIndicator :busy="isLoading"/>

      <template v-if="articles">
        <ListView 
          for="article in articles" 
          :items="articles"
          class="list-article"
          @itemTap="onButtonTap"
        >
          <v-template>
            <Label
              :text="titleWithEmoji(article)" 
              class="article-title"
            />
          </v-template>
        </ListView>
      </template>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import { fetchZennArticles } from '../api/zenn'
  import ArticleDetail from './ArticleDetail.vue'
  import Vue from "nativescript-vue"

  export default defineComponent({
    components: {
      ArticleDetail
    },
    setup(){
      const articles = ref();
      const isLoading = ref(false);
      const articlePage = ref('')
      
      const onClick = async() => {      
        isLoading.value = true;
        // Zenn
        const resnponse = await fetchZennArticles();
        articles.value = resnponse.data.articles;

        isLoading.value = false;
      }

      const titleWithEmoji = (article) => `${article.emoji} ${article.title}`

      const onButtonTap = (event) => {
        Vue.prototype.$navigateTo(ArticleDetail, {
          props: {
            articlePage: `https://zenn.dev/${event.item.user.username}/articles/${event.item.slug}`
          }
        });
      }

      return {
        articles,
        isLoading,
        articlePage,
        titleWithEmoji,
        onClick,
        onButtonTap
      }
    }
  })
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #ffffff;
  }

  .list-article {
    margin: 20, 15;
    font-size: 30;
    border-radius: 20;
  }

  .article-title {
    font-size: 20;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
