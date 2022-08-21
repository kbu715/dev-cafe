import { useState, useCallback, SetStateAction, Dispatch } from 'react';

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T extends string>(initValue: T): ReturnType<T> => {
  const [value, setValue] = useState<T>(initValue);
  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
