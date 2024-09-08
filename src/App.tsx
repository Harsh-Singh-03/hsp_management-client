import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminOverView } from './screen/admin/overview'
import { Department } from './screen/admin/department'
import { Fragment } from 'react/jsx-runtime'
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLogin } from './screen/admin/admin-login'
import { ValidateAdmin } from './components/admin/admin-protect'
import { Doctors } from './screen/admin/doctors'
import { Patients } from './screen/admin/patients'
import { Appointments } from './screen/admin/appointment'
import { DoctorLogin } from './screen/doctor/doctor-login'
import { PatientLogin } from './screen/patient/patient_login'
import { ValidatePatient } from './components/patient/validator'
import { PatientDashboard } from './screen/patient/patient_dashboard'
import { ValidateDoctor } from './components/doctor/validator'
import { DoctorDashboard } from './screen/doctor/doctor_dashboard'
import { Home } from './screen/Home.js'
import { ForgetPass } from './screen/forget_pass.js'
import { NewPass } from './screen/new_pass.js'
import { VerifyEmail } from './screen/email_verify.js'
import { SupportPage } from './screen/admin/support.js'

function App() {
  return (
    <Fragment>
      <Routes>
        {/* Admin route */}
        <Route path="/admin" element={<ValidateAdmin />}>
          <Route index element={<AdminOverView />} />
        </Route>
        <Route path="/admin/department" element={<ValidateAdmin />}>
          <Route index element={<Department />} />
        </Route>
        <Route path="/admin/doctors" element={<ValidateAdmin />}>
          <Route index element={<Doctors />} />
        </Route>
        <Route path="/admin/patients" element={<ValidateAdmin />}>
          <Route index element={<Patients />} />
        </Route>
        <Route path="/admin/appointments" element={<ValidateAdmin />}>
          <Route index element={<Appointments />} />
        </Route>
        <Route path="/admin/support" element={<ValidateAdmin />}>
          <Route index element={<SupportPage />} />
        </Route>

        {/* patient route */}
        <Route path="/patient" element={<ValidatePatient />}>
          <Route index element={<PatientDashboard />} />
        </Route>
        {/* doctor route */}
        <Route path="/doctor" element={<ValidateDoctor />}>
          <Route index element={<DoctorDashboard />} />
        </Route>
        {/* credentials route */}
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/forget-pass/:path" element={<ForgetPass />} />
        <Route path="/new-pass/:path/:id/:token" element={<NewPass />} />
        <Route path="/verify-email/:path/:id/:token" element={<VerifyEmail />} />

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        style={{ padding: '0px', fontSize: 14, top: 5 }}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </Fragment>
  )
}

export default App
