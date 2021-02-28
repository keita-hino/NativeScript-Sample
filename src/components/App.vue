<template>
  <Page>
    <ActionBar title="Zenn記事一覧"/>
    <GridLayout columns="*" rows="*">
      <Button v-if="!articles" text="Button" @tap="onClick" />

      <template v-if="articles">
        <ListView 
          for="item in articles" 
          :items="articles"
          @itemTap="onButtonTap"
        >
          <v-template>
            <Label :text="item.title" />
          </v-template>
        </ListView>
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
      
      const onClick = async() => {        
        // Zenn
        const resnponse = await fetchZennArticles()
        articles.value = resnponse.data.articles
      }

      const onButtonTap = () => {

      }

      return {
        articles,
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
</style>
