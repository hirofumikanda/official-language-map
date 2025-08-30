import maplibregl, { Map, MapMouseEvent } from "maplibre-gl";
import type { MapGeoJSONFeature } from "maplibre-gl";

const ALLOW_LAYERS = [
  "official_languages",
];

export const setupPopupHandler = (map: Map) => {
  map.on("click", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });

    if (features.length === 0) return;

    const popupContent = buildPopupContent(features[0]);
    new maplibregl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });
};

const buildPopupContent = (feature: MapGeoJSONFeature): string => {
  const props = feature.properties ?? {};
  let html = `<table style="border-collapse:collapse;">`;
  for (const key in props) {
    let label = key;
    if (label === 'official_languages') label = '公用語';
    let value = props[key];
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      let valueHtml = escapeHTML(String(value));
      html += `
        <tr>
          <td style=\"padding:4px; border:1px solid #ccc;\"><strong>${escapeHTML(label)}</strong></td>
          <td style=\"padding:4px; border:1px solid #ccc;\">${valueHtml}</td>
        </tr>`;
    }
  }

  html += `</table>`;
  return html;
};

const escapeHTML = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });
