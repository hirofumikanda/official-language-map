import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import "./LanguageSelector.css";

const languages = [
  { value: "", label: "すべての言語" },
  { value: "英語（英国式）", label: "英語（英国式）" },
  { value: "フランス語", label: "フランス語" },
  { value: "英語（米国式）", label: "英語（米国式）" },
  { value: "アラビア語", label: "アラビア語" },
  { value: "スペイン語", label: "スペイン語" },
  { value: "ポルトガル語", label: "ポルトガル語" },
  { value: "ドイツ語", label: "ドイツ語" },
  { value: "ロシア語", label: "ロシア語" },
  { value: "オランダ語", label: "オランダ語" },
  { value: "トルコ語", label: "トルコ語" },
  { value: "スワヒリ語", label: "スワヒリ語" },
  { value: "セルビア語", label: "セルビア語" },
  { value: "イタリア語", label: "イタリア語" },
  { value: "中国語（香港台湾式繁体字）", label: "中国語（香港台湾式繁体字）" },
  { value: "クレオール語", label: "クレオール語" },
  { value: "マレー語", label: "マレー語" },
  { value: "スウェーデン語", label: "スウェーデン語" },
  { value: "ベンガル語", label: "ベンガル語" },
  { value: "タミル語", label: "タミル語" },
  { value: "クルド語", label: "クルド語" },
  { value: "アルバニア語", label: "アルバニア語" },
  { value: "中国語（香港台湾式繫体字・大陸式簡体字）", label: "中国語（香港台湾式繫体字・大陸式簡体字）" },
  { value: "チャモロ語", label: "チャモロ語" },
  { value: "ウクライナ語", label: "ウクライナ語" },
  { value: "スワジ語", label: "スワジ語" },
  { value: "ツワナ語", label: "ツワナ語" },
  { value: "クロアチア語", label: "クロアチア語" },
  { value: "サモア語", label: "サモア語" },
  { value: "ネパール語", label: "ネパール語" },
  { value: "ウルドゥー語", label: "ウルドゥー語" },
  { value: "ソト語", label: "ソト語" },
];

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [matchingCountriesCount, setMatchingCountriesCount] = useState(0);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const map = mapRef.current;
    
    // フィルタリングの処理
    if (selectedLanguage === "") {
      // 全ての国を通常の色で表示
      map.setPaintProperty("official_languages", "fill-color", "rgb(251, 248, 243)");
      map.setFilter("official_languages", null);
      setMatchingCountriesCount(0);
    } else {
      // 選択した言語を含む国をハイライト
      map.setPaintProperty("official_languages", "fill-color", [
        "case",
        ["in", selectedLanguage, ["get", "official_languages"]],
        "rgb(255, 100, 100)", // 選択した言語を含む国は赤色
        "rgb(230, 230, 230)"  // その他は薄いグレー
      ]);

      // 該当する国の数を計算
      const features = map.querySourceFeatures("official_languages", {
        sourceLayer: "official_languages"
      });
      
      const matchingFeatures = features.filter(feature => {
        const officialLanguages = feature.properties?.official_languages;
        return officialLanguages && officialLanguages.includes(selectedLanguage);
      });
      
      setMatchingCountriesCount(matchingFeatures.length);
    }
  }, [selectedLanguage, mapLoaded]);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [139, 36],
      zoom: 1,
      minZoom: 0,
      pitch: 0,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      setMapLoaded(true);
    });

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      setMapLoaded(false);
      map.remove();
    };
  }, []);

  return (
    <>
      <div className="language-selector-container">
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="language-selector"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        {selectedLanguage && (
          <div className="country-count">
            該当する国・地域: <span className="country-count-number">{matchingCountriesCount}</span>件
          </div>
        )}
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
