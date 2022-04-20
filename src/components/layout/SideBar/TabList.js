import {
  Analytics,
  Category,
  Dashboard,
  People,
  Person,
  Pets,
  RoomService,
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
    name: 'Loại thú cưng',
    icon: <Pets />,
    url: 'pet-type',
  },
  {
    name: 'Thú cưng',
    icon: <Pets />,
    url: 'pet',
  },
  {
    name: 'Giống',
    icon: <Pets />,
    url: 'breed',
  },
  {
    name: 'Danh mục',
    icon: <Category />,
    url: 'category',
  },
  {
    name: 'Danh mục phụ',
    icon: <Category />,
    url: 'sub-category',
  },
  {
    name: 'Sản phẩm',
    icon: <Pets />,
    url: 'product',
  },
  {
    name: 'Dịch vụ',
    icon: <RoomService />,
    url: 'service',
  },
  {
    name: 'Đơn hàng',
    icon: <Dashboard />,
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
    icon: <Person />,
    url: 'user',
  },
];

const TabList = () => {
  return tabList.map((tab) => (
    <TabItem key={tab.url} name={tab.name} icon={tab.icon} url={tab.url} />
  ));
};

export default TabList;
