import { Button } from '@mui/material'
import React, { Children } from 'react'

const EventsButton: React.FC<{title:string}> = ({title}) => {
    
  return (
    <>
    <Button 
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'capitalize',
                marginLeft: '0.3rem',
                fontSize: '0.6rem',
                fontWeight: 'bold',
                color: '#696969',
                border: '1.5px solid #1E90FF'
              }}
            >
             {title}
            </Button>
    </>
  )
}

export default EventsButton