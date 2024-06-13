import { useEffect, useRef } from 'react';

const useScrollToBottom = (dataDependency: unknown) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [dataDependency]);

  return ref;
};


export default useScrollToBottom;