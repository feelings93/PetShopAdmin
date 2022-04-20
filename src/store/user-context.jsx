import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext({
  users: [],
  searchUsers: [],
  setUsers: () => {},
  query: '',
  setQuery: () => {},
  handleAddUser: () => {},
  handleEditUser: () => {},
  editUserObj: {},
  delUserObj: {},
  activeUserObj: {},
  setEditUser: () => {},
  openEdit: false,
  openAdd: false,
  openDelete: false,
  openActive: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleOpenDelete: () => {},
  handleCloseDelete: () => {},
  handleOpenActive: () => {},
  handleCloseActive: () => {},
  handleChangeDelUser: () => {},
  handleDelUser: () => {},
  handleChangeActiveUser: () => {},
  handleActiveUser: () => {},
});

const UserContextProvider = (props) => {
  const { children } = props;
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openActive, setOpenActive] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);
  const [delUser, setDelUser] = React.useState(null);
  const [activeUser, setActiveUser] = React.useState(null);

  const handleAddUser = useCallback((User) => {
    setUsers((prev) => [...prev, User]);
  }, []);

  const handleEditUser = useCallback(
    (User) => {
      const newusers = users.map((item) => {
        if (item.id === User.id) {
          return User;
        }
        return item;
      });

      console.log(newusers);
      setUsers(newusers);
    },
    [users]
  );

  const handleDelUser = useCallback(
    (User) => {
      const newusers = users.filter((item) => item.id !== User.id);

      console.log(newusers);
      setUsers(newusers);
    },
    [users]
  );
  const handleChangeEditUser = useCallback((User) => {
    setEditUser(User);
    setOpenEdit(true);
  }, []);
  const handleChangeDelUser = useCallback((User) => {
    setDelUser(User);
    setOpenDelete(true);
  }, []);

  const handleChangeActiveUser = useCallback((User) => {
    setActiveUser(User);
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
      setSearchUsers(users);
    } else {
      setSearchUsers(
        users.filter((x) => x.name.toUpperCase().includes(query.toUpperCase()))
      );
    }
  }, [users, query]);

  const contextValue = useMemo(
    () => ({
      users,
      searchUsers,
      setUsers,
      query,
      setQuery,
      editUserObj: editUser,
      delUserObj: delUser,
      activeUserObj: activeUser,
      handleChangeEditUser,
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
      handleAddUser,
      handleEditUser,
      handleChangeDelUser,
      handleChangeActiveUser,
      handleDelUser,
    }),
    [
      users,
      query,
      searchUsers,
      editUser,
      delUser,
      activeUser,
      handleAddUser,
      handleChangeEditUser,
      handleCloseAdd,
      handleCloseDelete,
      handleCloseEdit,
      handleCloseActive,
      handleEditUser,
      handleOpenAdd,
      handleOpenDelete,
      handleOpenEdit,
      handleOpenActive,
      handleChangeDelUser,
      handleChangeActiveUser,
      handleDelUser,
      openActive,
      openAdd,
      openDelete,
      openEdit,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserContextProvider;
