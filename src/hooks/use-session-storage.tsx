import { useState, useEffect, useCallback } from "react";

function useSessionStorage<T = unknown>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);

  const isClient = typeof window !== "undefined";

  const getStoredValue = useCallback(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [isClient, key, initialValue]);

  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [getStoredValue]);

  const setValue = (value: T | ((val: T | undefined) => T)) => {
    if (!isClient) {
      console.warn(`Tried setting sessionStorage key "${key}" during SSR`);
      return;
    }
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  const removeItem = () => {
    if (!isClient) {
      console.warn(`Tried removing sessionStorage key "${key}" during SSR`);
      return;
    }
    try {
      setStoredValue(undefined);
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeItem] as [
    T | undefined,
    typeof setValue,
    typeof removeItem,
  ];
}

export default useSessionStorage;
