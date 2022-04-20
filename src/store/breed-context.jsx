import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const BreedContext = React.createContext({
  breeds: [],
  query: '',
  setQuery: () => {},
  searchBreeds: [],
  setBreeds: () => {},
  handleAddBreed: () => {},
  handleEditBreed: () => {},
  editBreedObj: {},
  setEditBreed: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditBreed: () => {},
});

const BreedContextProvider = (props) => {
  const { children } = props;
  const [breeds, setBreeds] = useState([]);
  const [searchBreeds, setSearchBreeds] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editBreed, setEditBreed] = React.useState(null);

  const handleAddBreed = useCallback((breed) => {
    setBreeds((prev) => [...prev, breed]);
  }, []);

  const handleEditBreed = useCallback(
    (breed) => {
      const newBreeds = breeds.map((item) => {
        if (item.id === breed.id) {
          return breed;
        }
        return item;
      });

      console.log(newBreeds);
      setBreeds(newBreeds);
    },
    [breeds]
  );
  const handleChangeEditBreed = useCallback((breed) => {
    setEditBreed(breed);
    setOpenEdit(true);
  }, []);
  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchBreeds(breeds);
    } else {
      setSearchBreeds(
        breeds.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [breeds, query]);

  const contextValue = useMemo(
    () => ({
      breeds,
      setBreeds,
      query,
      setQuery,
      searchBreeds,
      editBreedObj: editBreed,
      handleChangeEditBreed,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddBreed,
      handleEditBreed,
    }),
    [
      breeds,
      editBreed,
      query,
      setQuery,
      searchBreeds,
      handleAddBreed,
      handleChangeEditBreed,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleEditBreed,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <BreedContext.Provider value={contextValue}>
      {children}
    </BreedContext.Provider>
  );
};

BreedContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default BreedContextProvider;
