import jsPDF from 'jspdf'
export default function DashboardPage({ result, formData, onBack }) {
  const score = result?.score || 0

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

const successProbability = confidence + 5


const recommendedDepth =
  score >= 80
    ? "80–120 ft"
    : score >= 60
    ? "140–180 ft"
    : "220–300 ft"

const downloadReport = () => {
  const pdf = new jsPDF()

  pdf.setFontSize(20)
  pdf.text('Smart Water Locator Report', 20, 20)

  pdf.setFontSize(12)
  pdf.text(`Groundwater Score: ${score}/100`, 20, 40)
  pdf.text(`Potential: ${potential}`, 20, 50)
  pdf.text(`Risk Level: ${risk}`, 20, 60)
  pdf.text(`Recommended Depth: ${recommendedDepth}`, 20, 70)

  pdf.text('Assessment Details', 20, 90)
  pdf.text(`Location: ${formData?.location || 'N/A'}`, 20, 100)
  pdf.text(`Soil Type: ${formData?.soilType || 'N/A'}`, 20, 110)
  pdf.text(`Rainfall: ${formData?.rainfall || 'N/A'} mm`, 20, 120)
  pdf.text(`River Distance: ${formData?.riverDistance || 'N/A'} km`, 20, 130)
  pdf.text(`Vegetation: ${formData?.vegetation || 'N/A'}`, 20, 140)
  pdf.text(`Nearby Borewells: ${formData?.borewells || 'N/A'}`, 20, 150)

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
  <p><strong>Soil Type:</strong> {formData?.soilType}</p>
  <p><strong>Rainfall:</strong> {formData?.rainfall} mm</p>
  <p><strong>River Distance:</strong> {formData?.riverDistance} km</p>
  <p><strong>Vegetation:</strong> {formData?.vegetation}</p>
  <p><strong>Nearby Borewells:</strong> {formData?.borewells}</p>
</div>
...


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
