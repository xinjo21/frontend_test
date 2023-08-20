export async function getUsers() {
  return fetch(`https://randomuser.me/api/?nat=us&results=25`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
}
