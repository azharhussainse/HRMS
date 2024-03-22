import React from 'react';
import HrDashboardCards from '../shared-components/HRDashboardCards/HrDashboardCards';
import Frame from '../../../public/asset/Frame.svg';
import Image from 'next/image';
import { useGetWorkFromHomeReport } from '@/hooks/workFromHome/useGetWorkFromHomeReport';
import { RequestModalType } from 'types/LeavesReport';
import { useApplyForWorkFromHome } from '@/hooks/workFromHome/useApplyForWorkFromHome';
type Props = {};
const styles = {
  card: {
    width: '100%',
    height: '310px',
    boxShadow: 'unset',
    marginTop: '8px'
  },
  actionBtnStyles: {
    color: ' #FFF',
    fontFamily: ' Segoe UI',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    marginTop: '95px',
    marginRight: '5px'
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};
const HRWorkFromHomeCard = (props: Props) => {
  const {
    data: workFromHomeReport,
    isLoading,
    isError
  } = useGetWorkFromHomeReport();
  const applyForWorkFromHomeMutation = useApplyForWorkFromHome();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching work from home reports</p>;
  }

  const handleSubmit = (formValues: RequestModalType) => {
    applyForWorkFromHomeMutation.mutateAsync(formValues);
  };

  return (
    <HrDashboardCards
      title="Work From Home"
      availed={workFromHomeReport?.availed || 0}
      available={workFromHomeReport?.available || 0}
      pending={workFromHomeReport?.pending || 0}
      styles={styles}
      image={<Image src={Frame} alt="" width={156} height={151} />}
      handleSubmit={handleSubmit}
    />
  );
};

export default HRWorkFromHomeCard;
