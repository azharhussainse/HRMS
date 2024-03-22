import { Grid } from '@mui/material'
import React from 'react'
import ViewallEvents from './ViewallEvents'

type Props = {}

const NewsAndEventsViewAll = (props: Props) => {
  return (
    <>
    <Grid container  xs={12} md={12}
        style={{
          width: '100%',
          marginTop: '2.5%'}}
          >
         <ViewallEvents/>
          </Grid>

    </>
  )
}

export default NewsAndEventsViewAll;