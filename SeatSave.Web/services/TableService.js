async function getTables() {
  const response = await fetch(`${process.env.API_URL}/Api/Table/`);

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  throw Error(response.statusText);
}

async function addTable(table) {
  const response = await fetch(`${process.env.API_URL}/Api/Table`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(table),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw Error(response.statusText);
}

async function updateTable(id, table) {
  const response = await fetch(`${process.env.API_URL}/Api/Table`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(table),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw Error(response.statusText);
}

async function deleteTable(id) {
  const response = await fetch(`${process.env.API_URL}/Api/Table/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return true;
  }

  throw Error(response.statusText);
}

export default {
  getTables,
  addTable,
  updateTable,
  deleteTable,
};
