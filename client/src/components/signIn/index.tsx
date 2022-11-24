import { useState } from 'react';
import { Avatar, Box, Button, CssBaseline, TextField, ThemeProvider, Typography } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX_PATTERN, PASSWORD_REGEX_PATTERN } from '../../../consts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import theme from '../../../theme';
import { Container } from '../container';

export const SignIn = () => {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
    <Container>
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Email required",
              pattern: {
                value: EMAIL_REGEX_PATTERN,
                message: "Invalid email address",
              },
            }}
          />
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
                margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to={'signup'}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
}