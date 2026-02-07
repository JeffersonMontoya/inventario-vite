<template>
  <section
    class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gelato-cream"
  >
    <!-- Background Decorations -->
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-gelato-mint/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gelato-cone/30 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4"
    ></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="gsap-hero-text">
          <div
            class="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-semibold text-xs mb-6 uppercase tracking-wider border border-orange-200"
          >
            Gestión Inteligente para Heladerías
          </div>
          <h1
            class="text-5xl lg:text-7xl font-bold font-playfair leading-[1.1] mb-6"
          >
            El sabor del
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-gelato-strawberry to-orange-500"
              >éxito</span
            >
            en tu negocio
          </h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            Optimiza tu inventario, controla ventas y gestiona tu equipo con la
            plataforma diseñada específicamente para el sector heladero
            artesanal e industrial.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link
              to="/login"
              class="px-8 py-4 rounded-xl bg-gelato-chocolate text-white font-semibold shadow-xl shadow-gray-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Comenzar Ahora
            </router-link>
            <button
              class="px-8 py-4 rounded-xl bg-white text-gelato-chocolate border-2 border-gelato-chocolate/10 font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 group"
            >
              Ver Demo
              <span class="group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </button>
          </div>
        </div>

        <div class="relative gsap-hero-image">
          <div
            class="relative z-10 w-full aspect-square max-w-[500px] mx-auto bg-gradient-to-br from-white to-gray-50 rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 border border-white/50 backdrop-blur-sm"
          >
            <div
              class="w-full h-full rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-col gap-4 text-gray-400"
            >
              <span class="text-4xl">🍦</span>
              <span class="font-medium">Dashboard Preview</span>
            </div>

            <div
              class="absolute -right-8 top-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float"
            >
              <div
                class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold"
              >
                $
              </div>
              <div>
                <div class="text-xs text-gray-500 font-bold uppercase">
                  Ventas Hoy
                </div>
                <div class="text-lg font-bold text-gray-800">$1,240.50</div>
              </div>
            </div>

            <div
              class="absolute -left-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float"
              style="animation-delay: 1s"
            >
              <div
                class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold"
              >
                !
              </div>
              <div>
                <div class="text-xs text-gray-500 font-bold uppercase">
                  Stock Alerta
                </div>
                <div class="text-sm font-bold text-gray-800">
                  Vainilla Suprema
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-tr from-orange-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10 transform scale-110"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
