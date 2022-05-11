async function addSeat(seat) {
  const response = await fetch(`${process.env.API_URL}/Api/Seats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(seat),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw Error(response.statusText);
}

async function updateSeat(id, seat) {
  const response = await fetch(`${process.env.API_URL}/Api/Seats`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(seat),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw Error(response.statusText);
}

async function deleteSeat(id) {
  const response = await fetch(`${process.env.API_URL}/Api/Seats/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return true;
  }

  throw Error(response.statusText);
}

export default { addSeat, updateSeat, deleteSeat };
