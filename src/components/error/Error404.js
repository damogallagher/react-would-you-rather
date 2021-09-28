import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Error404 = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">This requested page could not be found!</Alert>
    </Stack>
  );
};

export default Error404;
