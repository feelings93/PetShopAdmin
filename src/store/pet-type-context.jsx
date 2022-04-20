import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PetTypeContext = React.createContext({
  petTypes: [],
  query: '',
  setQuery: () => {},
  searchPetTypes: [],
  setPetTypes: () => {},
  handleAddPetType: () => {},
  handleEditPetType: () => {},
  editPetTypeObj: {},
  setEditPetType: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditPetType: () => {},
});

const PetTypeContextProvider = (props) => {
  const { children } = props;
  const [petTypes, setPetTypes] = useState([]);
  const [searchPetTypes, setSearchPetTypes] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editPetType, setEditPetType] = React.useState(null);

  const handleAddPetType = useCallback((petType) => {
    setPetTypes((prev) => [...prev, petType]);
  }, []);

  const handleEditPetType = useCallback(
    (petType) => {
      const newPetTypes = petTypes.map((item) => {
        if (item.id === petType.id) {
          return petType;
        }
        return item;
      });

      console.log(newPetTypes);
      setPetTypes(newPetTypes);
    },
    [petTypes]
  );
  const handleChangeEditPetType = useCallback((petType) => {
    setEditPetType(petType);
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
      setSearchPetTypes(petTypes);
    } else {
      setSearchPetTypes(
        petTypes.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [petTypes, query]);

  const contextValue = useMemo(
    () => ({
      petTypes,
      setPetTypes,
      query,
      setQuery,
      searchPetTypes,
      editPetTypeObj: editPetType,
      handleChangeEditPetType,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddPetType,
      handleEditPetType,
    }),
    [
      petTypes,
      editPetType,
      query,
      setQuery,
      searchPetTypes,
      handleAddPetType,
      handleChangeEditPetType,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleEditPetType,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <PetTypeContext.Provider value={contextValue}>
      {children}
    </PetTypeContext.Provider>
  );
};

PetTypeContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PetTypeContextProvider;
