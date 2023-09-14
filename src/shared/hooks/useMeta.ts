import { useEffect } from 'react';

type UseMetaProps = {
  title: string;
};

export function useMeta({ title }: UseMetaProps): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
