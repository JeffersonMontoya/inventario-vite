<template>
  <div class="font-poppins text-gelato-chocolate overflow-x-hidden">
    <LandingNavbar :scrolled="scrolled" />
    <LandingHero />
    <LandingFeatures />
    <LandingAbout />
    <LandingFooter />
  </div>
</template>

<script setup>
import { useLanding } from "../composables/useLanding";

// Components
import LandingNavbar from "../components/landing/LandingNavbar.vue";
import LandingHero from "../components/landing/LandingHero.vue";
import LandingFeatures from "../components/landing/LandingFeatures.vue";
import LandingAbout from "../components/landing/LandingAbout.vue";
import LandingFooter from "../components/landing/LandingFooter.vue";

const { scrolled } = useLanding();
</script>
