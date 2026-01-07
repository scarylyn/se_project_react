const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const addCardLike = ({ id, isLiked, token }) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      isLiked,
      token,
    }),
  }).then(handleServerResponse);
};

export const removeCardLike = ({ id, isLiked, token }) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      isLiked,
      token,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
