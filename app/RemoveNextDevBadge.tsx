'use client'

import { useEffect } from 'react'

export default function RemoveNextDevBadge() {
  useEffect(() => {
    const remove = () => {
      document
        .querySelectorAll(
          '[data-next-badge="true"], [data-nextjs-dev-tools-button="true"]'
        )
        .forEach((el) => el.remove())
    }

    // run immediately
    remove()

    // keep killing (Next re-injects)
    const interval = setInterval(remove, 300)

    return () => clearInterval(interval)
  }, [])

  return null
}
