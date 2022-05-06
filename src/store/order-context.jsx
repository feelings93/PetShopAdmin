import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const OrderContext = React.createContext({
  orders: [],
  products: [],
  pets: [],
  services: [],
  customers: [],
  setProducts: () => {},
  setPets: () => {},
  setServices: () => {},
  setCustomers: [],
  query: '',
  setQuery: () => {},
  searchOrders: [],
  setOrders: () => {},
  handleAddOrder: () => {},
  handleEditOrder: () => {},
  handleChangeEditOrder: () => {},
  editOrderObj: {},
  setEditOrder: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
});

const OrderContextProvider = (props) => {
  const { children } = props;
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchOrders, setSearchOrders] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editOrder, setEditOrder] = React.useState(null);

  const handleAddOrder = useCallback((order) => {
    setOrders((prev) => [...prev, order]);
  }, []);

  const handleEditOrder = useCallback(
    (order) => {
      const newOrders = orders.map((item) => {
        if (item.id === order.id) {
          return order;
        }
        return item;
      });

      setOrders(newOrders);
    },
    [orders]
  );
  const handleChangeEditOrder = useCallback((order) => {
    setEditOrder(order);
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
      setSearchOrders(orders);
    } else {
      setSearchOrders(
        orders.filter((x) =>
          x.customerName.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [orders, query]);

  const contextValue = useMemo(
    () => ({
      orders,
      setOrders,
      products,
      pets,
      services,
      customers,
      setProducts,
      setPets,
      setServices,
      setCustomers,
      query,
      setQuery,
      searchOrders,
      editOrderObj: editOrder,
      handleChangeEditOrder,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddOrder,
      handleEditOrder,
    }),
    [
      orders,
      products,
      pets,
      services,
      customers,
      query,
      searchOrders,
      editOrder,
      handleChangeEditOrder,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddOrder,
      handleEditOrder,
    ]
  );

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

OrderContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OrderContextProvider;
