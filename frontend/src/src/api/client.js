const API_BASE = "http://localhost:1234"; // backend port

export async function registerUser(payload) {
  return fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}
