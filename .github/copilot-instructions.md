# Official Language Map - AI Coding Instructions

## Project Overview
Interactive React + TypeScript map application displaying world official languages using MapLibre GL and PMTiles vector data. Built with Vite for development/production and deployed to GitHub Pages.

## Key Architecture Patterns

### Map Initialization & Data Loading
- `src/components/MapView.tsx` is the single map component - handles all MapLibre GL setup
- PMTiles protocol registration happens in MapView useEffect: `maplibregl.addProtocol("pmtiles", protocol.tile)`
- Map style defined in `public/styles/style.json` references PMTiles data source at runtime
- All country flag images loaded in `src/utils/onMapLoad.ts` using async pattern with `map.addImage()`

### Data Architecture
- **Vector tiles**: `public/data/official_languages.pmtiles` (PMTiles format for efficient web delivery)
- **Map style**: `public/styles/style.json` defines single vector source + layer configuration
- **Layer targeting**: Interactive features only work with `"official_languages"` layer (see `ALLOW_LAYERS` arrays)

### Event Handling Pattern
- **Modular approach**: Separate utility files for different interactions
- `src/utils/popup.ts`: Click events → table-style popup with localized labels (公用語 for official_languages)
- `src/utils/pointer.ts`: Mousemove events → cursor style changes over interactive features
- Both use `map.queryRenderedFeatures(e.point, { layers: ALLOW_LAYERS })` pattern

### Deployment & Build
- **Base path**: Vite configured with `base: "/official-language-map/"` for GitHub Pages deployment
- **Scripts**: `npm run build` (TypeScript + Vite), `npm run deploy` (gh-pages to GitHub Pages)
- **Assets**: All images/fonts/data served from `public/` directory with repo-relative paths in production

## Development Workflow

### Essential Commands
```bash
npm run dev          # Development server with hot reload
npm run build        # Production build (TypeScript check + Vite build)
npm run deploy       # Build and deploy to GitHub Pages
rm -f public/data/*  # Clear existing data files before adding new PMTiles
```

### Data Integration
- PMTiles files must be placed in `public/data/` directory
- Update `public/styles/style.json` source URL to match new data file name
- Vector layer names in style.json must match the layer names inside the PMTiles file
- Test data loading by checking browser network tab for successful PMTiles requests

### Adding New Interactive Features
1. Add layer name to `ALLOW_LAYERS` arrays in both `popup.ts` and `pointer.ts`
2. Customize popup content in `buildPopupContent()` function for field-specific formatting
3. Add corresponding map style layers in `public/styles/style.json`

### Asset Management
- Country flag images: Add to `public/img/`, then register in `onMapLoad.ts` with `map.addImage()`
- Custom fonts: PBF glyph files organized by font family in `public/font/`
- Style references fonts with `"glyphs": "font/{fontstack}/{range}.pbf"` pattern

## Code Conventions

### File Organization
- **Single responsibility**: Each utility handles one type of map interaction
- **Type safety**: All MapLibre GL types properly imported (`Map`, `MapMouseEvent`, `MapGeoJSONFeature`)
- **Error handling**: Graceful degradation when no features found (`features.length === 0`)

### React Patterns
- Map instance stored in ref (`mapRef.current`) for component lifecycle management
- Cleanup in useEffect return ensures proper map disposal
- Minimal React state - map interactions handled directly through MapLibre GL events

This is a geospatial data visualization project, not a typical CRUD application. Focus on map interactions, vector tile performance, and spatial data workflows when making changes.
