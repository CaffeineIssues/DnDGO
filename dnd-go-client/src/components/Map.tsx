import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Replace with your token
mapboxgl.accessToken = ''

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [coords.longitude, coords.latitude],
          zoom: 16,
          pitch: 60,      // 🔥 tilt camera
          bearing: -20,   // 🔥 rotate map
          antialias: true // 🔥 smoother 3D
        })

        map.addControl(new mapboxgl.NavigationControl())

        // Player marker
        new mapboxgl.Marker({ color: '#22c55e' })
          .setLngLat([coords.longitude, coords.latitude])
          .addTo(map)

        // 🏙️ Enable 3D buildings
        map.on('style.load', () => {
          const layers = map.getStyle().layers
          const labelLayerId = layers?.find(
            (layer) =>
              layer.type === 'symbol' &&
              layer.layout?.['text-field']
          )?.id

          map.addLayer(
            {
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 15,
              paint: {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
              }
            },
            labelLayerId
          )
        })
      },
      () => {
        console.error('GPS failed')
      },
      { enableHighAccuracy: true }
    )
  }, [])

  return <div ref={mapContainer} className="w-full h-full object-cover rounded-xl" />
}