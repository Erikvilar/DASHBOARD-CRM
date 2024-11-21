import axios from "axios";
import apiUrlBase from "./ApiUrlBase";
export const axiosGeneralRequest = {

  get: async (token) => {
    try {
      const response = await axios.get(`${apiUrlBase.general.baseUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response; 
    } catch (error) {
      throw error; 
    }
  },

  put:async(data,token)=>{
    try {
      const response = await axios.put(`${apiUrlBase.general.update}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (data, token) => {
    try {
      const response = await axios.put(url, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  delete:async(data,token)=>{
    try {
      const response = await axios.delete(apiUrlBase.general.delete+`${data}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  
}

export default axiosGeneralRequest

