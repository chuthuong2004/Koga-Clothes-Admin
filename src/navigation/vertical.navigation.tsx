import React from "react";

import { BsBarChart, BsChatSquare, BsPersonBadge, BsReceipt, BsTruck } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdLogout, MdOutlineReviews, MdPostAdd } from 'react-icons/md';
import { FaTrademark } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { routes } from "@/config";
import { RxDot } from "react-icons/rx";import { LuWarehouse } from "react-icons/lu";

export const NAVIGATION_VERTICAL = [
  {
    to: routes.dashboard,
    icon: <BsBarChart size={20}/>
    ,
    title: 'Dashboard',
  },
  {
    to: routes.order,
    icon: <BsReceipt size={20}/>,
    title: 'Đơn hàng',
  },
  {
    to: routes.brand,
    icon: <FaTrademark size={20}/>,
    title: 'Thương hiệu',
  },
  {
    to: routes.category,
    icon: <BiCategory size={20}/>,
    title: 'Danh mục',
  },
  {
    to: routes.repository,
    icon: <LuWarehouse size={20}/>,
    title: 'Kho lưu trữ',
  },
  {
    to: routes.product,
    icon: <BsTruck size={20}/>,
    title: 'Sản phẩm',
  },

  {
    to: routes.customer,
    icon: <BsPersonBadge size={20}/>,
    title: 'Khách hàng',
  },
  {
    to: routes.chat,
    icon: <BsChatSquare size={20}/>,
    title: 'Tin nhắn',
  },
  {
    to: routes.review,
    icon: <MdOutlineReviews size={20}/>,
    title: 'Đánh giá',
  },
  {
    to: routes.role,
    icon: <IoSettingsOutline size={20}/>,
    title: 'Role',
  },
  {
    to: routes.blog,
    icon: <MdPostAdd size={20}/>,
    title: 'Bài viết',
    children: [
      {
        to: routes.blog,
        title: 'Danh sách bài viết',
        icon: <RxDot size={20}/>,
      },
      {
        to: routes.categoryBlog,
        title: 'Danh mục bài viết',
        icon: <RxDot size={20}/>,
      }
    ]
  },
  {
    to: '#',
    icon: <MdLogout size={20}/>,
    title: 'Đăng xuất',
  },
];