"use client";

import { useContext } from "react";
import { ComponentContext } from "@/context/ComponentContext";

const useComponent = () => useContext(ComponentContext);

export default useComponent;
