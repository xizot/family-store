import { lazy } from 'react';
import UserManager from '../pages/auth/Admin/UserManager/UserManager';
import Checkout from '../pages/Checkout/Checkout';
import CheckoutSuccess from '../pages/Checkout/CheckoutSuccess/CheckoutSuccess';
import { Role } from './role';

const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const RecoveryPasswordPage = lazy(() => import('../pages/RecoveryPassword'));
const AccountActivationPage = lazy(() => import('../pages/AccountActivation'));
const ProfilePage = lazy(() => import('../pages/auth/Profile'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const CollectionsPage = lazy(() => import('../pages/Collections'));
const OrderPage = lazy(() => import('../pages/auth/OrderPage'));
const ReviewsPage = lazy(() => import('../pages/auth/ReviewsPage'));
const AdminProductPage = lazy(() => import('../pages/auth/Admin/Product/Product'));
const AdminSubCatePage = lazy(() => import('../pages/auth/Admin/SubCategory/SubCategory'));
const AdminCategoryPage = lazy(() => import('../pages/auth/Admin/Category/Category'));
const Dashboard = lazy(() => import('../pages/auth/Admin/Dash.js'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: HomePage,
    roles: [Role.User],
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: LoginPage,
  },
  {
    path: '/register',
    protected: false,
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/profile/:slug',
    protected: true,
    exact: true,
    component: ProfilePage,
  },
  {
    path: '/profile',
    protected: true,
    exact: true,
    component: ProfilePage,
  },
  {
    path: '/forgot-password',
    protected: false,
    exact: true,
    component: ForgotPasswordPage,
  },
  {
    path: '/recovery-password',
    protected: false,
    exact: true,
    component: RecoveryPasswordPage,
  },
  {
    path: '/account-activation',
    protected: false,
    exact: true,
    component: AccountActivationPage,
  },
  {
    path: '/search',
    protected: false,
    exact: true,
    component: SearchPage,
    roles: [Role.User],
  },
  {
    path: '/details/:productId',
    protected: false,
    exact: true,
    component: ProductDetail,
    roles: [Role.User],
  },
  {
    path: '/collections/:categoryId',
    protected: false,
    exact: true,
    component: CollectionsPage,
    roles: [Role.User],
  },
  {
    path: '/collections',
    protected: false,
    exact: true,
    component: CollectionsPage,
    roles: [Role.User],
  },
  {
    path: '/orders',
    protected: true,
    exact: true,
    component: OrderPage,
    roles: [Role.User],
  },
  {
    path: '/reviews/:orderId',
    protected: true,
    exact: true,
    component: ReviewsPage,
    roles: [Role.User],
  },
  {
    path: '/checkout',
    protected: true,
    exact: true,
    component: Checkout,
    roles: [Role.User],
  },
  {
    path: '/checkout-success',
    protected: false,
    exact: true,
    component: CheckoutSuccess,
    roles: [Role.User],
  },
];

export const adminRoutes = [
  {
    path: '/admin/users',
    protected: false,
    exact: true,
    component: UserManager,
    roles: [Role.Admin],
  },
  {
    path: '/admin/products',
    protected: false,
    exact: true,
    component: AdminProductPage,
    roles: [Role.Admin],
  },
  {
    path: '/admin/sub-categories',
    protected: false,
    exact: true,
    component: AdminSubCatePage,
    roles: [Role.Admin],
  },
  {
    path: '/admin/categories',
    protected: false,
    exact: true,
    component: AdminCategoryPage,
    roles: [Role.Admin],
  },
  {
    path: '/admin',
    protected: false,
    exact: true,
    component: Dashboard,
    roles: [Role.Admin],
  },
];
