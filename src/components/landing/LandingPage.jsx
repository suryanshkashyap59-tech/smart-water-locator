import { motion } from 'framer-motion'
import { Droplets, MapPin, BarChart3, ShieldCheck, Globe, FileText } from 'lucide-react'

export default function LandingPage({ onStartAssessment }) {
const features = [
{
icon: <MapPin className="h-8 w-8 text-cyan-400" />,
title: 'Location Intelligence',
desc: 'Analyze environmental conditions and groundwater indicators.'
},
{
icon: <Droplets className="h-8 w-8 text-cyan-400" />,
title: 'Water Potential Score',
desc: 'Estimate groundwater availability before drilling.'
},
{
icon: <BarChart3 className="h-8 w-8 text-cyan-400" />,
title: 'Risk Analysis',
desc: 'Understand drilling risks and improve decision making.'
},
{
icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
title: 'AI Recommendations',
desc: 'Get intelligent suggestions for groundwater exploration.'
},
{
icon: <Globe className="h-8 w-8 text-cyan-400" />,
title: 'Environmental Insights',
desc: 'Use rainfall, vegetation and soil indicators.'
},
{
icon: <FileText className="h-8 w-8 text-cyan-400" />,
title: 'PDF Reports',
desc: 'Generate downloadable groundwater assessment reports.'
}
]

return ( <div className="min-h-screen bg-slate-950 text-white">

  {/* HERO */}
  <section className="max-w-7xl mx-auto px-6 py-24">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      <div>
        <div className="inline-flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-full mb-6">
          <Droplets className="text-cyan-400" />
          <span>AI Groundwater Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Discover Groundwater
          <span className="text-cyan-400"> Before You Dig</span>
        </h1>

        <p className="text-slate-300 text-lg mb-8">
          Reduce failed borewells and drilling costs using intelligent
          groundwater assessment powered by environmental analysis.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onStartAssessment}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold"
          >
            Start Assessment
          </button>

          <button className="border border-slate-700 px-8 py-4 rounded-xl">
            Learn More
          </button>
        </div>
      </div>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
        alt="Groundwater"
        className="rounded-3xl shadow-2xl"
      />
    </div>
  </section>

  {/* STATS */}
  <section className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid md:grid-cols-4 gap-6 text-center">
      <div className="bg-slate-900 p-6 rounded-2xl">
        <h3 className="text-4xl font-bold text-cyan-400">10K+</h3>
        <p>Assessments</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h3 className="text-4xl font-bold text-cyan-400">92%</h3>
        <p>Prediction Accuracy</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h3 className="text-4xl font-bold text-cyan-400">40%</h3>
        <p>Reduced Drilling Costs</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl">
        <h3 className="text-4xl font-bold text-cyan-400">24/7</h3>
        <p>AI Analysis</p>
      </div>
    </div>
  </section>

  {/* FEATURES */}
  <section className="max-w-7xl mx-auto px-6 py-20">
    <h2 className="text-4xl font-bold text-center mb-12">
      Powerful Features
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
        >
          {feature.icon}
          <h3 className="text-xl font-bold mt-4 mb-3">
            {feature.title}
          </h3>
          <p className="text-slate-400">
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* HOW IT WORKS */}
  <section className="max-w-7xl mx-auto px-6 py-20">
    <h2 className="text-4xl font-bold text-center mb-12">
      How It Works
    </h2>

    <div className="grid md:grid-cols-4 gap-8 text-center">
      <div>
        <h3 className="text-5xl font-bold text-cyan-400">1</h3>
        <p>Enter Location Data</p>
      </div>

      <div>
        <h3 className="text-5xl font-bold text-cyan-400">2</h3>
        <p>Analyze Conditions</p>
      </div>

      <div>
        <h3 className="text-5xl font-bold text-cyan-400">3</h3>
        <p>Generate Score</p>
      </div>

      <div>
        <h3 className="text-5xl font-bold text-cyan-400">4</h3>
        <p>Download Report</p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="bg-cyan-500 text-black py-20 text-center">
    <h2 className="text-5xl font-bold mb-6">
      Ready to Find Groundwater Smarter?
    </h2>

    <button
      onClick={onStartAssessment}
      className="bg-black text-white px-8 py-4 rounded-xl font-bold"
    >
      Start Free Assessment
    </button>
  </section>

</div>

)
}

