<template>
  <div class="font-poppins text-gelato-chocolate overflow-x-hidden">
    <!-- Navbar -->
    <nav
      class="fixed w-full z-50 transition-all duration-300"
      :class="{
        'bg-white/90 backdrop-blur-md shadow-sm py-2': scrolled,
        'bg-transparent py-6': !scrolled,
      }"
    >
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-tr from-gelato-cone to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg"
          >
            G
          </div>
          <span
            class="text-2xl font-playfair font-bold text-gelato-chocolate tracking-tight"
            >GelatoPro</span
          >
        </div>
        <div
          class="hidden md:flex gap-8 items-center text-sm font-semibold text-gray-600"
        >
          <a
            href="#features"
            class="hover:text-gelato-strawberry transition-colors"
            >Características</a
          >
          <a
            href="#about"
            class="hover:text-gelato-strawberry transition-colors"
            >Nosotros</a
          >
          <a
            href="#testimonials"
            class="hover:text-gelato-strawberry transition-colors"
            >Clientes</a
          >
        </div>
        <router-link
          to="/login"
          class="px-6 py-2.5 rounded-full bg-gradient-to-r from-gelato-strawberry to-red-500 text-white font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
        >
          Ingresar
        </router-link>
      </div>
    </nav>

    <!-- Hero Section -->
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
              Optimiza tu inventario, controla ventas y gestiona tu equipo con
              la plataforma diseñada específicamente para el sector heladero
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
              <!-- Mockup UI placeholder -->
              <div
                class="w-full h-full rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-col gap-4 text-gray-400"
              >
                <span class="text-4xl">🍦</span>
                <span class="font-medium">Dashboard Preview</span>
              </div>

              <!-- Floating Card 1 -->
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

              <!-- Floating Card 2 -->
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
            <!-- Decorative circle behind image -->
            <div
              class="absolute inset-0 bg-gradient-to-tr from-orange-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10 transform scale-110"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2
            class="text-3xl md:text-5xl font-playfair font-bold mb-4 text-gelato-chocolate"
          >
            Todo lo que necesitas
          </h2>
          <p class="text-gray-500 text-lg">
            Herramientas potentes diseñadas para simplificar la admistración.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="group p-8 rounded-3xl bg-gray-50 hover:bg-orange-50/50 transition-all duration-300 border border-transparent hover:border-orange-100"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl mb-6 text-orange-500 group-hover:scale-110 transition-transform duration-300"
            >
              📊
            </div>
            <h3 class="text-xl font-bold mb-3">Control de Inventario</h3>
            <p class="text-gray-500 leading-relaxed">
              Monitoreo en tiempo real de insumos y productos terminados con
              alertas automáticas.
            </p>
          </div>
          <div
            class="group p-8 rounded-3xl bg-gray-50 hover:bg-pink-50/50 transition-all duration-300 border border-transparent hover:border-pink-100"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl mb-6 text-pink-500 group-hover:scale-110 transition-transform duration-300"
            >
              👥
            </div>
            <h3 class="text-xl font-bold mb-3">Gestión de Roles</h3>
            <p class="text-gray-500 leading-relaxed">
              Permisos granulares para administradores, bodegueros y vendedores.
            </p>
          </div>
          <div
            class="group p-8 rounded-3xl bg-gray-50 hover:bg-green-50/50 transition-all duration-300 border border-transparent hover:border-green-100"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl mb-6 text-green-500 group-hover:scale-110 transition-transform duration-300"
            >
              🚀
            </div>
            <h3 class="text-xl font-bold mb-3">Reportes Avanzados</h3>
            <p class="text-gray-500 leading-relaxed">
              Métricas detalladas de ventas, pérdidas y rendimiento del equipo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
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
            Nacimos con la misión de digitalizar la tradición. Sabemos que
            detrás de cada sabor hay una historia y un proceso artesanal que
            merece ser cuidado. GelatoPro es la herramienta que te permite
            enfocarte en lo que importa: crear sabores inolvidables, mientras
            nosotros nos encargamos de la gestión.
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
          <!-- Replace with real image in production -->
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

    <!-- Footer -->
    <footer
      class="bg-gray-50 pt-20 pb-10 border-t border-gray-100 font-poppins text-sm"
    >
      <div
        class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-16"
      >
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div
              class="w-8 h-8 rounded-full bg-gelato-chocolate flex items-center justify-center text-white font-bold text-lg"
            >
              G
            </div>
            <span class="text-xl font-playfair font-bold text-gelato-chocolate"
              >GelatoPro</span
            >
          </div>
          <p class="text-gray-500 mb-6">
            La plataforma líder para gestión de heladerías artesanales.
          </p>
          <div class="flex gap-4">
            <!-- Social icons placeholders -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >fb</a
            >
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >ig</a
            >
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-400 transition-colors"
              >tw</a
            >
          </div>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6">Producto</h4>
          <ul class="space-y-4 text-gray-500">
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Características</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Precios</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Guía de Inicio</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Actualizaciones</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6">Compañía</h4>
          <ul class="space-y-4 text-gray-500">
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Sobre Nosotros</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Carreras</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Prensa</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Contacto</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-6">Legales</h4>
          <ul class="space-y-4 text-gray-500">
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Privacidad</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Términos</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-amber-500 transition-colors"
                >Cookies</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs"
      >
        <p>&copy; 2026 GelatoPro Inc. Todos los derechos reservados.</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <span>Hecho con 🍦 y ❤️</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // GSAP Intro Animations
  const tl = gsap.timeline();

  tl.from(".gsap-hero-text > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  }).from(
    ".gsap-hero-image",
    {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.8",
  );
});
</script>

<style scoped>
/* Optional: Additional styles if tailwind isn't enough */
</style>
