import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sammena Schools — Building Bright Minds. Shaping Better Futures.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space').replace(/\/$/, '')
  const logoUrl = new URL('/images/Sammena_Pre_Primary_School_Logo_Clean.svg', siteUrl).toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '64px',
          background: '#fffdf8',
          color: '#333333',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: '18px', height: '100%', background: '#FF6700', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: '340px', height: '100%', background: '#FF6700', opacity: 0.08, display: 'flex' }} />
        <div style={{ width: '310px', height: '390px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '2px solid #f0e7dc', borderRadius: '24px', padding: '22px', marginRight: '54px' }}>
          <img src={logoUrl} alt="Sammena Pre & Primary School logo" width="260" height="270" style={{ objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
          <div style={{ color: '#FF6700', fontSize: '22px', fontWeight: 700, letterSpacing: '4px', marginBottom: '18px' }}>OFFICIAL SCHOOL WEBSITE</div>
          <div style={{ fontSize: '56px', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1.5px' }}>SAMMENA</div>
          <div style={{ fontSize: '34px', fontWeight: 700, lineHeight: 1.2, marginTop: '8px' }}>PRE &amp; PRIMARY SCHOOL</div>
          <div style={{ width: '100px', height: '6px', background: '#FF6700', marginTop: '28px', marginBottom: '24px', display: 'flex' }} />
          <div style={{ fontSize: '25px', lineHeight: 1.35, color: '#4b5563' }}>Building Bright Minds.</div>
          <div style={{ fontSize: '25px', lineHeight: 1.35, color: '#4b5563' }}>Shaping Better Futures.</div>
          <div style={{ fontSize: '20px', marginTop: '30px', color: '#6b7280' }}>sammena.altavox.space</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
