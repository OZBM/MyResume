import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

const CarouselContext = React.createContext({})

const Carousel = React.forwardRef(
  ({ orientation = "horizontal", ...props }, ref) => {
    const [carouselRef, setCarouselRef] = React.useState(null)
    const [api, setApi] = React.useState(null)
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const onSelect = React.useCallback((index) => {
      setCurrent(index)
    }, [])

    React.useEffect(() => {
      if (!carouselRef) return
      
      const handleScroll = () => {
        if (!carouselRef) return
        
        const scrollLeft = carouselRef.scrollLeft
        const slideWidth = carouselRef.offsetWidth
        const currentIndex = Math.round(scrollLeft / slideWidth)
        
        setCurrent(currentIndex)
      }
      
      carouselRef.addEventListener('scroll', handleScroll)
      
      return () => {
        carouselRef.removeEventListener('scroll', handleScroll)
      }
    }, [carouselRef])

    const scrollPrev = React.useCallback(() => {
      if (!carouselRef) return
      const slideWidth = carouselRef.offsetWidth
      carouselRef.scrollBy({
        left: -slideWidth,
        behavior: 'smooth'
      })
    }, [carouselRef])

    const scrollNext = React.useCallback(() => {
      if (!carouselRef) return
      const slideWidth = carouselRef.offsetWidth
      carouselRef.scrollBy({
        left: slideWidth,
        behavior: 'smooth'
      })
    }, [carouselRef])

    const handleKeyDown = React.useCallback((event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    }, [scrollPrev, scrollNext])

    React.useEffect(() => {
      if (!carouselRef) return

      carouselRef.addEventListener("keydown", handleKeyDown)

      return () => {
        carouselRef.removeEventListener("keydown", handleKeyDown)
      }
    }, [carouselRef, handleKeyDown])

    const contextValue = React.useMemo(
      () => ({
        carouselRef,
        api,
        current,
        setCurrent,
        scrollPrev,
        scrollNext,
        count,
        setCount,
      }),
      [
        carouselRef,
        api,
        current,
        setCurrent,
        scrollPrev,
        scrollNext,
        count,
        setCount,
      ]
    )

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={(el) => {
            setCarouselRef(el)
            if (ref) {
              if (typeof ref === 'function') ref(el)
              else ref.current = el
            }
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative",
            orientation === "horizontal" ? "flex flex-col" : "flex",
            props.className
          )}
          role="region"
          aria-roledescription="carousel"
          {...props}
        />
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef } = React.useContext(CarouselContext)

  React.useEffect(() => {
    if (!carouselRef) return

    const observer = new ResizeObserver(() => {
      carouselRef.scrollLeft = 0
    })

    observer.observe(carouselRef)

    return () => {
      observer.disconnect()
    }
  }, [carouselRef])

  return (
    <div
      ref={ref}
      className={cn(
        "flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4",
        className
      )}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { setCount } = React.useContext(CarouselContext)

  React.useEffect(() => {
    setCount(prev => prev + 1)
    return () => setCount(prev => prev - 1)
  }, [setCount])
  
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full snap-center",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, current } = React.useContext(CarouselContext)

  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full",
        current === 0 && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={current === 0}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, current, count } = React.useContext(CarouselContext)

  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full",
        current === count - 1 && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={current === count - 1}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-5 w-5" />
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
