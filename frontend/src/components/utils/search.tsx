import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchCompProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchComp: React.FC<SearchCompProps> = ({
  onSearch,
  placeholder = "Cari...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
      />
    </InputGroup>
  );
};

export default SearchComp;
