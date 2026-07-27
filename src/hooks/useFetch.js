import { useState, useEffect } from 'react'

/**
 * Generic data-fetching hook.
 * Handles loading / error / data state for any async fetcher function.
 *
 * @param {Function} fetcher - async function that returns data
 * @param {Array} deps - dependency array, re-fetches when these change
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher()
        if (isMounted) setData(result)
      } catch (err) {
        if (isMounted) setError(err.message || 'Something went wrong')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    run()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
