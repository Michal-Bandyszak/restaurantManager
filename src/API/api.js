// Lista funkcji z fetch request np. sam fetch


export function getAllShifts() {
  return fetch('http://localhost:8088/shift/all')
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json()
  })
}
