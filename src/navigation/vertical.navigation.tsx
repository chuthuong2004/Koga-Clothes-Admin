import React from "react";

import { BsBarChart, BsChatSquare, BsPersonBadge, BsReceipt, BsTruck } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdLogout, MdOutlineReviews, MdPostAdd } from 'react-icons/md';
import { FaTrademark } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { routes } from "@/config";
import { RxDot } from "react-icons/rx";

export const NAVIGATION_VERTICAL = [
  {
    to: routes.dashboard,
    icon: <BsBarChart />
    ,
    title: 'Dashboard',
  },
  {
    to: routes.order,
    icon: <BsReceipt />,
    title: 'Đơn hàng',
  },
  {
    to: routes.brand,
    icon: <FaTrademark />,
    title: 'Thương hiệu',
  },
  {
    to: routes.category,
    icon: <BiCategory />,
    title: 'Danh mục',
  },
  {
    to: routes.repository,
    icon: <BiCategory />,
    title: 'Kho lưu trữ',
  },
  {
    to: routes.product,
    icon: <BsTruck />,
    title: 'Sản phẩm',
  },

  {
    to: routes.customer,
    icon: <BsPersonBadge />,
    title: 'Khách hàng',
  },
  {
    to: routes.chat,
    icon: <BsChatSquare />,
    title: 'Tin nhắn',
  },
  {
    to: routes.review,
    icon: <MdOutlineReviews />,
    title: 'Đánh giá',
  },
  {
    to: routes.role,
    icon: <IoSettingsOutline />,
    title: 'Role',
  },
  {
    to: routes.blog,
    icon: <MdPostAdd />,
    title: 'Blog',
    children: [
      {
        to: routes.blog,
        title: 'List',
        icon: <RxDot />,
      },
      {
        to: routes.categoryBlog,
        title: 'Category',
        icon: <RxDot />,
      }
    ]
  },
  {
    to: '#',
    icon: <MdLogout />,
    title: 'Đăng xuất',
  },
];