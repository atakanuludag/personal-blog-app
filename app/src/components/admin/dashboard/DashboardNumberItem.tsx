"use client";

// ** mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  height: 240,
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  padding: theme.spacing(2),
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const StyledContentBox = styled(Box)(() => ({
  height: 55,
}));

type DashboardNumberItemProps = {
  icon: JSX.Element;
  title: string;
  count: number;
  loading: boolean;
};

export default function DashboardNumberItem({
  icon,
  title,
  count,
  loading,
}: DashboardNumberItemProps) {
  return (
    <StyledCard>
      <StyledIcon>{icon}</StyledIcon>
      <StyledContentBox>
        {loading ? (
          <CircularProgress size={20} color="primary" sx={{ color: "#000" }} />
        ) : (
          <Typography variant="h3">{count}</Typography>
        )}
      </StyledContentBox>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </StyledCard>
  );
}
