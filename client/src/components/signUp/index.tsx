import { useState } from 'react';
import { Avatar, Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import { PASSWORD_REGEX_PATTERN } from '../../../consts'
import { Container } from '../container';

// const theme = createTheme();

export const SignUp = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const { handleSubmit, control } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const { email, password } = data
    try {
      setError("")
      setLoading(true)
      // await auth.signInWithEmailAndPassword(email, password)
      // history.push("/")
    } catch {
      setError("Failed to sign in")
    }
    setLoading(false)
  }

  return (
    <Container >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
          <LockClockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="First Name"
                    required
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "First name is required",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Last Name"
                    required
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "Last name is required",
                }} />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "Email required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: PASSWORD_REGEX_PATTERN,
                    message: "The password is to week.",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link to={'/'}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}