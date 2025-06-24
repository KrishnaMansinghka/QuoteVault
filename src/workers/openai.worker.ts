self.onmessage = async (e) => {
  const prompt = e.data;
  const resp = await fetch('/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' }
  });
  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let done = false;
  while (!done) {
    const { value, done: d } = await reader.read();
    if (value) self.postMessage(decoder.decode(value));
    done = d;
  }
  self.postMessage('[END]');
};
export default {};
