import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import sweetAlerts from "./SweetAlerts";
import axiosGeneralRequest from "../../../../../services/apiServiceRequests";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { Button} from "@mui/material";
import { MdDeleteForever,MdCleaningServices  } from "react-icons/md";
import "./style.css";
import axios from "axios";

//adicionando export 
export {
    axios,
    MdCleaningServices,
    MdDeleteForever,
    Button,
    sweetAlerts,
    AiOutlineProduct,
    useEffect,
    useState,
    axiosGeneralRequest,
    Row,
    Form,
    Col,
}