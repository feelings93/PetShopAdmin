import {
  AdminPanelSettings,
  Analytics,
  Article,
  Dashboard,
  Fastfood,
  People,
  Pets,
  Spa,
} from '@mui/icons-material';
import React from 'react';
import TabItem from './TabItem';

const tabList = [
  {
    name: 'Tổng quan',
    icon: <Dashboard />,
    url: 'overview',
  },
  {
    name: 'Thú cưng',
    icon: <Pets />,
    url: 'pet',
  },
  {
    name: 'Sản phẩm',
    icon: <Fastfood />,
    url: 'product',
  },
  {
    name: 'Dịch vụ',
    icon: <Spa />,
    url: 'service',
  },
  {
    name: 'Đơn hàng',
    icon: <Article />,
    url: 'order',
  },
  {
    name: 'Thống kê',
    icon: <Analytics />,
    url: 'analytic',
  },
  {
    name: 'Khách hàng',
    icon: <People />,
    url: 'customer',
  },
  {
    name: 'Nhân viên',
    icon: <People />,
    url: 'employee',
  },
  {
    name: 'Người dùng',
    icon: <AdminPanelSettings />,
    url: 'user',
  },
];

const TabList = () => {
  return tabList.map((tab) => (
    <TabItem key={tab.url} name={tab.name} icon={tab.icon} url={tab.url} />
  ));
};

export default TabList;
