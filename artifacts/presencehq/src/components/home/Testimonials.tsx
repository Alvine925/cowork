export function Testimonials() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&q=80"
          alt="Meeting room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white text-center flex flex-col items-center">
        <div className="text-6xl text-gold font-heading leading-none mb-6 select-none">"</div>

        <blockquote className="max-w-3xl text-2xl md:text-3xl font-light font-heading italic leading-relaxed mb-8">
          PresenceHQ gave our startup instant credibility. Clients assumed we had a full office in Nairobi from day one.
        </blockquote>

        <div className="flex flex-col items-center">
          <p className="text-white text-sm font-medium uppercase tracking-widest">Sarah M.</p>
          <p className="text-white/50 text-xs mt-1">Founder, Nexus Tech</p>
          <div className="w-8 border-t border-white/30 my-8"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-white/40 text-xs italic">"Flawless mail handling."</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">— David K., Consultant</p>
          </div>
          <div className="text-center">
            <p className="text-white/40 text-xs italic">"The meeting rooms are spectacular."</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">— Elena R., Law Firm</p>
          </div>
          <div className="text-center">
            <p className="text-white/40 text-xs italic">"Scaleable without the overhead."</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">— James T., Agency</p>
          </div>
        </div>
      </div>
    </section>
  )
}
