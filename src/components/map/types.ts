export type LatLng = google.maps.LatLngLiteral

export type Bounds = [number, number, number, number]

export interface MarkerProps {
  center: LatLng
  label: string
}
