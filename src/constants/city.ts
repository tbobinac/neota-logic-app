import type { City, Region } from "@/types/city";

export const REGIONS: Region[] = [
  { id: "western-balkans", name: "Western Balkans" },
] as const;

export const CITIES: City[] = [
  {
    id: "zagreb",
    name: "Zagreb",
    shortName: "ZG",
    latitude: 45.815,
    longitude: 15.9819,
    regionId: "western-balkans",
  },
  {
    id: "ljubljana",
    name: "Ljubljana",
    shortName: "LJ",
    latitude: 46.0569,
    longitude: 14.5058,
    regionId: "western-balkans",
  },
  {
    id: "belgrade",
    name: "Belgrade",
    shortName: "BG",
    latitude: 44.7866,
    longitude: 20.4489,
    regionId: "western-balkans",
  },
  {
    id: "sarajevo",
    name: "Sarajevo",
    shortName: "SA",
    latitude: 43.8563,
    longitude: 18.4131,
    regionId: "western-balkans",
  },
  {
    id: "podgorica",
    name: "Podgorica",
    shortName: "PG",
    latitude: 42.4304,
    longitude: 19.2594,
    regionId: "western-balkans",
  },
  {
    id: "skopje",
    name: "Skopje",
    shortName: "SK",
    latitude: 41.9981,
    longitude: 21.4254,
    regionId: "western-balkans",
  },
] as const;

export const getSelectedCities = (selection: string): City[] => {
  if (REGIONS.some((r) => r.id === selection)) {
    return CITIES.filter((c) => c.regionId === selection);
  }
  return CITIES.filter((c) => c.id === selection);
};
