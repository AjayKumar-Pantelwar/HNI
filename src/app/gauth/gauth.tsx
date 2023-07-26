import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import CopyField from "../common/CopyField";

const url = process.env.NEXT_PUBLIC_ADMIN_API_URL;

interface GAuthData {
  url: string;
  secret: string;
}

export const ActivateGAuth = () => {
  const router = useRouter();
  const { credentials, token } = useSelector((state) => state.auth);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Typography variant="subtitle2" color="textSecondary">
        Enter the 6-digit code from your app to activate GAuth
      </Typography>
      <TextField
        error={Boolean(formik.touched.gauth_token && formik.errors.gauth_token)}
        fullWidth
        helperText={formik.touched.gauth_token && formik.errors.gauth_token}
        label="GAuth token"
        margin="normal"
        name="gauth_token"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="gauth_token"
        value={formik.values.gauth_token}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          color="info"
          type="submit"
          variant="contained"
        >
          Activate
        </Button>
      </Box>
    </form>
  );
};

export const GAuth: FC = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const [gauthData, setGauthData] = useState<GAuthData>();
  const { credentials, token } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!credentials || !token) {
      router.push("/authentication/login");
      return;
    }
    const fetchGauth = async () => {
      const { data } = await axios.post(`${url}/accounts/admin/generate-auth`, credentials, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGauthData(data.data);
    };
    fetchGauth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials, token]);

  // const formik = useFormik({
  //   initialValues: { username: "", password: "" },
  //   validationSchema: Yup.object({
  //     username: Yup.string().max(255).required("Username is required"),
  //     password: Yup.string().max(255).required("Password is required"),
  //   }),
  //   onSubmit: async (values, helpers): Promise<void> => {
  //     try {
  //       helpers.setSubmitting(true);
  //       const { data } = await axios.post(`${url}/accounts/admin/generate-auth`, values);
  //       setGauthData(data.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       helpers.setSubmitting(false);
  //     }
  //   },
  // });

  return (
    <>
      {gauthData ? (
        <>
          <Box
            sx={{ my: 2 }}
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Scan the QR Code</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Open Google Authenticator App and scan this QR Code
            </Typography>
            <Box display="flex" width="100%" justifyContent="center" alignItems="center" gap={2}>
              <Box sx={{ boxShadow: theme.shadows[20] }}>
                <QRCode value={gauthData.url} />
              </Box>
              <Box sx={{ width: 220 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Alternatively you can manually put this secret key in your Google Authenticator
                  App
                </Typography>
                <CopyField text={gauthData.secret} truncate={false} fontWeight="bold" />
              </Box>
            </Box>
          </Box>
          <ActivateGAuth />
        </>
      ) : (
        <></>
        // <form noValidate onSubmit={formik.handleSubmit} {...props}>
        //   <TextField
        //     autoFocus
        //     error={Boolean(formik.touched.username && formik.errors.username)}
        //     fullWidth
        //     helperText={formik.touched.username && formik.errors.username}
        //     label="Username"
        //     margin="normal"
        //     name="username"
        //     onBlur={formik.handleBlur}
        //     onChange={formik.handleChange}
        //     type="username"
        //     value={formik.values.username}
        //   />
        //   <TextField
        //     error={Boolean(formik.touched.password && formik.errors.password)}
        //     fullWidth
        //     helperText={formik.touched.password && formik.errors.password}
        //     label="Password"
        //     margin="normal"
        //     name="password"
        //     onBlur={formik.handleBlur}
        //     onChange={formik.handleChange}
        //     type="password"
        //     value={formik.values.password}
        //   />
        //   <Box sx={{ mt: 2 }}>
        //     <Button
        //       disabled={formik.isSubmitting}
        //       fullWidth
        //       size="large"
        //       type="submit"
        //       variant="contained"
        //     >
        //       Generate
        //     </Button>
        //   </Box>
        // </form>
      )}
    </>
  );
};