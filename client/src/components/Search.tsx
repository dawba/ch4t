import {useEffect, useState} from 'react'
import styles from './Search.module.css'
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';

const Search =  () => {
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {

    }, [searchQuery]);

    return (
        <div className={'flex flex-row w-full ' + styles.searchBar}>
            <SearchIcon className={'w-8 h-8 ml-2 flex-none'}/>
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
