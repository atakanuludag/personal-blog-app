"use client";

// ** third party
import { merge } from "lodash";

// ** mui
import { Theme } from "@mui/material/styles";

// ** mui overrides
import CssBaseline from "@/theme/overrides/CssBaseline";
import TextField from "@/theme/overrides/TextField";
import OutlinedInput from "@/theme/overrides/OutlinedInput";
import FormLabel from "@/theme/overrides/FormLabel";
import Button from "@/theme/overrides/Button";
import ToggleButton from "@/theme/overrides/ToggleButton";
import ButtonBase from "@/theme/overrides/ButtonBase";
import Link from "@/theme/overrides/Link";
import ListItemButton from "@/theme/overrides/ListItemButton";
import Checkbox from "@/theme/overrides/Checkbox";
import CircularProgress from "@/theme/overrides/CircularProgress";
import Switch from "@/theme/overrides/Switch";
import Tab from "@/theme/overrides/Tab";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    CssBaseline(theme),
    TextField(theme),
    OutlinedInput(theme),
    FormLabel(theme),
    Button(theme),
    ToggleButton(theme),
    ButtonBase(theme),
    Link(theme),
    ListItemButton(theme),
    Checkbox(theme),
    CircularProgress(theme),
    Switch(theme),
    Tab(theme)
  );
}
