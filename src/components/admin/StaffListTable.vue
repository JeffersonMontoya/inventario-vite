<template>
  <div class="bg-white p-6 rounded-[32px] shadow-sm border border-purple-50">
    <div class="flex items-center justify-between mb-6">
      <h3
        class="text-lg font-bold font-playfair text-gray-800 flex items-center gap-2"
      >
        👥 Equipo de Trabajo
      </h3>
      <span
        class="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase"
      >
        {{ userStore.users.length }} Miembros
      </span>
    </div>

    <div class="overflow-hidden">
      <div
        v-if="userStore.users.length === 0"
        class="py-10 text-center opacity-40"
      >
        <p class="text-sm">No hay personal registrado.</p>
      </div>

      <div
        v-else
        class="space-y-3 overflow-y-auto custom-scrollbar max-h-[280px] pr-2"
      >
        <div
          v-for="staff in userStore.users"
          :key="staff.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-purple-100 group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl shadow-sm"
            >
              {{
                staff.role === "admin"
                  ? "🛡️"
                  : staff.role === "bodega"
                    ? "📦"
                    : "🛍️"
              }}
            </div>
            <div>
              <p class="font-bold text-gray-800 text-sm">
                {{ staff.email }}
              </p>
              <p
                class="text-[10px] text-purple-500 font-bold uppercase tracking-widest"
              >
                {{ staff.role }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="text-[10px] text-gray-300 font-mono hidden md:block"
              >ID: {{ staff.uid?.slice(0, 6) }}...</span
            >
            <button
              @click="$emit('edit-staff', staff)"
              class="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
              title="Editar Rol"
            >
              ✏️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f3e8ff;
  border-radius: 4px;
}
</style>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.getUsers();
});
</script>
