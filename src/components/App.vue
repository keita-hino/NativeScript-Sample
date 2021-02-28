<template>
  <Page>
    <ActionBar title="Zenn記事一覧"/>
    <GridLayout columns="*" rows="*">
      <Button v-if="!articles" text="Zennの記事取得しまっせ！" @tap="onClick()" />
      <ActivityIndicator :busy="isLoading"/>

      <template v-if="articles && !articlePage">
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

      <!-- TODO: 一時的に表示切り替えにしてるけど、後々ページ遷移できるようにしたい -->
      <template v-if="articlePage">
        <WebView :src="articlePage" />
      </template>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/composition-api';
  import { fetchZennArticles } from '../api/zenn'

  export default defineComponent({
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

      const titleWithEmoji = (article) => { return `${article.emoji} ${article.title}` }

      const onButtonTap = (event) => {
        articlePage.value = `https://zenn.dev/${event.item.user.username}/articles/${event.item.slug}`
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
