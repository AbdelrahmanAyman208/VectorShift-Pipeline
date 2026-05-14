import { useState, useRef, useEffect } from 'react';

export const SearchableSelect = ({ options, value, onChange, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  const selectedOption = options.find((o) => o.id === value);
  const displayValue = isOpen ? search : (selectedOption ? selectedOption.name : '');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="searchable-select" ref={wrapperRef}>
      <div 
        className={`searchable-select__input-wrapper ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <input
          className="searchable-select__input"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          placeholder={selectedOption ? selectedOption.name : placeholder}
        />
        <svg className="searchable-select__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <div className="searchable-select__dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.id}
                className={`searchable-select__option ${value === option.id ? 'selected' : ''}`}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="searchable-select__empty">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
