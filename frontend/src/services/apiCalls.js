import api from './api';
import { getFakeGallery } from '../utils/functions';

export const getImages = async () => {
  try {
    const galleries = await api.get('/public/images/');
    return galleries.data;
  } catch (error) {
    const galleries = getFakeGallery();
    return galleries;
  }
};

export const deleteImage = async (id) => {
  await api.delete(`/private/images/${id}`);
};

export const sendEmail = async (email, name, text) => {
  try {
    await api.post('public/email', { email, name, text });
  } catch (error) {
    throw Error(error);
  }
};
