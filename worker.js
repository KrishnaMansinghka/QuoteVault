export default {
  async fetch(request, env) {
    const { prompt } = await request.json();
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        stream: true
      })
    });
    return new Response(resp.body, { headers: { 'Content-Type': 'text/event-stream' } });
  }
};
