import { Suspense, lazy, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './common/loader';
import { Route, Routes } from 'react-router-dom';
// import routes from './routes';
import Dashboard from './pages/Dashboard';
import RootLayout from './layout/RootLayout';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import VerificationCode from './pages/VerificationCode';
import Signup from './pages/Signup';
import TwoStepVerification from './pages/TwoStepVerification';
import CompleteProfile from './pages/CompleteProfile';
import Home from './pages';
import Teachers from './pages/Teachers';
import Calendar from './pages/Calendar';
import Classes from './pages/Classes';
import Students from './pages/Students';
import Services from './pages/Services';
import Payments from './pages/Payments';
import Vouchers from './pages/Vouchers';
import TeacherEdit from './pages/TeacherEdit';
import ClassesView from './pages/ClassesView';
import StudentAdd from './pages/StudentAdd';
import StudentView from './pages/StudentView';
import { useAuth } from './contexts/AuthContext';
import PanelProtectedRoute from './routes/PanelProtectedRoute';
import LoginProtectedRoute from './routes/LoginProtectedRoute';
import TeacherView from './pages/TeacherView';
import ClassesAdd from './pages/ClassesAdd';
import TeacherAdd from './pages/TeacherAdd';
import ServiceAdd from './pages/ServiceAdd';
import PaymentPending from './components/paymentComp/PaymentPending';
import PaymentPendingView from './pages/PaymentPendingView';
import VoucherAdd from './pages/voucherAdd';
import VoucherView from './pages/VoucherView';
import Profile from './pages/Profile';
import VoucherLayout from './layout/VoucherLayout';
import VoucherRules from './components/voucherComp/VoucherRules';
import VoucherHIstory from './components/voucherComp/VoucherHIstory';
import ClassLayout from './layout/ClassLayout';
import ClassStudents from './components/classComp/ClassStudents';
import ClassComments from './components/classComp/ClassComments';
import ClassHistory from './components/classComp/ClassHistory';
import StudentViewLayout from './layout/StudentViewLayout';
import StudentProfile from './components/studentComp/StudentProfile';
import StudentClasses from './components/studentComp/StudentClasses';
import StudentPayment from './components/studentComp/StudentPayment';
import StudentOnboarding from './components/studentComp/StudentOnboarding';
import StudentComments from './components/studentComp/StudentComments';

// const Home = lazy(() => import('./pages'))
// const Teachers = lazy(() => import('./pages/Teachers'));
// const TeacherEdit = lazy(() => import('./pages/TeacherEdit'));
// const Calendar = lazy(() => import('./pages/Calendar'));
// const Classes = lazy(() => import('./pages/Classes'));
// const ClassesView = lazy(() => import('./pages/ClassesView'));
// const Students = lazy(() => import('./pages/Students'));
// const StudentAdd = lazy(() => import('./pages/StudentAdd'));
// const StudentView = lazy(() => import('./pages/StudentView'));
// const Services = lazy(() => import('./pages/Services'));
// const Payments = lazy(() => import('./pages/Payments'));
// const Vouchers = lazy(() => import('./pages/Vouchers'));

// const DefaultLayout = lazy(() => import('./pages/index'));

function App() {
  const [count, setCount] = useState(0)
  const { currentUser } = useAuth();
  // console.log(currentUser)
  return (
    <>
      {/* <Loader /> */}
      <Routes>
        <Route path='/' element={<PanelProtectedRoute user={currentUser}> <RootLayout /> </PanelProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='teachers/add' element={<TeacherAdd />} />
          <Route path='teachers/edit' element={<TeacherEdit />} />
          <Route path='teachers/view/:id' element={<TeacherView />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='classes' element={<Classes />} />
          <Route path='classes/add' element={<ClassesAdd />} />
          <Route path='classes/view/:id' element={<ClassLayout />} >
            <Route index element={<ClassesView />} />
            <Route path='students' element={<ClassStudents />} />
            <Route path='comment' element={<ClassComments />} />
            <Route path='history' element={<ClassHistory />} />
          </Route>
          <Route path='students' element={<Students />} />
          <Route path='students/add' element={<StudentAdd />} />
          <Route path='students/view/:id' element={<StudentViewLayout />} >
            <Route index element={<StudentProfile />} />
            <Route path='classes' element={<StudentClasses />} />
            <Route path='payment' element={<StudentPayment />} />
            <Route path='onboarding' element={<StudentOnboarding />} />
            <Route path='comments' element={<StudentComments />} />
          </Route>
          <Route path='services' element={<Services />} />
          <Route path='services/add' element={<ServiceAdd />} />
          <Route path='payments' element={<Payments />} />
          <Route path='payments/view' element={<PaymentPendingView />} />
          <Route path='vouchers' element={<VoucherLayout />} >
            <Route index element={<VoucherRules />} />
            <Route path='history' element={<VoucherHIstory />} />
          </Route>
          <Route path='vouchers/view' element={<VoucherView />} />
          <Route path='vouchers/add' element={<VoucherAdd />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<LoginProtectedRoute user={currentUser}><Login /></LoginProtectedRoute>} />
        {/* <Route path='/signup' element={<Signup />} /> */}
        {/* <Route path='/forget-password' element={<ForgetPassword />} /> */}
        {/* <Route path='/two-step-verification' element={<TwoStepVerification />} /> */}
        {/* <Route path='/complete-profile' element={<CompleteProfile />} /> */}
        {/* <Route path='/verification' element={<VerificationCode />} /> */}
      </Routes>
    </>
  )
}

export default App
