import { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Switch,
  TextField,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../components/upload';
//
import countries from '../../components/user/account/countries';

// ----------------------------------------------------------------------

export default function AccountGeneral({
  displayName,
  setDisplayName,
  displayEmail,
  setDisplayEmail,
  displayCountry,
  setDisplayCountry,
  displayRegion,
  setDisplayRegion,
  displayCity,
  setDisplayCity,
  displayAddress,
  setDisplayAddress,
  displayPhone,
  setDisplayPhone,
  displayAbout,
  setDisplayAbout,
  displayZip,
  setDisplayZip,
  makeChange,
  setMakeChange
}) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const [userInfo, setUserInfo] = useState({
    photoURL: 'user.photoURL'
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <Box
            sx={{
              my: 10,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <UploadAvatar
              disabled={!makeChange}
              value={userInfo.photoURL}
              onChange={(value) => setFieldValue('photoURL', value)}
            />
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Email"
                  value={displayEmail}
                  onChange={(e) => setDisplayEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Phone number"
                  value={displayPhone}
                  onChange={(e) => setDisplayPhone(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Address"
                  value={displayAddress}
                  onChange={(e) => setDisplayAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Country"
                  value={displayCountry}
                  onChange={(e) => setDisplayCountry(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="State/Region"
                  value={displayRegion}
                  onChange={(e) => setDisplayRegion(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="City"
                  value={displayCity}
                  onChange={(e) => setDisplayCity(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  label="Zip"
                  value={displayZip}
                  onChange={(e) => setDisplayZip(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={!makeChange}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="About"
                  value={displayAbout}
                  onChange={(e) => setDisplayAbout(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              {makeChange ? (
                <LoadingButton
                  variant="contained"
                  pending={isSubmitting}
                  onClick={() => setMakeChange(!makeChange)}
                >
                  Save Changes
                </LoadingButton>
              ) : (
                <LoadingButton
                  color="info"
                  variant="contained"
                  onClick={() => setMakeChange(!makeChange)}
                >
                  Make Change
                </LoadingButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
