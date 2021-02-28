import zennAxios from '../lib/zennAxios'

export const fetchZennArticles = async () => await zennAxios.get(`/articles`);