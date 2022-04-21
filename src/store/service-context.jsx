import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const ServiceContext = React.createContext({
  services: [],
  searchServices: [],
  query: '',
  setQuery: () => {},
  setServices: () => {},
  handleAddSerivce: () => {},
  openAdd: false,
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
});

const ServiceContextProvider = (props) => {
  const { children } = props;
  const [services, setServices] = useState([]);
  const [searchServices, setSearchServices] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleAddSerivce = useCallback((Service) => {
    setServices((prev) => [...prev, Service]);
  }, []);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchServices(services);
    } else {
      setSearchServices(
        services.filter((x) => x.name.toUpperCase().includes(query.toUpperCase()))
      );
    }
  }, [services, query]);

  const contextValue = useMemo(
    () => ({
      services,
      setServices,
      searchServices,
      query,
      setQuery,
      openAdd,

      handleCloseAdd,
      handleOpenAdd,
      handleAddSerivce,
    }),
    [
      services,
      searchServices,
      query,
      handleAddSerivce,
      handleCloseAdd,
      handleOpenAdd,
      openAdd,
    ]
  );

  return (
    <ServiceContext.Provider value={contextValue}>{children}</ServiceContext.Provider>
  );
};

ServiceContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ServiceContextProvider;
