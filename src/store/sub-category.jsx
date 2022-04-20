import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SubCategoryContext = React.createContext({
  subCategories: [],
  query: '',
  setQuery: () => {},
  searchSubCategories: [],
  setSubCategories: () => {},
  handleAddSubCategory: () => {},
  handleEditSubCategory: () => {},
  editSubCategoryObj: {},
  setEditSubCategory: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditSubCategory: () => {},
});

const SubCategoryContextProvider = (props) => {
  const { children } = props;
  const [subCategories, setSubCategories] = useState([]);
  const [searchSubCategories, setSearchSubCategories] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editSubCategory, setEditSubCategory] = React.useState(null);

  const handleAddSubCategory = useCallback((subCategory) => {
    setSubCategories((prev) => [...prev, subCategory]);
  }, []);

  const handleEditSubCategory = useCallback(
    (subCategory) => {
      const newSubCategories = subCategories.map((item) => {
        if (item.id === subCategory.id) {
          return subCategory;
        }
        return item;
      });

      console.log(newSubCategories);
      setSubCategories(newSubCategories);
    },
    [subCategories]
  );
  const handleChangeEditSubCategory = useCallback((subCategory) => {
    setEditSubCategory(subCategory);
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
      setSearchSubCategories(subCategories);
    } else {
      setSearchSubCategories(
        subCategories.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [subCategories, query]);

  const contextValue = useMemo(
    () => ({
      subCategories,
      setSubCategories,
      query,
      setQuery,
      searchSubCategories,
      editSubCategoryObj: editSubCategory,
      handleChangeEditSubCategory,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddSubCategory,
      handleEditSubCategory,
    }),
    [
      subCategories,
      editSubCategory,
      query,
      setQuery,
      searchSubCategories,
      handleAddSubCategory,
      handleChangeEditSubCategory,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleEditSubCategory,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <SubCategoryContext.Provider value={contextValue}>
      {children}
    </SubCategoryContext.Provider>
  );
};

SubCategoryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SubCategoryContextProvider;
