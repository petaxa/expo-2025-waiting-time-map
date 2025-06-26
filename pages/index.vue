<script setup lang="ts">
const { data: rowGeojson } = await useFetch("/api/overpass")
const { data: waitingTime, execute: refetchWaitingTime } = await useFetch("/api/waitingTime", {
  immediate: true,
})

useIntervalFn(() => {
  console.log("refetch")
  refetchWaitingTime()
}, 60_000)

const zoom = ref(17)
const minZoom = 15
const center = [34.648946, 135.384736]
const maxBounds = [[34.64204, 135.37186], [34.65667, 135.39431]]
const maxBoundsViscosity = 1.0

type WaitInfo = NonNullable<(typeof waitingTime)['value']>[number];
const geojson = computed(() => {
  const waitMap = new Map<string, WaitInfo>(
    waitingTime.value?.map(w => [w.osmId, w]),
  );
  return rowGeojson.value?.features
    .filter(f => waitMap.has(String(f.id)))
    .map(f => ({
      ...f,
      ...waitMap.get(String(f.id))
    }));
})
</script>

<template>
  <div style="height:100vh; width:100vw">
    <LMap ref="map" :zoom :min-zoom :center :use-global-leaflet="false" :max-bounds :max-bounds-viscosity>
      <!-- <LControl position="topright">
        <UDropdownMenu :items="items" :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8
        }" :ui="{
          content: 'w-48'
        }">
          <UButton size="xl" icon="i-lucide-menu" color="neutral" variant="outline" />
        </UDropdownMenu>
      </LControl> -->
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />
      <LMarker v-for="geo in geojson" :key="geo.id"
        :lat-lng="[geo.geometry.coordinates[1], geo.geometry.coordinates[0]]">
        <LPopup :options="{ className: 'my-popup' }">
          <div>
            <p style="font-size: 0.8rem; margin: 0;">{{ `${geo.properties.name}` }}</p>
            <p style="font-size: 1.2rem; margin: 0.5rem;">{{ `${geo.waitTime}` }}</p>
          </div>
        </LPopup>
        <LIcon :icon-url="getIconUrl(parseWaitTime(geo.waitTime ?? ''))" :icon-size="[30, 30]" />
      </LMarker>
    </LMap>
  </div>
</template>

<style></style>
