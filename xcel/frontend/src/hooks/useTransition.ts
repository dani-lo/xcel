import { useEffect, useState } from 'react' 

const hideCName = 'fd fd-hide'
const showCName = 'fd fd-show'

export const useTransition = (direction: 'in' | 'out') => {

  const [ cname, setCname ] = useState(direction === 'in' ? hideCName : showCName)

  let timer : any

  useEffect(() => {

    if (cname === hideCName && direction === 'in') {

      timer = setTimeout(() => {
        setCname(showCName)
      }, 100)

    } else if (cname === showCName && direction === 'out') {

      timer = setTimeout(() => {
        setCname(hideCName)
      }, 100)
    }

    return  () =>  clearTimeout(timer)
  }, [direction])

  return cname
}

export const useFadeIn = (fadeDelay: number) => {

  const [cname, setCname ] = useState('fd fd-hide')

  useEffect(() => {

    const toFade = setTimeout(() => {
      setCname('fd fd-show')
    }, fadeDelay)

    return () => clearTimeout(toFade)
  }, [])

  return cname
}