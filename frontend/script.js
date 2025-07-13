fetch('/api/assets')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#assets tbody');
    data.forEach(asset => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${asset.symbol}</td><td>${asset.name}</td><td>$${asset.price}</td><td>$${asset.marketCap}</td>`;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error(err));
