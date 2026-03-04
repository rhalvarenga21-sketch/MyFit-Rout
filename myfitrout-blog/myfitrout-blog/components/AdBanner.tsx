'use client'
import { useEffect } from 'react'

interface AdBannerProps {
  slot?: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdBanner({ slot = '1234567890', format = 'auto' }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed #1E2B22', borderRadius: '8px', overflow: 'hidden', minHeight: '90px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4439834790483319"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
