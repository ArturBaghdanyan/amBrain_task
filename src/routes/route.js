import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import TableList from "../components/table-list";
import React from "react";

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/table-list', element: <TableList /> },
])
