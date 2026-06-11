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
const downloadReport = () => {
  const pdf = new jsPDF()

  pdf.setFontSize(20)
  pdf.text('Smart Water Locator Report', 20, 20)

  pdf.setFontSize(12)
  pdf.text(`Groundwater Score: ${score}/100`, 20, 40)
  pdf.text(`Potential: ${potential}`, 20, 50)
  pdf.text(`Risk Level: ${risk}`, 20, 60)
  pdf.text('Recommended Depth: 140-180 ft', 20, 70)

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

        <p className="text-5xl font-bold">
          {score}/100
        </p>

        <div className="w-full bg-gray-300 h-4 rounded-full mt-4">
          <div
            className="bg-cyan-500 h-4 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Potential
          </h3>
          <p>{potential}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Risk Level
          </h3>
          <p>{risk}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-lg mb-2">
            Recommended Depth
          </h3>
          <p>140–180 ft</p>
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
      <div className="border rounded-xl p-6 mt-6">
        <h3 className="font-bold text-xl mb-3">
          Recommendation
        </h3>

        <p>
          {result?.recommendation}
        </p>
      </div>

      <button
        onClick={onBack}
        className="mt-6 px-6 py-3 bg-cyan-500 text-black rounded-lg font-bold"
      >
<button
  onClick={downloadReport}
  className="mt-6 mr-4 px-6 py-3 bg-green-500 text-black rounded-lg font-bold"
>
  Download PDF Report
</button> 
       Back
      </button>
    </div>
  )
}
