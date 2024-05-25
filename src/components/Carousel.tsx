import React, { useRef, useEffect, useState } from "react"
import { Grid, AutoSizer } from "react-virtualized"

interface ImageListProps {
  images: string[]
  width: number
  height: number
  isMobile: boolean
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  width,
  height,
  isMobile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollableElementRef = useRef<HTMLElement | null>(null)
  const columnWidth = width
  const bufferCount = 2

  const extendedImages = [
    ...images.slice(-bufferCount),
    ...images,
    ...images.slice(0, bufferCount),
  ]

  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleSnap = () => {
    const scrollableElement = scrollableElementRef.current
    if (scrollableElement) {
      const currentScrollLeft = scrollableElement.scrollLeft
      const totalWidth = columnWidth * images.length
      if (currentScrollLeft < columnWidth * bufferCount) {
        scrollableElement.scrollTo({
          left: totalWidth + currentScrollLeft,
          behavior: "instant",
        })
      } else if (currentScrollLeft >= totalWidth + columnWidth * bufferCount) {
        scrollableElement.scrollTo({
          left: currentScrollLeft - totalWidth,
          behavior: "instant",
        })
      } else {
        const adjustedScrollLeft = currentScrollLeft - columnWidth * bufferCount
        const closestColumnIndex = Math.round(adjustedScrollLeft / columnWidth)
        const snapPoint =
          closestColumnIndex * columnWidth + columnWidth * bufferCount
        scrollableElement.scrollTo({
          left: snapPoint,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const scrollableElement = container.querySelector(
        ".ReactVirtualized__Grid"
      ) as HTMLElement | null
      scrollableElementRef.current = scrollableElement

      if (scrollableElement) {
        let scrollEndTimeout: NodeJS.Timeout | undefined

        const handleScrollEnd = () => {
          if (scrollEndTimeout) {
            clearTimeout(scrollEndTimeout)
          }
          scrollEndTimeout = setTimeout(handleSnap, 150)
        }

        const handleWheel = (event: WheelEvent) => {
          event.preventDefault()
          if (scrollableElement) {
            let newScrollPosition = scrollableElement.scrollLeft + event.deltaY
            scrollableElement.scrollLeft = newScrollPosition
          }
        }

        const handleTouchStart = (event: TouchEvent) => {
          setStartX(event.touches[0].pageX)
          setScrollLeft(scrollableElement.scrollLeft)
          event.preventDefault()
        }

        const handleTouchMove = (event: TouchEvent) => {
          event.preventDefault()
          if (scrollableElement) {
            const moveX = event.touches[0].pageX - startX
            const newScrollLeft = scrollLeft - moveX

            const maxScrollLeft =
              extendedImages.length * columnWidth -
              scrollableElement.clientWidth
            const minScrollLeft = 0

            const correctedScrollLeft = Math.min(
              Math.max(newScrollLeft, minScrollLeft),
              maxScrollLeft
            )
            scrollableElement.scrollLeft = correctedScrollLeft
          }
        }

        scrollableElement.addEventListener("scroll", handleScrollEnd)
        scrollableElement.addEventListener("wheel", handleWheel, {
          passive: false,
        })
        scrollableElement.addEventListener("touchstart", handleTouchStart)
        scrollableElement.addEventListener("touchmove", handleTouchMove)

        scrollableElement.scrollLeft = columnWidth * bufferCount

        return () => {
          if (scrollEndTimeout) {
            clearTimeout(scrollEndTimeout)
          }
          scrollableElement.removeEventListener("scroll", handleScrollEnd)
          scrollableElement.removeEventListener("wheel", handleWheel)
          scrollableElement.removeEventListener("touchstart", handleTouchStart)
          scrollableElement.removeEventListener("touchmove", handleTouchMove)
        }
      }
    }
  }, [images.length, startX, scrollLeft])

  return (
    <div
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`${isMobile ? "w-full" : "w-1/2"} mx-auto overflow-hidden`}
    >
      <AutoSizer disableHeight>
        {() => (
          <Grid
            className="!overflow-x-hidden"
            columnCount={extendedImages.length}
            columnWidth={width}
            estimatedColumnSize={width}
            height={height}
            rowCount={1}
            rowHeight={height}
            width={width}
            cellRenderer={({ columnIndex, key, style }) => (
              <div key={key} style={{ ...style, padding: "10px" }}>
                <div
                  className={`relative w-[${width}] h-full overflow-hidden bg-black rounded-3xl`}
                  onClick={isMobile ? undefined : () => {}}
                >
                  <div className="absolute m-2 flex justify-center content-center h-16 w-16 bg-white px-2 rounded-full">
                    <p className="m-auto">
                      {columnIndex >= bufferCount &&
                      columnIndex < extendedImages.length - bufferCount
                        ? columnIndex - bufferCount + 1 + "."
                        : "1."}
                    </p>
                  </div>
                  <img
                    src={extendedImages[columnIndex]}
                    alt={`Image ${columnIndex}`}
                    className="w-full h-full object-contain"
                    onClick={isMobile ? undefined : () => {}}
                  />
                </div>
              </div>
            )}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default ImageList
