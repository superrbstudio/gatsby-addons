import { useCallback, useEffect, useRef, useState } from 'react'
import Supercluster, { AnyProps, PointFeature } from 'supercluster'
import { Bounds, MarkerProps } from './types'

const useSupercluster = (
  markers: MarkerProps[] = [],
  bounds: Bounds,
  zoom: number = 10,
  radius: number = 25
) => {
  const supercluster = useRef<Supercluster>(null)
  const [clusters, setClusters] = useState<PointFeature<AnyProps>[]>([])

  const formatGeopoint = useCallback(
    item =>
      ({
        type: 'Feature',
        properties: {
          cluster: false,
          store: item,
        },
        geometry: {
          type: 'Point',
          coordinates: [item.center.lng, item.center.lat],
        },
      } as PointFeature<AnyProps>),
    []
  )

  useEffect(() => {
    if (markers.length === 0) {
      supercluster.current = null
      setClusters([])
    } else {
      supercluster.current = new Supercluster({
        radius,
        maxZoom: 20,
      })
      supercluster.current.load(markers.map(formatGeopoint))
      if (bounds && zoom) {
        setClusters(supercluster.current.getClusters(bounds, zoom))
      }
    }
  }, [markers, formatGeopoint, setClusters, bounds, zoom])

  return { clusters, supercluster: supercluster.current }
}

export default useSupercluster
