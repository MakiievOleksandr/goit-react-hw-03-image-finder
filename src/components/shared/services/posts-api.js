import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',

  params: {
    key: '32078323-17ec3356a58d20a3806b52452',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImage = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });

  return { data, perPage: instance.defaults.params.per_page };
};

export const getAllPosts = async () => {
  const { data } = await instance.get('/');
  return data;
};
