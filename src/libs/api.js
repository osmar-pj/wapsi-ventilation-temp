export async function GetData(endpoint) {
  const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Error en la petición");
  }
}

export async function PutData( endpoint, data) {
  const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Error en la petición");
  }
}

export async function PostData(endpoint, data) {
  const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Error en la petición");
  }
}

export async function DeleteData(endpoint) {
  const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
   
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Error en la petición");
  }
}
