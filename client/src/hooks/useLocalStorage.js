import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  let saved = localStorage.getItem(key) || "";
  if (saved.startsWith("{") || saved.startsWith("[")) saved = JSON.parse(saved);
  return saved || defaultValue;
}

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    // console.log("coucou");
    // console.log(storedVal);
    // console.log(key);
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, storedVal);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
