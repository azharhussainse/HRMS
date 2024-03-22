import * as React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, CardActions, Typography } from '@mui/material';
import RequestModal from './RequestModal';
import { useDialog } from '@/hooks/useDialog';
import { RequestModalType } from 'types/LeavesReport';

type HRLeavesCardProps = {
  title: string;
  availed: number;
  available: number;
  pending: number;
  image?: React.ReactNode;
  handleSubmit: (values: RequestModalType) => void;
  styles: {
    card: object;
    actionBtnStyles?: object;
    cardAction?: object;
  };
};

const LabelTypography: React.FC<{ label: string }> = ({ label }) => (
  <Typography
    sx={{
      color: ' #FFF',
      fontFamily: ' Segoe UI',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal'
    }}
  >
    {label}
  </Typography>
);

const DataBox: React.FC<{ value: number }> = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRight: '1px solid #F5F6F9',
        color: '#222',
        fontFamily: 'Segoe UI',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
      }}
    >
      <Typography sx={{ fontSize: '2rem' }}>{value}</Typography>
    </Box>
  );
};

const HrDashboardCards: React.FC<HRLeavesCardProps> = ({
  title,
  availed,
  available,
  pending,
  image,
  styles,
  handleSubmit
}) => {
  const {
    isDialogOpen,
    openDialog,
    closeDialog: closeRequestDialog
  } = useDialog(false);
  return (
    <Box>
      <Card sx={styles.card}>
        <Typography
          sx={{
            color: ' #222',
            fontFamily: ' Segoe UI',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            padding: '9px'
          }}
        >
          {title}
        </Typography>
        <div>
          <Box
            style={{
              height: '39px',
              width: '100%',
              backgroundColor: '#1273EB',
              display: 'flex',
              color: '#FFF',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <LabelTypography label="Availed" />
            <LabelTypography label="Available" />
            <LabelTypography label="Pending" />
          </Box>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '32%' }}>
            <DataBox value={availed} />
          </div>
          <div style={{ width: '32%' }}>
            <DataBox value={available} />
          </div>
          <div style={{ width: '30%' }}>
            <DataBox value={pending} />
          </div>
        </div>
        <CardActions sx={styles.cardAction}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            sx={styles.actionBtnStyles}
            onClick={openDialog}
          >
            Request
          </Button>

          <div style={{ paddingTop: '25x' }}>{image}</div>
        </CardActions>
      </Card>
      {isDialogOpen && (
        <RequestModal
          closeDialog={closeRequestDialog}
          handleSubmit={handleSubmit}
          title={title}
        />
      )}
    </Box>
  );
};

export default HrDashboardCards;
