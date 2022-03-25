import React, { PropsWithChildren, ReactElement } from 'react'

interface Props extends PropsWithChildren<{}> {
  lat: number
  lng: number
  text: string
  isCluster?: boolean
  icon?: ReactElement
}

const Marker = ({
  children,
  lat,
  lng,
  text,
  icon = undefined,
  isCluster = false,
}: Props) => {
  return (
    <div className={`map__marker ${isCluster ? 'map__marker--cluster' : ''}`}>
      {icon && icon}
      {children}
    </div>
  )
}

export default Marker
