"use client"

import React, { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { SearchBarProps } from "@/types"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnify"
      width={40}
      height={40}
      className="object-contain"
    ></Image>
  </button>
)

const SearchBar = ({ setManufacturer, setModel }: SearchBarProps) => {
  const router = useRouter()
  const [searchManufacturer, setSearchManufacturer] = useState("")
  const [searchModel, setSearchModel] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchManufacturer == "")
      return alert("Please fill in the search bar")

    setModel(searchModel)
    setManufacturer(searchManufacturer)
  }


  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="search__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] ml-4"
          alt="car model"
        ></Image>
        <input
          type="text"
          value={searchModel}
          name="model"
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
