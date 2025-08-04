import React from 'react';
import '../../styles/common.css';
import Input from '../common/input';
import Button from '../common/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAddNew: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onAddNew }) => {
  const [value, setValue] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <Input value={value} onChange={handleChange} placeholder="Search by ID or Name" className="max-w-xs" />
      <Button onClick={onAddNew}>Add New Employee</Button>
    </div>
  );
};

export default SearchBar;