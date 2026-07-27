import './Loader.css'

/** Simple, elegant loading spinner used across pages during API calls. */
function Loader({ label = 'Loading...', fullPage = false }) {
  return (
    <div className={`loader-wrap ${fullPage ? 'loader-full' : ''}`} role="status" aria-live="polite">
      <div className="loader-spinner" />
      <p className="loader-label">{label}</p>
    </div>
  )
}

export default Loader
