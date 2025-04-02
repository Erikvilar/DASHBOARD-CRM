import axios from "axios";
import apiUrlBase from "./apiUrlBase"


const { IPconnection, PORTconnection } = apiUrlBase.network;

const { update, create, baseUrl, project } = apiUrlBase.general;

const { login, auth,logout } = apiUrlBase.authentication;



const axiosGeneralRequest = {
  
  login: async (data) => {
    try {
      const response = await axios.post(
        `http://${IPconnection}:${PORTconnection}${auth}${login}`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  upload: async (data,token) => {
    try {
      const response = await axios.post(
        `http://${IPconnection}:${PORTconnection}/upload`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async (data) => {
    try {
      const response = await axios.post(
        `http://${IPconnection}:${PORTconnection}${auth}${logout}`,
        data,
       
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  get: async (token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}${baseUrl}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  project: async (projectName, token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}${project}${projectName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (data, token) => {
    try {
      const response = await axios.put(
        `http://${IPconnection}:${PORTconnection}${baseUrl}${update}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (data, token) => {
    try {
      const response = await axios.post(
        `http://${IPconnection}:${PORTconnection}${baseUrl}${create}/list`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (data, token) => {
    try {
      const response = await axios.delete(
        `http://${IPconnection}:${PORTconnection}${baseUrl}/${data}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  websocket: async () => {
    try {
      const response = await axios.get("http://10.15.116.39:6680/ws", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {}
  },

  responsibles: async (token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}${baseUrl}/responsible`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
 
        return response;

      }
    } catch (error) {
      throw error;
    }
  },

  costCenter: async (token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}${baseUrl}/costCenter`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
 
        return response;

      }
    } catch (error) {
      throw error;
    }
  },

  users: async (token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}${baseUrl}/users`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
 
        return response;

      }
    } catch (error) {
      throw error;
    }
  },
  
  log: async (token) => {
    try {
      const response = await axios.get(
        `http://${IPconnection}:${PORTconnection}/log`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
 
        return response;

      }
    } catch (error) {
      throw error;
    }
  },

};

export default axiosGeneralRequest;
