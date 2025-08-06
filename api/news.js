export default async function handler(req, res) {
  const apiKey = process.env.NEWS_API_KEY;
  const query = req.query.query || "India";

  if (!apiKey) {
    return res.status(500).json({ error: "API key not set in environment variables" });
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`);
    const data = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json({ error: data.message || "News API error" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
