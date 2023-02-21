import { Typography } from "@mui/material";

export function Footer(props: any) {
  return (
    <Typography color="text.secondary" align="center" {...props}>
      {"Copyright © Dev Mode "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
