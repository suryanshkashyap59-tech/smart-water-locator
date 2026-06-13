import jsPDF from 'jspdf'
import LocationMap from "../maps/LocationMap"

export default function DashboardPage({ result, formData, onBack }) {
  const score = result?.score || 0

const history = JSON.parse(
localStorage.getItem("assessmentHistory") || "[]"
)

  const potential =
    score >= 80
      ? 'HIGH'
      : score >= 60
      ? 'MODERATE'
      : 'LOW'

  const risk =
    score >= 80
      ? 'LOW'
      : score >= 60
      ? 'MEDIUM'
      : 'HIGH'
const confidence =
  score >= 80
    ? 92
    : score >= 60
    ? 84
    : 72


const rating =
  score >= 90
    ? "EXCELLENT"
    : score >= 75
    ? "GOOD"
    : score >= 60
    ? "MODERATE"
    : "POOR"

const successProbability = confidence + 5


let recommendedDepth


if (result?.rainfall > 1500) {
  recommendedDepth = "80–120 ft"
} else if (result?.rainfall > 1000) {
  recommendedDepth = "120–180 ft"
} else if (result?.rainfall > 500) {
  recommendedDepth = "180–250 ft"
} else {
  recommendedDepth = "250–400 ft"
}

const downloadReport = () => {
  const pdf = new jsPDF()

pdf.setFontSize(22)
pdf.text("SMART WATER LOCATOR", 20, 20)

pdf.setFontSize(16)
pdf.text("Groundwater Assessment Report", 20, 30)

pdf.setFontSize(10)
pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 40)

pdf.setFontSize(14)
pdf.text("EXECUTIVE SUMMARY", 20, 55)

pdf.setFontSize(11)
pdf.text(`Location: ${formData?.location || "N/A"}`, 20, 65)
pdf.text(`Groundwater Score: ${score}/100`, 20, 72)
pdf.text(`Groundwater Potential: ${potential}`, 20, 79)
pdf.text(`Risk Level: ${risk}`, 20, 86)
pdf.text(`Recommended Depth: ${recommendedDepth}`, 20, 93)

pdf.addPage()

pdf.setFontSize(18)
pdf.text("AI ANALYSIS & RECOMMENDATIONS", 20, 20)

pdf.setFontSize(11)
pdf.text(`This location demonstrates ${potential.toLowerCase()} groundwater potential based on rainfall, soil type, vegetation density, elevation and borewell evidence.`, 20, 40, { maxWidth: 170 })

pdf.text(`Recommendation: ${result?.recommendation}`, 20, 70, { maxWidth: 170 })

pdf.text(`Estimated Success Probability: ${successProbability}%`, 20, 100)

pdf.text("Why this score?", 20, 120)
pdf.text(`• Rainfall contributed ${result?.rainfallScore} points.`, 25, 130)
pdf.text(`• Soil contributed ${result?.soilScore} points.`, 25, 138)
pdf.text(`• Vegetation contributed ${result?.vegetationScore} points.`, 25, 146)
pdf.text(`• Elevation contributed ${result?.elevationScore} points.`, 25, 154)
pdf.text(`• Water Bodies contributed ${result?.riverScore} points.`, 25, 162)
pdf.text(`• Borewells contributed ${result?.borewellScore} points.`, 25, 170)


pdf.setFontSize(14)
pdf.addPage()

pdf.text("SITE INFORMATION", 20, 110)

pdf.setFontSize(11)
pdf.text(`Latitude: ${result?.coordinates?.lat?.toFixed(4) || "N/A"}`, 20, 30)
pdf.text(`Longitude: ${result?.coordinates?.lon?.toFixed(4) || "N/A"}`, 20, 37)
pdf.text(`Soil Type: ${formData?.soilType || "N/A"}`, 20, 44)
pdf.text(`Rainfall: ${result?.rainfall || "N/A"} mm`, 20, 51)
pdf.text(`Elevation: ${result?.elevation || "N/A"} m`, 20, 58)
pdf.text(`Vegetation: ${formData?.vegetation || "N/A"}`, 20, 65)
pdf.text(`Nearby Borewells: ${formData?.borewells || "N/A"}`, 20, 72)

pdf.setFontSize(14)
pdf.text("SCORE BREAKDOWN", 20, 178)

pdf.setFontSize(11)
pdf.text(`Rainfall Score: ${result?.rainfallScore}/30`, 20, 105)
pdf.text(`Soil Score: ${result?.soilScore}/25`, 20, 112)
pdf.text(`Vegetation Score: ${result?.vegetationScore}/15`, 20, 119)
pdf.text(`Elevation Score: ${result?.elevationScore}/20`, 20, 126)
pdf.text(`Water Bodies Score: ${result?.riverScore}/5`, 20, 133)
pdf.text(`Borewell Score: ${result?.borewellScore}/5`, 20, 140)


  pdf.save('groundwater-report.pdf')
}
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Groundwater Assessment Report
      </h1>

      <div className="border rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Groundwater Score
        </h2>

        <p className="text-6xl font-extrabold text-cyan-400">
          {score}/100
        </p>

        <p className="text-xl font-bold mt-3">
          Groundwater Rating: {rating}
        </p>


        <div className="w-full bg-gray-300 h-4 rounded-full mt-4">
          <div
            className="bg-cyan-500 h-4 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Potential
          </h3>
          <p className="text-yellow-400 text-2xl font-bold">{potential}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Risk Level
          </h3>
          <p className="text-orange-400 text-2xl font-bold">{risk}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Confidence
          </h3>
          <p className="text-cyan-400 text-2xl font-bold">
            {confidence}%
          </p>
        </div>


        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Recommended Depth
          </h3>
          <p>{recommendedDepth}</p>
        </div>

      </div>
<div className="border rounded-xl p-6 mt-6">
  <h3 className="font-bold text-xl mb-4">
    Assessment Details
  </h3>

  <p><strong>Location:</strong> {formData?.location}</p>
  <p><strong>Full Location:</strong> {result?.coordinates?.displayName}</p>
  <p><strong>Location Parts:</strong> {result?.coordinates?.displayName?.split(",").join(" | ")}</p>


  <p><strong>Latitude:</strong> {result?.coordinates?.lat?.toFixed(4)}</p>
  <p><strong>Longitude:</strong> {result?.coordinates?.lon?.toFixed(4)}</p>

  <p><strong>Soil Type:</strong> {formData?.soilType}</p>
  <p><strong>Rainfall:</strong> {result?.rainfall} mm (Auto Detected)</p>
  <p><strong>Elevation:</strong> {result?.elevation} m</p>

  <p><strong>Vegetation:</strong> {formData?.vegetation}</p>
  <p><strong>Nearby Borewells:</strong> {formData?.borewells}</p>

<div className="mt-6">
  <h3 className="font-bold text-xl mb-4">Location Map</h3>
  <LocationMap
    lat={result?.coordinates?.lat?.toFixed(4)}
    lon={result?.coordinates?.lon?.toFixed(4)}
    location={result?.coordinates?.displayName}
  />
</div>

</div>

      <div className="border rounded-xl p-6 mt-6 bg-slate-900">
        <h3 className="font-bold text-xl mb-3 text-cyan-400">
          AI Insights
        </h3>

        <p>
          Based on the provided rainfall, soil conditions and vegetation density,
          this location shows {potential.toLowerCase()} groundwater potential.
          Estimated drilling success probability is {successProbability}% with
          a confidence level of {confidence}%.
        </p>

        <p className="mt-3">
          Recommended drilling depth: {recommendedDepth}
        </p>
      </div>

      <div className="border rounded-xl p-6 mt-6">
        <h3 className="font-bold text-xl mb-3">
          Recommendation
        </h3>

        <p>
          {result?.recommendation}
        </p>
      </div>




<div className="border rounded-xl p-6 mt-6">
  <h3 className="font-bold text-xl mb-3">
    📊 Score Breakdown
  </h3>

  <p>🌧 Rainfall: {result?.rainfallScore}/30</p>
  <p>🟫 Soil: {result?.soilScore}/25</p>
  <p>🌱 Vegetation: {result?.vegetationScore}/15</p>
  <p>⛰ Elevation: {result?.elevationScore}/20</p>
  <p>🌊 Water Bodies: {result?.riverScore}/5</p>


  <p>🛢 Borewells: {result?.borewellScore}/5</p>


  <p className="mt-3 font-bold">
    Total Score: {result?.score}/100

  </p>
</div>

<div className="border rounded-xl p-6 mt-6 bg-slate-900">
  <h3 className="font-bold text-xl mb-3 text-cyan-400">
    🧠 Why this score?
  </h3>

  <p>✓ Rainfall of {result?.rainfall} mm contributed positively to groundwater recharge.</p>
  <p>✓ {formData?.soilType} soil influenced water retention capacity.</p>
  <p>✓ {formData?.vegetation} vegetation density affected recharge potential.</p>
  <p>✓ Elevation of {result?.elevation} m impacted groundwater accumulation.</p>
  <p>✓ Nearby borewell information contributed to the final assessment.</p>
</div>


<div className="border rounded-xl p-6 mt-6">
  <h3 className="font-bold text-xl mb-3">
    📜 Assessment History
  </h3>




  {history.length === 0 ? (
    <p>No previous assessments found.</p>
  ) : (
    history.map((item, index) => (
      <div
        key={index}
        className="border-b border-gray-700 py-2"
      >
        <p><strong>📍 Location:</strong> {item.location}</p>
        <p><strong>Score:</strong> {item.score}</p>
        <p><strong>Rainfall:</strong> {item.rainfall} mm</p>
        <p><strong>Date:</strong> {item.date}</p>
      </div>
    ))
  )}

</div>


<div className="border rounded-xl p-6 mt-6">
  <h3 className="font-bold text-xl mb-3">
    🌊 Nearby Water Bodies
  </h3>

  {result?.waterBodies?.length ? (
    result.waterBodies
      .filter(water => water.tags?.name)
      .slice(0,5)
      .map((water, index) => (
        <p key={index}>


          • {water.tags.name}
        </p>
      ))

  ) : (
    <p>No nearby water bodies detected.</p>
  )}
</div>


<p className="mt-2 text-sm text-cyan-400">
  Named Water Bodies Found: {result?.waterBodies?.filter(w => w.tags?.name).length || 0}
</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadReport}
          className="px-6 py-3 bg-green-500 text-black rounded-lg font-bold"
        >
          Download PDF Report
        </button>

        <button
          onClick={onBack}
          className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-bold"
        >
          Back
        </button>
      </div>

    </div>
  )
}
