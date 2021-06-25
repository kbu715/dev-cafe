import { useState, useCallback } from 'react';

const useInput = (initValue = null) => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
