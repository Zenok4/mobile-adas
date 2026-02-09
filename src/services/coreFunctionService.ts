import { api } from '../libs/api';
import { ApiUrls } from '../types/apiUrls';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const CoreFunctionService = {
  // Nhận diện buồn ngủ
  drowsy: (
    imageBase64: string,
    user_id?: string,
    latitude?: number,
    longitude?: number,
  ) => {
    return api.post(ApiUrls.core_functions.drowsy, {
      image_base64: imageBase64,
      session_id: uuidv4(), // Đã thay đổi từ randomBytes
      user_id: user_id,
      latitude: latitude,
      longitude: longitude,
    });
  },

  // Nhận diện biển báo
  sign: async (
    imageBase64: string,
    user_id?: string,
    latitude?: number,
    longitude?: number,
  ) => {
    return await api.post(ApiUrls.core_functions.sign, {
      image_base64: imageBase64,
      user_id: user_id,
      latitude: latitude,
      longitude: longitude,
    });
  },

  // Nhận diện vật cản
  object: async (
    imageBase64: string,
    user_id?: string,
    latitude?: number,
    longitude?: number,
  ) => {
    return await api.post(ApiUrls.core_functions.object, {
      image_base64: imageBase64,
      user_id: user_id,
      latitude: latitude,
      longitude: longitude,
    });
  },

  // Nhận diện làn đường
  predictLane: async (imageBase64: string, user_id?: string) => {
    return await api.post(ApiUrls.core_functions.lane, {
      image_base64: imageBase64,
      user_id: user_id,
    });
  },
};
