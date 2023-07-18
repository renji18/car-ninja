"use client"

import CarCard from "@/components/CarCard"
import CustomFilter from "@/components/CustomFilter"
import Hero from "@/components/Hero"
import SearchBar from "@/components/SearchBar"
import { fuels, yearsOfProduction } from "@/constants"
import { fetchCars } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  // search states
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  // filter states
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022)

  // pagination states
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    try {
      setLoading(true)
      const res = await fetchCars({ manufacturer, year, fuel, limit, model })

      setAllCars(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getCars()
  }, [fuel, year, limit, model, manufacturer])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the card you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter setFilter={setFuel} title="fuel" options={fuels} />
            <CustomFilter
              setFilter={setYear}
              title="year"
              options={yearsOfProduction}
            />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div>
                <Image
                  alt="loader"
                  src="/loader.svg"
                  width={50}
                  height={50}
                  className="object-contain"
                ></Image>
              </div>
            )}
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
