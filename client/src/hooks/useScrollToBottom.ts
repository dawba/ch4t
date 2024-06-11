import { useEffect, useRef } from 'react'

export const useScrollToBottom = (dataDependency: any) => {
  const ref = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [dataDependency])

  return ref
}
