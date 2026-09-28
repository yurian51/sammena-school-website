export default function Loading() {
  return (
    <main className="site-loader" aria-live="polite" aria-busy="true" aria-label="Sammena Schools inafungua">
      <div className="site-loader__brand">
        <div className="site-loader__mark" aria-hidden="true">
          <span className="site-loader__halo site-loader__halo--one" />
          <span className="site-loader__halo site-loader__halo--two" />
          <span className="site-loader__orbit site-loader__orbit--one" />
          <img src="/images/Sammena_Pre_Primary_School_Logo_Clean.svg" alt="" width="168" height="168" fetchPriority="high" decoding="sync" className="site-loader__logo" />
        </div>
        <p className="site-loader__label">SAMMENA SCHOOLS</p>
        <p className="site-loader__status"><span className="site-loader__dot" /> Preparing your experience</p>
        <div className="site-loader__progress" aria-hidden="true"><span /></div>
      </div>
    </main>
  )
}