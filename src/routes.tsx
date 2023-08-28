import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";

export interface IRoute {
  icon: JSX.Element;
}

export type IRouteKey = keyof typeof routes;

const routes = {
  "/": {
    icon: <Ionicons name="home-outline" size={30} color="black" />,
  },
  "/account": {
    icon: <MaterialIcons name="account-box" size={30} color="black" />,
  },
  "/create": {
    icon: <Ionicons name="create-outline" size={30} color="black" />,
  },
};

export default routes;
