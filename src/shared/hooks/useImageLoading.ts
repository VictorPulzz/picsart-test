import { useCallback, useEffect, useMemo, useState } from 'react';

export const useImageLoading = (
  src?: Nullable<string>,
): {
  isLoading: boolean;
  image: Nullable<string>;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<Nullable<string>>(null);

  const loadImage = useCallback((): Promise<HTMLImageElement> => {
    if (!src) return Promise.reject(new Error('Image not setup'));
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = e => reject(e);
    });
  }, [src]);

  useEffect(() => {
    (async () => {
      try {
        const { src } = await loadImage();
        setImage(src);
      } catch (e) {
        setImage(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadImage]);

  return useMemo(
    () => ({
      isLoading,
      image,
    }),
    [isLoading, image],
  );
};
