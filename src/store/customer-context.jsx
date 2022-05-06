import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CustomerContext = React.createContext({
  customers: [],
  query: '',
  setQuery: () => {},
  searchCustomers: [],
  setCustomers: () => {},
  handleAddCustomer: () => {},
  handleEditCustomer: () => {},
  editCustomerObj: {},
  activeCustomerObj: {},
  setEditCustomer: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  openActive: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleCloseActive: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditCustomer: () => {},
  handleChangeActiveCustomer: () => {},
});

const CustomerContextProvider = (props) => {
  const { children } = props;
  const [customers, setCustomers] = useState([]);
  const [searchCustomers, setSearchCustomers] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openActive, setOpenActive] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editCustomer, setEditCustomer] = React.useState(null);
  const [activeCustomer, setActiveCustomer] = React.useState(null);

  const handleAddCustomer = useCallback((customer) => {
    setCustomers((prev) => [...prev, customer]);
  }, []);

  const handleEditCustomer = useCallback(
    (customer) => {
      const newCustomers = customers.map((item) => {
        if (item.id === customer.id) {
          return customer;
        }
        return item;
      });

      console.log(newCustomers);
      setCustomers(newCustomers);
    },
    [customers]
  );
  const handleChangeEditCustomer = useCallback((customer) => {
    setEditCustomer(customer);
    setOpenEdit(true);
  }, []);

  const handleChangeActiveCustomer = useCallback((Customer) => {
    setActiveCustomer(Customer);
    setOpenActive(true);
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

  const handleOpenActive = useCallback(() => {
    setOpenActive(true);
  }, []);

  const handleCloseActive = useCallback(() => {
    setOpenActive(false);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchCustomers(customers);
    } else {
      setSearchCustomers(
        customers.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [customers, query]);

  const contextValue = useMemo(
    () => ({
      customers,
      setCustomers,
      query,
      setQuery,
      searchCustomers,
      editCustomerObj: editCustomer,
      activeCustomerObj: activeCustomer,
      handleChangeEditCustomer,
      handleChangeActiveCustomer,
      openEdit,
      openAdd,
      openDelete,
      openActive,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleOpenActive,
      handleCloseActive,
      handleAddCustomer,
      handleEditCustomer,
    }),
    [
      customers,
      query,
      searchCustomers,
      editCustomer,
      activeCustomer,
      handleChangeEditCustomer,
      handleChangeActiveCustomer,
      openEdit,
      openAdd,
      openDelete,
      openActive,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleOpenActive,
      handleCloseActive,
      handleAddCustomer,
      handleEditCustomer,
    ]
  );

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

CustomerContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CustomerContextProvider;
