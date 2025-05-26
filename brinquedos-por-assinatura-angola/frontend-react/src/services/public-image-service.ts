
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const publicImageService = {
  getImageUrl: (filename: string): string => {
    return `${BASE_URL}/public/${filename}`;
  }
};

export default publicImageService;
