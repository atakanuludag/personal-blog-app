"use client";

// ** react
import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";

// ** mui
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// ** icons
import SearchIcon from "@mui/icons-material/Search";

// ** model
import ListQueryModel from "@/models/ListQueryModel";

type AdminSearchInputProps = {
  loading: boolean;
  params: ListQueryModel;
  setParams: Dispatch<SetStateAction<ListQueryModel>>;
};

export default function AdminSearchInput({
  loading,
  params,
  setParams,
}: AdminSearchInputProps) {
  const [searchText, setSearchText] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearchText(e.target.value);

  const handleClickSearch = () =>
    setParams({
      ...params,
      s: searchText,
      sType: "title",
    });

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === "Enter") handleClickSearch();
  };

  return (
    <FormControl fullWidth size="small" variant="outlined" disabled={loading}>
      <InputLabel htmlFor="search-input">Arama</InputLabel>
      <OutlinedInput
        fullWidth
        size="small"
        id="search-input"
        type="text"
        readOnly={loading}
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={loading}
              onClick={handleClickSearch}
              edge="end"
              size="small"
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
        label="Arama"
      />
    </FormControl>
  );
}
