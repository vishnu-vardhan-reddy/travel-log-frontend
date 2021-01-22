const API_URL = "http://localhost:1337";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function postLogEntries(entry) {
  await fetch("http://localhost:1337/api/logs", {
    // Adding method type
    method: "POST",
    body: JSON.stringify(entry),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
