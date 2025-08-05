'use client'

import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility'
import L from 'leaflet'

// Position for the marker (Feu Rouge Bessengué in Douala)
const position: [number, number] = [4.05916, 9.71128]

export const MapSection = () => {
  // Create a custom icon using your image
  const customIcon = new L.Icon({
    iconUrl: '/assets/location-pin.webp', // Replace this with the path to your custom marker image
    iconSize: [40, 40], // Set the size of the icon (adjust as needed)
    iconAnchor: [20, 40], // Anchor the icon to the bottom center
    popupAnchor: [0, -40], // Adjust where the popup appears
    shadowSize: [0, 0], // Optional: Remove the shadow (if not needed)
  })

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className='h-[40rem] w-full'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} icon={customIcon}></Marker>
    </MapContainer>
  )
}
