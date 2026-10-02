import { useEffect } from 'react'

export function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title
    const node = document.querySelector('meta[name="description"]')
    if (node) node.setAttribute('content', description)
  }, [title, description])

  return null
}
