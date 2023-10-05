import { Skeleton } from "@mui/material";

const DropDownLoading = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={30}
      sx={{
        width: "70%",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    />
  );
};

export default DropDownLoading;
