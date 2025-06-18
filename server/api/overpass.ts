import osmtogeojson from "osmtogeojson";
import type { FeatureCollection, Point, Feature } from "geojson";

const B_BOX = [34.64204, 135.37186, 34.65667, 135.39431];
const QUERY = `
[out:json][timeout:25];
way["name"~"^コモンズ-.*$"](${B_BOX.join(",")})->.commonsWays;
way["name"~"^(TEAM EXPO パビリオン|フューチャーライフエクスペリエンス)$"](${B_BOX.join(
  ","
)})->.futureLifeVillageWays;

.commonsWays   map_to_area -> .commonsAreas;
.futureLifeVillageWays map_to_area -> .futureLifeVillageAreas;
(
  nwr["amenity"~"^(exhibition_centre|theatre)$"](${B_BOX.join(",")});
)->.allAmenities;

(
  nwr(area.commonsAreas)["amenity"~"^(exhibition_centre|theatre)$"];
)->.insideCommons;

(
  nwr(area.futureLifeVillageAreas)["amenity"~"^(exhibition_centre|theatre)$"];
)->.insideFutureLifeVillage;

(
  .allAmenities;
  - .insideCommons;
)->.allMinusInsideCommons;

(
  .allMinusInsideCommons;
  - .insideFutureLifeVillage;
)->.allMinusInsideCommonsMinusInsideFutureLifeVillage;

(
  .commonsWays;
  .futureLifeVillageWays;
  .allMinusInsideCommonsMinusInsideFutureLifeVillage;
);
out center;
`;

type GeoJsonNameProperties = {
  name: string;
  // NOTE: 本来は GeoJsonProperties 型。Vue Reactivity System のシリアライズでname:stringが消えてしまうのでこのように対応
  // NOTE: name が never 型になってしまうがいったん許容
  [key: string]: unknown;
};

export default defineEventHandler(
  async (): Promise<FeatureCollection<Point, GeoJsonNameProperties>> => {
    const url = `https://overpass.private.coffee/api/interpreter?data=${encodeURIComponent(
      QUERY
    )}`;

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
