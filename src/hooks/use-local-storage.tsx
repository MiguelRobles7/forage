import { useState, useEffect, useCallback } from "react";

function useLocalStorage<T = unknown>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);

  const isClient = typeof window !== "undefined";

  const getStoredValue = useCallback(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [isClient, key, initialValue]);

  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [getStoredValue]);

  const setValue = (value: T | ((val: T | undefined) => T)) => {
    if (!isClient) {
      console.warn(`Tried setting localStorage key "${key}" during SSR`);
      return;
    }
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeItem = () => {
    if (!isClient) {
      console.warn(`Tried removing localStorage key "${key}" during SSR`);
      return;
    }
    try {
      setStoredValue(undefined);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeItem] as [
    T | undefined,
    typeof setValue,
    typeof removeItem,
  ];
}

export default useLocalStorage;
