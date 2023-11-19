"use client";

// ** config
import { APP_VERSION } from "@/config";

// ** mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledFooter = styled("footer")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "25px 0px",
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Typography variant="caption" display="block" color="grey">
        © Atakan Yasin Uludağ v{APP_VERSION}
      </Typography>
    </StyledFooter>
  );
}
