<script setup lang="ts">
const { data: rowGeojson } = await useFetch("/api/overpass")
const { data: waitingTime } = await useFetch("/api/waitingTime")
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
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />
      <LMarker v-for="geo in geojson" :key="geo.id"
        :lat-lng="[geo.geometry.coordinates[1], geo.geometry.coordinates[0]]">
        <LPopup>{{ `${geo.properties.name}\n${geo.waitTime}` }}</LPopup>
        <LIcon :icon-url="getIconUrl(parseWaitTime(geo.waitTime ?? ''))" :icon-size="[30, 30]" />
      </LMarker>
    </LMap>
  </div>
</template>

<style>
.leaflet-div-icon {
  background: steelblue;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
