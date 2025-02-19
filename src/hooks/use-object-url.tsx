import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NewPropertyFormType } from '@/lib/types';


export function useObjectUrl(
  form: UseFormReturn<NewPropertyFormType>,
  index: number
): string {
  // Instead of using an internal method (_getWatch), we use watch to subscribe to the file.
  // Note: You may also use useWatch for finer control.
  const file = form.watch(`tour_images.${index}`) as File | undefined;
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (file) {
      const newURL = URL.createObjectURL(file);
      setUrl(newURL);
      // Clean up: revoke the URL if the file changes or component unmounts.
      return () => {
        URL.revokeObjectURL(newURL);
      };
    } else {
      setUrl('');
    }
  }, [file]);

  return url;
}