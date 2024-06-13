// import { yupResolver } from '@hookform/resolvers/yup';
// import Close from '@mui/icons-material/Close';
// import { Box, Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import { useForm } from 'react-hook-form';
// import { RHFTextField } from 'src/components/hook-form';
// import FormProvider from 'src/components/hook-form/form-provider';
// import RHFDateField from 'src/components/hook-form/rhf-date-field';
// import { PreviewFile } from 'src/components/preview-file';
// import { UploadFile } from 'src/components/upload-file';
// import { ResearchCard } from 'src/types/content-management/research.types';
// import * as Yup from 'yup';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   card?: ResearchCard;
// }

// const AddNewsModal = (props: Props) => {
//   const { onClose, open, card } = props;

//   const addReportSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     tags: Yup.string().required('Tags is required'),
//     description: Yup.string()
//       .required('description is required')
//       .max(200, 'description must be less than 150 characters'),
//     uploadDate: Yup.string().required('Upload Date is required'),
//     image: Yup.mixed().nonNullable().required('Image is required'),
//   });

//   const defaultValues = {
//     title: card?.title || '',
//     tags: '',
//     description: '',
//     uploadDate: '',
//     image: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(addReportSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//     setValue,
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {});

//   const image = watch('image');

//   const handleFileChangePerm = (file: File | null) => {
//     setValue('image', file as any);
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           minWidth: '700px',
//         },
//       }}
//     >
//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
//           <Typography variant="h5">Add News</Typography>
//           <IconButton onClick={onClose}>
//             <Close />
//           </IconButton>
//         </Box>
//         <Divider />
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={3}>
//             <Grid item md={6} xs={12}>
//               <Stack gap={3}>
//                 <RHFTextField name="title" label="Title" />
//                 <RHFTextField
//                   name="description"
//                   label="Description"
//                   maxLimitCharacters={200}
//                   multiline
//                   rows={3}
//                 />
//                 {!image ? (
//                   <UploadFile
//                     uploadAs="JPG"
//                     maxFileSize={2}
//                     label="Upload Image"
//                     handleFileChange={handleFileChangePerm}
//                   />
//                 ) : (
//                   <PreviewFile
//                     selectedFile={image as any}
//                     handleFileChange={handleFileChangePerm}
//                   />
//                 )}
//               </Stack>
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <Stack gap={3}>
//                 <RHFTextField name="tags" label="Tags" />
//                 <RHFDateField name="uploadDate" label="Upload Date" />
//               </Stack>
//             </Grid>
//           </Grid>
//         </Box>
//         <Divider />
//         <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end' }}>
//           <Button variant="contained" type="submit">
//             {card ? 'Save Changes' : 'Create Report'}
//           </Button>
//         </Box>
//       </FormProvider>
//     </Dialog>
//   );
// };

// export default AddNewsModal;
