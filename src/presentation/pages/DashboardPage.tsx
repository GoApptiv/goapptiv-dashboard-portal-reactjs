import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { LoggedInUser } from "../../domain/usages/auth/logged-in-user";
import { pageRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { FetchDashboards } from "../../domain/usages/fetch-dashboards";
import { DashboardLinks } from "../../domain/models/dashboardLinks";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { CheckChangePassword } from "../../domain/usages/auth/check-change-password";
import { ChangePassword } from "../../domain/usages/auth/change-password";
import Swal from "sweetalert2";

type Props = {
  loggedInUser: LoggedInUser;
  remoteFetchDashboards: FetchDashboards;
  remoteCheckChangePassword: CheckChangePassword;
  remoteChangePassword: ChangePassword;
};

const DashboardPage = (props: Props) => {
  const loggedInUserDetails = props.loggedInUser.getUser();
  const loggedInUserToken = props.loggedInUser.getToken();
  const navigate = useNavigate();

  const [onFrame, setOnFrame] = React.useState(false);
  const [names, setNames] = React.useState<string[]>([]);
  const [dashboardLink, setDashboardLink] = React.useState<DashboardLinks[]>(
    []
  );
  const [dashboardUrl, setDashboardUrl] = React.useState("");
  const [selectedDashboard, setSelectedDashboard] = React.useState("");
  const [selectedDashboardLink, setSelectedDashboardLink] = React.useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] =
    React.useState(false);

  const CheckForChangePassword = async () => {
    let result = await props.remoteCheckChangePassword.check();
    if (result.status == 200 && result.data.can_change_password) {
      setShowChangePasswordModal(true);
    } else if (result.status == 200 && !result.data.can_change_password) {
      fetchDashboardLinks();
    } else if (result.data.message) {
      Swal.fire(result.data.message, "", "error");
    }
  };

  const handleCloseShowChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const logout = () => {
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
  };

  const fetchDashboardLinks = async () => {
    let links = await props.remoteFetchDashboards.fetch();
    if (links.dashboards) {
      setDashboardLink(links.dashboards);
    }
    if (dashboardUrl?.length == 0 || dashboardUrl == "") {
      setDashboardUrl(links.dashboards[0].link);
      setSelectedDashboardLink(links.dashboards[0].link);
      setSelectedDashboard(links.dashboards[0]?.name);
    }
  };

  useEffect(() => {
    if (!loggedInUserToken) {
      navigate("/auth/login");
    }
    if (loggedInUserToken) {
      CheckForChangePassword();
    }
    setNames([]);

    document.onvisibilitychange = function (e) {
      setDashboardUrl("");
    };

    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };
  }, []);

  const onDashboardChange = (e?: any) => {
    setSelectedDashboard(e?.target.value);
    dashboardLink?.map((data, key) => {
      if (e.target.value === data.name) {
        setSelectedDashboardLink(data.link);
        setDashboardUrl(data.link);
      }
    });
  };

  useEffect(() => {
    nameList();
  }, [dashboardLink]);

  const nameList = () => {
    if (names.length == 0) {
      dashboardLink?.map((data, key) => names.push(data.name));
    }
  };

  return (
    <div
      onMouseEnter={() => {
        setOnFrame(true);
        nameList();
        setDashboardUrl(selectedDashboardLink);
      }}
      onMouseLeave={() => {
        setDashboardUrl("");
        // setNames([]);

        setOnFrame(false);
      }}
    >
      <Navbar
        loggedInUser={props.loggedInUser}
        loggedInUserDetails={loggedInUserDetails}
        names={names}
        onDashboardChange={onDashboardChange}
        selectedDashboard={selectedDashboard}
      />

      <div className=" ml-[13%] pt-[5%] mr-[8%]  ">
        <div>
          {onFrame ? (
            <div className=" absolute top-[50%] left-[45%] text-center">
              <CircularProgress />
              <Typography>Loading Data... </Typography>
            </div>
          ) : (
            <Typography
              fontSize={"large"}
              className="absolute top-[50%] left-[30%] "
            >
              Please make sure that the cursor is on the window to load the data
            </Typography>
          )}
          {onFrame && (
            <iframe
              id="dashboard"
              height="85%"
              width="100%"
              src={dashboardUrl}
              frameBorder={0}
              allowFullScreen
              className="right-[0%] fixed top-[15%]"
            />
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      {showChangePasswordModal && (
        <ChangePasswordModal
          remoteChangePassword={props.remoteChangePassword}
          open={showChangePasswordModal}
          handleClose={handleCloseShowChangePasswordModal}
          CheckForChangePassword={CheckForChangePassword}
        />
      )}
    </div>
  );
};

export default DashboardPage;
