import useSWR from "swr";

const accountEndpoint =
  "https://todo-project-backend.herokuapp.com/api/protected/myaccount";

const fetchWithToken = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching user account data"
    );
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export function useUser() {
  const localStorageToken = localStorage.getItem("token");
  const { data, error } = useSWR(
    [accountEndpoint, localStorageToken],
    fetchWithToken
  );
  return {
    user: data,
    isLoading: !data && !error,
    Error: error,
  };
}
