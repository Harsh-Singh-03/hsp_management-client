import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL as string

export const department = {
    list : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/department/list`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    create : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/department/create`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    update: async(id: string, values: any) => {
        try {
            const {data} = await axios.put(`${base_url}/department/update/${id}`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    delete: async (id: string) => {
        try {
            const {data} = await axios.delete(`${base_url}/department/delete/${id}`, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    }

}

export const admin_credentials = {
    login: async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/login`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    }
}

export const doctors_api = {
    create : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/doctor/onboard`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    login: async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/doctor/login`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    update: async (values: any, id: string) => {
        try {
            const {data} = await axios.put(`${base_url}/admin/doctor/update/${id}`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    delete: async (id: string) => {
        try {
            const {data} = await axios.delete(`${base_url}/admin/doctor/delete/${id}`, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
}

export const patient_api = {
    create : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/patient/create`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    login: async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/patient/login`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    delete: async (id: string) => {
        try {
            const {data} = await axios.delete(`${base_url}/admin/patient/delete/${id}`, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    list: async (body: any) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/patients/list`, body, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
}

export const appointment_api = {
    create : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/appointment/create`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    addHistory: async (id: string, values: any) => {
        try {
            const {data} = await axios.put(`${base_url}/doctor/appointment/update/${id}`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    patient_req : async (values: any) => {
        try {
            const {data} = await axios.post(`${base_url}/patient/appointment/create?req_from=user`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    update: async (id: string, values: any) => {
        try {
            const {data} = await axios.put(`${base_url}/admin/appointment/update/${id}`, values, {withCredentials: true})
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    }
}

export const files_api = {
    upload: async (files : any) => {
        try {
            const formdata = new FormData()
            formdata.append('file', files)
            const {data} = await axios.post(`${base_url}/files/upload`, formdata, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
    delete: async (files : any) => {
        try{
            const {data} = await axios.post(`${base_url}/files/delete`, files )
            return data
        } catch (error : any) {
            return {message: error?.response?.data?.message || 'server error', success: false}
        }
    },
}