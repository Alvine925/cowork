export function Solution() {
  return (
    <section className="bg-white py-0">
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&q=80"
          alt="Premium office infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/20 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-xl text-white">
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase block mb-4">
                Our Solution
              </span>
              <h2 className="text-3xl md:text-4xl font-light font-heading leading-snug">
                Premium infrastructure.<br />None of the overhead.
              </h2>
              <p className="text-white/70 font-light mt-4 text-base leading-relaxed">
                We've invested in prime locations across Kenya so you don't have to. Our managed spaces handle everything — from professionally trained reception staff to secure mail handling — so you can focus on your actual business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
