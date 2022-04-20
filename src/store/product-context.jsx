import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = React.createContext({
  products: [],
  searchProducts: [],
  query: '',
  setQuery: () => {},
  setProducts: () => {},
  handleAddProduct: () => {},
  handleEditProduct: () => {},
  handleDelProduct: () => {},
  editProductObj: {},
  delProductObj: {},
  setEditProduct: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeDelProduct: () => {},
});

const ProductContextProvider = (props) => {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState(null);
  const [delProduct, setDelProduct] = React.useState(null);

  const handleAddProduct = useCallback((Product) => {
    setProducts((prev) => [...prev, Product]);
  }, []);

  const handleEditProduct = useCallback(
    (Product) => {
      const newproducts = products.map((item) => {
        if (item.id === Product.id) {
          return Product;
        }
        return item;
      });

      console.log(newproducts);
      setProducts(newproducts);
    },
    [products]
  );
  const handleDelProduct = useCallback(
    (Product) => {
      const newProducts = products.filter((item) => item.id !== Product.id);

      console.log(newProducts);
      setProducts(newProducts);
    },
    [products]
  );
  const handleChangeEditProduct = useCallback((Product) => {
    setEditProduct(Product);
    setOpenEdit(true);
  }, []);

  const handleChangeDelProduct = useCallback((Product) => {
    setDelProduct(Product);
    setOpenDelete(true);
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
      setSearchProducts(products);
    } else {
      setSearchProducts(
        products.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [products, query]);

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      searchProducts,
      query,
      setQuery,
      editProductObj: editProduct,
      delProductObj: delProduct,
      handleChangeEditProduct,
      handleChangeDelProduct,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddProduct,
      handleEditProduct,
      handleDelProduct,
    }),
    [
      products,
      searchProducts,
      query,
      editProduct,
      delProduct,
      handleAddProduct,
      handleChangeEditProduct,
      handleChangeDelProduct,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleEditProduct,
      handleDelProduct,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

ProductContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProductContextProvider;
