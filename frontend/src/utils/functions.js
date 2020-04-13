/* eslint-disable no-param-reassign */
/* eslint-disable prefer-spread */
/* eslint-disable camelcase */

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const chunkArray = (array, size) => {
  if (array.length <= size) return [array];
  const chunk_size = Math.round(array.length / size);

  return [].concat.apply([],
    array.map((elem, i) => (i % chunk_size ? [] : [array.slice(i, i + chunk_size)])));
};

export const getFakeGallery = (keywords = ['Horses', 'Mountains', 'Cats'], limit = 10) => {
  const galleries = {};
  const url = 'https://source.unsplash.com/random/';

  keywords.map((keyword) => {
    const gallery = [];
    for (let i = 0; i < limit; i++) {
      gallery.push({
        url: `${url}?${keyword}/${i}`,
        galleryName: keyword,
        key: String(getRandomInt(1, 10000)),
        size: 2 * 1024 * 1024,
      });
    }


    galleries[keyword] = gallery;
    return gallery;
  });

  return galleries;
};
