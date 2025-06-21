import osmtogeojson from "osmtogeojson";
import type { FeatureCollection, Point, Feature } from "geojson";

type GeoJsonNameProperties = {
  name: string;
  // NOTE: 本来は GeoJsonProperties 型。Vue Reactivity System のシリアライズでname:stringが消えてしまうのでこのように対応
  // NOTE: name が never 型になってしまうがいったん許容
  [key: string]: unknown;
};

export default defineEventHandler(
  async (): Promise<FeatureCollection<Point, GeoJsonNameProperties>> => {
    const url =
      "https://petaxa.github.io/expo-2025-waiting-time-json/overpass.json";

    const res = await fetch(url);
    const geojson = osmtogeojson(await res.json());
    const pointFeatures: Array<Feature<Point, GeoJsonNameProperties>> =
      geojson.features.filter(
        (f): f is Feature<Point, GeoJsonNameProperties> =>
          f.geometry.type === "Point" &&
          f.properties !== null &&
          f.properties.name
      );
    const pointFeatureCollection: FeatureCollection<
      Point,
      GeoJsonNameProperties
    > = {
      type: "FeatureCollection",
      features: pointFeatures,
    };

    return pointFeatureCollection;
  }
);
