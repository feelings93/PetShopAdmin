import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PetContext = React.createContext({
  pets: [],
  searchPets: [],
  query: '',
  setQuery: () => {},
  setPets: () => {},
  handleAddPet: () => {},
  openAdd: false,
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
});

const PetContextProvider = (props) => {
  const { children } = props;
  const [pets, setPets] = useState([]);
  const [searchPets, setSearchPets] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleAddPet = useCallback((Pet) => {
    setPets((prev) => [...prev, Pet]);
  }, []);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchPets(pets);
    } else {
      setSearchPets(
        pets.filter((x) => x.name.toUpperCase().includes(query.toUpperCase()))
      );
    }
  }, [pets, query]);

  const contextValue = useMemo(
    () => ({
      pets,
      setPets,
      searchPets,
      query,
      setQuery,
      openAdd,

      handleCloseAdd,
      handleOpenAdd,
      handleAddPet,
    }),
    [
      pets,
      searchPets,
      query,
      handleAddPet,
      handleCloseAdd,
      handleOpenAdd,
      openAdd,
    ]
  );

  return (
    <PetContext.Provider value={contextValue}>{children}</PetContext.Provider>
  );
};

PetContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PetContextProvider;
