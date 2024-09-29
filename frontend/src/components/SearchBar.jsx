function SearchBar({ query, setSearchQuery }) {
    return (
        <div className="rounded-lg shadow-lg bg-white">
            <input
                type="text"
                value={query}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Book"
                className="px-3 text-center py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
            />
        </div>
    );
}

export default SearchBar;
