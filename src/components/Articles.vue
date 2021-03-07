<template>
  <Page>
    <ActionBar title="記事一覧"/>
    <GridLayout columns="*" rows="*">
      <template>
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
  import ArticleDetail from './ArticleDetail.vue'
  import Vue from "nativescript-vue"

  export default defineComponent({
    components: {
      ArticleDetail
    },
    props: {
      articles: {
        type: Array
      }
    },
    setup(){
      const articlePage = ref('')
      
      const titleWithEmoji = (article) => `${article.emoji} ${article.title}`

      const onButtonTap = (event) => {
        Vue.prototype.$navigateTo(ArticleDetail, {
          props: {
            articlePage: `https://zenn.dev/${event.item.user.username}/articles/${event.item.slug}`
          }
        });
      }

      return {
        articlePage,
        titleWithEmoji,
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

