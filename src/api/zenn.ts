import zennAxios from '../lib/zennAxios'

export const fetchZennArticles = async () => await zennAxios.get(`/articles`);

export const searchZennArticles = async (searchText: string) => await zennAxios.get(`/search?q=${searchText}&source=articles&page=1`);
