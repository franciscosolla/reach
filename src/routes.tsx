import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";

export interface IRoute {
  icon: JSX.Element;
  userRole: "guest" | "user";
}

export type IRouteKey = keyof typeof routes;

const routes: Record<string, IRoute> = {
  "/": {
    icon: <Ionicons name="home-outline" size={30} color="black" />,
    userRole: "guest",
  },
  "/account": {
    icon: <MaterialIcons name="account-box" size={30} color="black" />,
    userRole: "user",
  },
  "/create": {
    icon: <Ionicons name="create-outline" size={30} color="black" />,
    userRole: "user",
  },
};

export default routes;
