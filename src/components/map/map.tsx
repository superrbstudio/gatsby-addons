import React, {
  ReactElement,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react'
import GoogleMapReact, { MapOptions } from 'google-map-react'
import { Bounds, LatLng, MarkerProps } from './types'
import useSupercluster from './useSupercluster'
import { AnyProps, PointFeature } from 'supercluster'
import Marker from './marker'
import googleMapReact from 'google-map-react'

interface Props extends PropsWithChildren<{}> {
  center: LatLng
  markers: MarkerProps[]
  radius?: number
  initialZoom?: number
  useClustering?: boolean
  className?: string
  markerIcon?: ReactElement
  clusterMarkerIcon?: ReactElement
  options: MapOptions
}

const Map = ({
  center,
  markers = [],
  radius = 25,
  initialZoom = 10,
  useClustering = false,
  className = '',
  markerIcon = undefined,
  clusterMarkerIcon = undefined,
  options = {},
}: Props) => {
  const mapRef = useRef<google.maps.Map>()
  const mapsRef = useRef<typeof google.maps>()

  const [zoom, setZoom] = useState<number>(initialZoom)
  const [bounds, setBounds] = useState<Bounds>([0, 0, 0, 0])

  const { clusters, supercluster } = useSupercluster(
    markers,
    bounds,
    zoom,
    radius
  )

  // Return map bounds based on list of places
  const getMapBounds = (places: MarkerProps[]) => {
    if (!mapsRef.current) {
      return
    }

    const bounds = new mapsRef.current.LatLngBounds()
    places.forEach(place => {
      bounds.extend(place.center)
    })
    return bounds
  }

  const bindResizeListener = (
    bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  ) => {
    if (!mapsRef.current || !mapRef.current) {
      return
    }

    mapsRef.current.event.addDomListenerOnce(mapRef.current, 'idle', () => {
      if (!mapsRef.current || !mapRef.current) {
        return
      }

      mapsRef.current.event.addDomListener(window, 'resize', () => {
        if (!mapRef.current) {
          return
        }

        mapRef.current.fitBounds(bounds)
      })
    })
  }

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = useCallback((map, maps, places: MarkerProps[]) => {
    mapRef.current = map
    mapsRef.current = maps

    if (places.length === 0 || places.length === 1) {
      //Doesn't play nicely with zero or one items
      return
    }

    // Get bounds by our places
    const bounds = getMapBounds(places)

    if (bounds) {
      // Fit map to bounds
      map.fitBounds(bounds)
      // Bind the resize listener
      bindResizeListener(bounds)
    }
  }, [])

  return (
    <div id="map" className={`map ${className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GATSBY_GOOGLE_MAPS_API_KEY as string,
        }}
        center={{
          lat: center.lat,
          lng: center.lng,
        }}
        defaultZoom={initialZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          apiIsLoaded(map, maps, markers)
        }}
        onChange={({
          zoom,
          bounds,
        }: {
          zoom: number
          bounds: googleMapReact.Bounds
        }) => {
          setZoom(zoom)
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ])
        }}
        options={options}
      >
        {useClustering
          ? clusters.map((cluster: PointFeature<AnyProps>, index) => {
              const [longitude, latitude] = cluster.geometry.coordinates
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties

              return (
                <Marker
                  key={index}
                  lat={latitude}
                  lng={longitude}
                  text={pointCount}
                  icon={
                    isCluster && clusterMarkerIcon
                      ? clusterMarkerIcon
                      : markerIcon
                  }
                  isCluster={isCluster}
                >
                  {isCluster && (
                    <div
                      className="cluster-marker"
                      onClick={() => {
                        const expansionZoom =
                          supercluster?.getClusterExpansionZoom(
                            cluster.id as number
                          )
                        mapRef.current?.setZoom(expansionZoom || initialZoom)
                        mapRef.current?.panTo({
                          lat: latitude,
                          lng: longitude,
                        })
                      }}
                    >
                      {pointCount}
                    </div>
                  )}
                </Marker>
              )
            })
          : markers.map((marker, index) => (
              <Marker
                key={index}
                lat={marker.center.lat}
                lng={marker.center.lng}
                text={marker.label}
                icon={markerIcon}
              />
            ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
