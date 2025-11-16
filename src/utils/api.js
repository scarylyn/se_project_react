const baseUrl = "http://localhost:3001";
const headers = { "Content-type": "application/json" };

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};
