import { useNavigate, useLocation } from "react-router-dom";

export const useUpdateQueryParam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateQueryParam = (keyOrParams, value) => {
    const searchParams = new URLSearchParams(location.search);

    // If first argument is an array of objects
    if (Array.isArray(keyOrParams)) {
      keyOrParams.forEach(({ key, value }) => {
        if (value) {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });
    }
    // If first argument is a string (key) and second argument is the value
    else {
      const key = keyOrParams;
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return updateQueryParam;
};
