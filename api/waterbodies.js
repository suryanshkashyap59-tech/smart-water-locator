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
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: `data=${encodeURIComponent(query)}`
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Overpass returned ${response.status}`
      })
    }

    const data = await response.json()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
