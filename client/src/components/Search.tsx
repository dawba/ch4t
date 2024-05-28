// src/components/SearchBar.tsx
import React, { useState } from 'react'
import searchIcon from '../assets/search-icon.png'
import styles from './Search.module.css'

const Search: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        console.log('Searching for:', searchQuery)
        // Add your search logic here
    }

    return (
        <div className={styles.searchBar}>
            <button onClick={handleSearch} className="ml-1 ">
                <img
                    src={searchIcon}
                    alt="Search"
                    className={styles.searchIcon}
                />
            </button>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    )
}

export default Search
