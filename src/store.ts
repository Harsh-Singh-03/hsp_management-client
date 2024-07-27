import { configureStore } from '@reduxjs/toolkit'
import { department_slice } from './slice/admin/department_slice'
import { admin_credentials } from './slice/admin/credential_slice'
import { doctors_slice } from './slice/admin/doctor_slice'
import { activeIndexSlice } from './slice/admin/basic_slice'
import { patients_slice } from './slice/admin/patient_slice'
import { appointment_slice } from './slice/admin/appointment_slice'
import { doctor_credentials } from './slice/doctor/credential_slice'
import { patient_credentials } from './slice/patient/credential_slice'
import { patient_appointment_slice } from './slice/patient/appointment_slice'
import { doctor_appointment_slice } from './slice/doctor/appointment_slice'

export const store = configureStore({
  reducer: {
    department: department_slice,
    admin_auth: admin_credentials,
    doctor_auth: doctor_credentials,
    patient_auth: patient_credentials,
    doctors_list: doctors_slice,
    patients_list: patients_slice,
    appointment_list: appointment_slice,
    patient_appointment: patient_appointment_slice,
    doctor_appointment: doctor_appointment_slice,
    activeIndex: activeIndexSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch