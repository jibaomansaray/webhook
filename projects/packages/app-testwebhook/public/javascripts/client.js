window.onload = () => {
  const client = io()
  const content = document.getElementById('content');
  client.on('connected', () => {
    console.log('we are connected to the backend');
  })

  client.on('new_payload', (payload) => {
    content.innerHTML += `<pre>${JSON.stringify(payload)}</pre>`
  });
}