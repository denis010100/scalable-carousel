"use client"

import React, { useState, useEffect } from "react"
import Carousel from "../components/Carousel"

const generateRandomImages = (num: number) => {
  const images = []
  for (let i = 1; i <= num; i++) {
    const width = Math.floor(Math.random() * (1280 - 400 + 1)) + 400
    const height = Math.floor(Math.random() * (780 - 200 + 1)) + 200
    images.push(
      `https://source.unsplash.com/random/${width}x${height}?sig=${i}`
    )
  }
  return images
}

const CarouselPage = () => {
  const [numImages, setNumImages] = useState(1001)
  const [carouselWidth, setCarouselWidth] = useState(getInitialWidth())
  const [carouselHeight, setCarouselHeight] = useState(getInitialHeight())
  const [images, setImages] = useState(generateRandomImages(numImages))
  const [carouselKey, setCarouselKey] = useState(0)
  const [isAutoResponsive, setIsAutoResponsive] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setCarouselKey((prevKey) => prevKey + 1)
  }, [numImages, carouselWidth, carouselHeight, isAutoResponsive])

  function getInitialWidth() {
    return window.innerWidth <= 720 ? 300 : 720
  }

  function getInitialHeight() {
    return window.innerWidth <= 720 ? 200 : 480
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "numImages") {
      setNumImages(parseInt(value))
      setImages(generateRandomImages(parseInt(value)))
    } else if (name === "carouselWidth") {
      setCarouselWidth(parseInt(value))
    } else if (name === "carouselHeight") {
      setCarouselHeight(parseInt(value))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoResponsive(e.target.checked)
  }

  return (
    <div>
      <h1 className="text-center text-xl md:text-4xl font-bold my-8 text-gray-800">
        The Responsive Looping <br /> Supporting Over 1000 Images <br />
        Carousel
      </h1>
      <div className="flex flex-col justify-center gap-4 mb-4">
        <div className="w-40 m-auto">
          <label className="block w-full pb-1 text-sm font-medium text-gray-800 transition-all duration-200 ease-in-out">
            Number of Images:
          </label>
          <input
            type="number"
            name="numImages"
            value={numImages}
            onChange={handleInputChange}
            className="h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-40 m-auto">
          <label className="block w-full pb-1 text-sm font-medium text-gray-800 transition-all duration-200 ease-in-out">
            Carousel Width:
          </label>
          <input
            type="number"
            name="carouselWidth"
            value={carouselWidth}
            onChange={handleInputChange}
            disabled={isAutoResponsive}
            className={`bg-gray-${
              isAutoResponsive ? "400" : "50"
            } h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400`}
          />
        </div>
        <div className="w-40 m-auto">
          <label className="block w-full pb-1 text-sm font-medium text-gray-800 transition-all duration-200 ease-in-out">
            Carousel Height:
          </label>
          <input
            type="number"
            name="carouselHeight"
            value={carouselHeight}
            onChange={handleInputChange}
            disabled={isAutoResponsive}
            className={`bg-gray-${
              isAutoResponsive ? "400" : "50"
            } h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400`}
          />
        </div>
        <div className="flex w-40 m-auto">
          <label className="block w-full pb-1 text-sm font-medium text-gray-800">
            Auto-Responsive:
          </label>
          <input
            type="checkbox"
            name="autoResponsive"
            checked={isAutoResponsive}
            onChange={handleCheckboxChange}
            className="h-5 w-5"
          />
        </div>
      </div>
      <div>
        <Carousel
          key={carouselKey}
          images={images}
          width={
            isAutoResponsive
              ? isMobile
                ? window.innerWidth
                : window.innerWidth / 2
              : carouselWidth
          }
          height={
            isAutoResponsive
              ? isMobile
                ? window.innerWidth * (9 / 16)
                : (window.innerWidth / 2) * (9 / 16)
              : carouselHeight
          }
          isMobile={isMobile}
        />
      </div>
    </div>
  )
}

export default CarouselPage
