import { Alert, Box } from '@mui/material';
import { shallowEqual } from 'react-redux';
import store, { useAppSelector } from '../../store';
import { alertActions } from '../../store/alertSlice';

const AlertsList = () => {
  const alerts = useAppSelector((global) => global.alertSlice.alerts, shallowEqual);

  return (
    <Box>
      {alerts.map((current) => (
        <Alert
          onClose={() => store.dispatch(alertActions.close(current.id))}
          severity={current.type}
          key={current.id}>
          {current.message}
        </Alert>
      ))}
    </Box>
  );
};

export default AlertsList;
