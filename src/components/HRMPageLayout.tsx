import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  pageLayout__item: {
    width: '100%',
    // marginTop: '5%'
  },

  pageLayout__container: {
    // width: '100%',
    // marginTop: '5%'
  }
});

type Props = {
  children: React.ReactNode;
};

export default function HRMPageLayout({ children }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Grid container className={classes.pageLayout__container}>
      <Grid item className={classes.pageLayout__item}>
        {children}
      </Grid>
    </Grid>
  );
}
