export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query

    const query = `
      [out:json];
      (
        way["waterway"](around:5000,${lat},${lon});
        way["natural"="water"](around:5000,${lat},${lon});
      );
      out center tags;
    `

    const response = await fetch(
      "https://lz4.overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
        headers: {
          "Content-Type": "text/plain"
        }
      }
    )

    const text = await response.text()

    return res.status(200).json({
      status: response.status,
      preview: text.substring(0, 500)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
