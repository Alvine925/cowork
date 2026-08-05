export function TrustedBy() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <p className="italic text-gray-400 text-center text-sm font-light mb-8">
          — Trusted by businesses across Kenya, and beyond
        </p>
        <div className="flex flex-wrap items-center justify-center">
          {['TECHVENTURES', 'NEXUS CONSULTING', 'AFRICA LEGAL', 'PEXEL LOGISTICS', 'INNOVATE HUB'].map((company, index, arr) => (
            <div key={company} className="flex items-center">
              <span className="text-gray-300 text-xs tracking-widest uppercase font-medium px-6 md:px-10">
                {company}
              </span>
              {index !== arr.length - 1 && (
                <div className="h-4 border-r border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
