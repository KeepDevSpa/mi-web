'use client'

import React from 'react'
import { getIconComponent, MediaItem } from '@/lib/icon-manager'

interface MediaRendererProps {
  media: MediaItem
  className?: string
  size?: number
  style?: React.CSSProperties
}

export default function MediaRenderer({ 
  media, 
  className = '', 
  size, 
  style 
}: MediaRendererProps) {
  const finalSize = size || media.size || 24
  
  if (media.type === 'image') {
    return (
      <img 
        src={media.value} 
        alt={media.alt || 'Imagen'} 
        className={`object-contain ${media.className || ''} ${className}`}
        style={{
          width: finalSize,
          height: finalSize,
          ...style
        }}
      />
    )
  } else {
    const IconComponent = getIconComponent(media.value)
    return (
      <IconComponent 
        className={`${media.className || ''} ${className}`}
        style={{
          width: finalSize,
          height: finalSize,
          ...style
        }}
      />
    )
  }
}
