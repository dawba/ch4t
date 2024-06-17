import { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/Search.module.css';
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg';

type SearchProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};
const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <div className={'flex flex-row w-full ' + styles.searchBar}>
      <SearchIcon className={'w-8 h-8 flex-none'} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default Search;
