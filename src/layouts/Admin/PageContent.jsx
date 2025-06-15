import { Box } from "@mui/material";

const PageContent = ({ children }) => {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
      {children}
    </Box>
  );
}
export default PageContent;