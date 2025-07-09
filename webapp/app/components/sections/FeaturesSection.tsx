export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">
            Everything you need to create, distribute, and analyze surveys quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p className="text-gray-600">Use our React SDK to embed surveys in minutes with full TypeScript support.</p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Instantly view metrics and insights as responses come in.</p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fully Customizable</h3>
            <p className="text-gray-600">Tailor the look & feel to match your brand with light and dark themes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
