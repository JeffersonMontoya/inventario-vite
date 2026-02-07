<template>
  <section
    id="about"
    class="py-24 bg-gelato-chocolate text-gelato-cream relative overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              stroke-width="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div
      class="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center"
    >
      <div>
        <div
          class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 font-semibold text-xs mb-6 uppercase tracking-wider border border-white/20"
        >
          Sobre Nosotros
        </div>
        <h2
          class="text-4xl md:text-5xl font-playfair font-bold mb-6 text-white leading-tight"
        >
          Pasión por el <br /><span class="text-gelato-cone"
            >auténtico gelato</span
          >
        </h2>
        <p class="text-white/70 text-lg mb-8 leading-relaxed">
          Nacimos con la misión de digitalizar la tradición. Sabemos que detrás
          de cada sabor hay una historia y un proceso artesanal que merece ser
          cuidado. GelatoPro es la herramienta que te permite enfocarte en lo
          que importa: crear sabores inolvidables, mientras nosotros nos
          encargamos de la gestión.
        </p>
        <div class="flex gap-12">
          <div>
            <div class="text-4xl font-bold text-gelato-cone mb-1">500+</div>
            <div class="text-sm text-white/60 uppercase tracking-widest">
              Heladerías
            </div>
          </div>
          <div>
            <div class="text-4xl font-bold text-gelato-cone mb-1">98%</div>
            <div class="text-sm text-white/60 uppercase tracking-widest">
              Satisfacción
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full min-h-[400px] bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
        ></div>
        <div
          class="w-full h-full bg-gray-800 flex items-center justify-center text-white/20 font-playfair text-4xl"
        >
          Imagen Team
        </div>
        <div class="absolute bottom-8 left-8 z-20">
          <p class="text-white font-playfair text-2xl italic">
            "Innovación en cada bola de helado"
          </p>
          <p
            class="text-gelato-cone mt-2 text-sm font-bold uppercase tracking-widest"
          >
            El Equipo Fundador
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
