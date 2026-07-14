import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Reveal } from "@/components/love/Reveal";
import { places, type Place } from "@/data/places";

/** Pin dourado em forma de coração — cheio se já vivemos, vazado se ainda falta. */
function heartIcon(feito: boolean) {
  const fill = feito ? "var(--gold)" : "transparent";
  const glow = feito
    ? "filter: drop-shadow(0 0 6px var(--gold));"
    : "opacity: 0.75;";
  return L.divIcon({
    className: "", // sem o fundo branco padrão do Leaflet
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -24],
    html: `
      <svg width="28" height="28" viewBox="0 0 24 24" style="${glow}">
        <path
          d="M12 21s-7.5-4.7-9.6-9.2C.6 8.2 2.6 4.5 6.2 4.5c2 0 3.4 1.1 4.2 2.3.8-1.2 2.2-2.3 4.2-2.3 3.6 0 5.6 3.7 3.8 7.3C19.5 16.3 12 21 12 21z"
          fill="${fill}"
          stroke="var(--gold)"
          stroke-width="1.5"
        />
      </svg>`,
  });
}

export function PlacesMap() {
  // Leaflet precisa de window — só monta no cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const feitos = places.filter((p) => p.feito).length;

  // Enquadra o mapa em todos os lugares.
  const bounds = useMemo<L.LatLngBoundsExpression | undefined>(() => {
    if (!places.length) return undefined;
    return places.map((p) => p.coords) as L.LatLngBoundsExpression;
  }, []);

  return (
    <div>
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
          nossos lugares
        </p>
        <p className="mt-4 text-center font-display italic text-muted-foreground">
          os cantos do mundo que já são nossos — e os que ainda vão ser
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-2xl border border-gold/30 bg-card/40 p-1 shadow-gold">
          {mounted ? (
            <MapContainer
              bounds={bounds}
              boundsOptions={{ padding: [48, 48] }}
              scrollWheelZoom={false}
              className="h-[420px] w-full rounded-xl sm:h-[520px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {places.map((p: Place) => (
                <Marker key={p.id} position={p.coords} icon={heartIcon(p.feito)}>
                  <Popup>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                      {p.feito ? "já vivemos aqui" : "ainda queremos ir"}
                    </span>
                    <strong className="mt-1 block font-display text-lg text-foreground">
                      {p.nome}
                    </strong>
                    <span className="mt-2 block font-display italic leading-relaxed text-foreground/80">
                      {p.texto}
                    </span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="h-[420px] w-full animate-pulse rounded-xl bg-card/60 sm:h-[520px]" />
          )}
        </div>

        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {feitos} de {places.length} lugares vividos — toque nos corações
        </p>
      </Reveal>
    </div>
  );
}
