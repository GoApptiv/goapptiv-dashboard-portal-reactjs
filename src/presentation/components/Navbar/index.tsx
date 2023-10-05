import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import goApptivIcon from "../../../assests/images/goapptivicon.png";
import { LoggedInUser } from "../../../domain/usages/auth/logged-in-user";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../routes";
import { User } from "../../../domain/models/auth/user";
import { Button, FormControl, Select, Stack } from "@mui/material";
import DropDownLoading from "../DropdownSkeleton";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  loggedInUser: LoggedInUser;
  loggedInUserDetails: User | null;
  names: string[];
  onDashboardChange: Function;
  selectedDashboard: string;
};
const ResponsiveAppBar = (props: Props) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  async function handleLogout() {
    props.loggedInUser.setToken("");
    props.loggedInUser.setUser({
      user_id: 0,
      role: "",
      auth_token: "",
      user_name: "",
      mobile: "",
      department: "",
      password: "",
    });
    navigate(pageRoutes.login);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AppBar position="fixed" sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <img width={150} src={goApptivIcon}></img>
          {props.names.length > 0 ? (
            <FormControl
              size="small"
              sx={{
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Select
                value={props.selectedDashboard}
                sx={{
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size="small"
                placeholder="Name"
                onChange={(e) => props.onDashboardChange(e)}
              >
                {props.names.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <DropDownLoading />
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Button onClick={handleLogout}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                fontWeight={550}
                textTransform={"none"}
                color={"error.main"}
              >
                Logout
              </Typography>

              <LogoutIcon color="error" fontSize="small" />
            </Stack>
          </Button>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={props?.loggedInUserDetails?.user_name}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "40px", mr: "20px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div
                style={{
                  paddingLeft: "1rem",
                  paddingBottom: "1rem",
                  marginRight: "1rem",
                }}
              >
                <Typography>Signed in as</Typography>
                <Typography fontWeight="bold">
                  {props?.loggedInUserDetails?.user_name}
                </Typography>
              </div>
              <hr className="border-1 border-blue-500 " />
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
