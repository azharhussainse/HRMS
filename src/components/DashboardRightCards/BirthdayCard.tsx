import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import { useEmployees } from '@/hooks/employee/useEmployees';

const BirthdayCard = () => {
  const { data: employees, isLoading, isError } = useEmployees();

  const today = new Date();
  const birthdayEmployees = employees?.filter(employee => {
    const employeeDOB = new Date(employee.dob);
    return (
      employeeDOB.getMonth() === today.getMonth() &&
      employeeDOB.getDate() === today.getDate()
    );
  });

  return (
    <Card
      sx={{
        width: '100%',
        height: 'auto',
        boxShadow: 'unset',
        backgroundImage: "url('/asset/Birthday.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        padding: '0px'
      }}
    >
      <CardContent sx={{ marginLeft: '10%', padding: '0px', marginTop: '5%' }}>
        <Typography gutterBottom variant="h6" component="div">
          Birthdays Today
        </Typography>
        {!birthdayEmployees?.length ? (
          <Typography variant="body1" sx={{ padding: '20px' }}>
            No birthdays today
          </Typography>
        ) : (
          <Carousel infiniteLoop autoPlay stopOnHover swipeable>
            {birthdayEmployees?.map(employee => (
              <div key={employee.id}>
                <Typography
                  variant="body1"
                  sx={{ margin: '10px', padding: '5px' }}
                >
                  {employee.name}'s Birthday
                </Typography>
              </div>
            ))}
          </Carousel>
        )}
        <Button variant="contained" color="primary">
          Wish Him
        </Button>
      </CardContent>
    </Card>
  );
};

export default BirthdayCard;
