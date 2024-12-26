import { useEffect, useState } from "react";
import { BASE_URL, getApi, postApi } from "../utils/api";
import { Box } from "@mui/system";
import { Alert, Button, Snackbar, Switch, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GeyserSwitch = () => {
  const [geyserState, setGeyserState] = useState({})
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false)

  const fetchGeyserState = async () => {
    try {
      const url = BASE_URL + "/geyser/status"
      const key = localStorage.getItem('key')
      const response = await getApi(url, {}, { key }, navigate);
      setGeyserState(response)
    } catch (error) {
      console.error('Error fetching geyser state:', error);
      navigate("/login")
    }
  };

  function showAlertBriefly() {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000)
  }

  function handleToggleGeyserError(error) {
    if (error.response && error.response.status === 400) {
      const errorCode = error.response.data?.code;
      if (errorCode === 1001 || errorCode === 1002) {
        showAlertBriefly()
      }
    }
    fetchGeyserState()
  }

  const toggleGeyser = async () => {
    try {
      const url = BASE_URL + "/geyser/action"
      const key = localStorage.getItem('key')
      const body = { turnGeyserOn: !geyserState.isOn };
      await postApi(url, { key }, body, navigate);
      fetchGeyserState()
    } catch (error) {
      handleToggleGeyserError(error)
      console.error('Error in geyser action:', error);
    }
  }

  useEffect(() => {
    fetchGeyserState();
  }, []);

  return (
    <>
      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          Dirty state, refreshing
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          height: '5vh',
        }}
      >
        <Button style={{ marginRight: 50 }} variant="outlined" onClick={fetchGeyserState} >Referesh</Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '25vh',
          marginTop: '25vh'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Geyser Control
        </Typography>
        <Switch
          checked={geyserState.isOn}
          onChange={() => toggleGeyser()}
          disabled={geyserState.isOn && !geyserState.isUserAction}
          color="primary"
          sx={{ transform: 'scale(2)' }}
        />
        <Typography variant="h6" style={{ marginTop: 40 }}>
          {geyserState.isOn ? 'Geyser is ON' : 'Geyser is OFF'}
        </Typography>
        <Typography variant="h6" noWrap={false} width={250} style={{ marginTop: 75 }}>
          {"Turned " + (geyserState.isOn ? "ON" : "OFF") + " by " + geyserState.actionBy + " on " + geyserState.changeTime}
        </Typography>
      </Box>

    </>
  );
};


const Geyser = () => {
  return (
    <div>
      <GeyserSwitch />
    </div>
  )
}

export default Geyser;
