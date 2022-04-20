import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const EmployeeContext = React.createContext({
  employees: [],
  query: '',
  setQuery: () => {},
  searchEmployees: [],
  setEmployees: () => {},
  handleAddEmployee: () => {},
  handleEditEmployee: () => {},
  editEmployeeObj: {},
  setEditEmployee: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditEmployee: () => {},
});

const EmployeeContextProvider = (props) => {
  const { children } = props;
  const [employees, setEmployees] = useState([]);
  const [searchEmployees, setSearchEmployees] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editEmployee, setEditEmployee] = React.useState(null);

  const handleAddEmployee = useCallback((employee) => {
    setEmployees((prev) => [...prev, employee]);
  }, []);

  const handleEditEmployee = useCallback(
    (employee) => {
      const newEmployees = employees.map((item) => {
        if (item.id === employee.id) {
          return employee;
        }
        return item;
      });

      console.log(newEmployees);
      setEmployees(newEmployees);
    },
    [employees]
  );
  const handleChangeEditEmployee = useCallback((employee) => {
    setEditEmployee(employee);
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
      setSearchEmployees(employees);
    } else {
      setSearchEmployees(
        employees.filter((x) =>
          `${x?.firstName} ${x?.lastName}`.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [employees, query]);

  const contextValue = useMemo(
    () => ({
      employees,
      setEmployees,
      query,
      setQuery,
      searchEmployees,
      editEmployeeObj: editEmployee,
      handleChangeEditEmployee,
      openEdit,
      openAdd,
      openDelete,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleOpenDelete,
      handleCloseDelete,
      handleAddEmployee,
      handleEditEmployee,
    }),
    [
      employees,
      editEmployee,
      query,
      setQuery,
      searchEmployees,
      handleAddEmployee,
      handleChangeEditEmployee,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleEditEmployee,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

EmployeeContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default EmployeeContextProvider;
