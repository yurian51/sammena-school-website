import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sammena Schools — Building Bright Minds. Shaping Better Futures.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sammena.altavox.space').replace(/\/$/, '')
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#333333', textAlign: 'center' }}>
            <div style={{ display: 'flex', width: '112px', height: '112px', alignItems: 'center', justifyContent: 'center', border: '6px solid #FF6700', borderRadius: '999px', color: '#FF6700', fontSize: '42px', fontWeight: 800, letterSpacing: '-3px' }}>SPS</div>
            <div style={{ marginTop: '22px', color: '#FF6700', fontSize: '18px', fontWeight: 700, letterSpacing: '3px' }}>SAMMENA</div>
            <div style={{ marginTop: '8px', fontSize: '14px', letterSpacing: '1px' }}>PRE & PRIMARY SCHOOL</div>
          </div>
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
