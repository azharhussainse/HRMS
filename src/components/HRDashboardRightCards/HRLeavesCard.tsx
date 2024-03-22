import * as React from 'react';
import HrDashboardCards from '../shared-components/HRDashboardCards/HrDashboardCards';
import { useApplyForLeave } from '@/hooks/Leaves/useApplyForLeave';
import { useGetLeavesReport } from '@/hooks/Leaves/useGetLeavesReport';
import { RequestModalType } from 'types/LeavesReport';

const styles = {
  card: {
    width: '100%',
    height: '180px',
    boxShadow: 'unset'
  },
  actionBtnStyles: {
    color: ' #FFF',
    fontFamily: ' Segoe UI',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal'
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
const HRLeavesCard = () => {
  const { data: leavesReport, isLoading, isError } = useGetLeavesReport();
  const applyForLeaveMutation = useApplyForLeave();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching leave reports</p>;
  }

  const handleSubmit = (formLeaves: RequestModalType) => {
    applyForLeaveMutation.mutateAsync(formLeaves);
  };

  return (
    <>
      <HrDashboardCards
        title="Leaves"
        availed={leavesReport?.availed || 0}
        available={leavesReport?.available || 0}
        pending={leavesReport?.pending || 0}
        styles={styles}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default HRLeavesCard;
