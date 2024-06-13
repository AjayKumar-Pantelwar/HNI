// import { yupResolver } from '@hookform/resolvers/yup';
// import Close from '@mui/icons-material/Close';
// import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import { useForm } from 'react-hook-form';
// import { RHFTextField } from 'src/components/hook-form';
// import FormProvider from 'src/components/hook-form/form-provider';
// import { PreviewFile } from 'src/components/preview-file';
// import { UploadFile } from 'src/components/upload-file';
// import { PreferredByHniItem } from 'src/types/unverise/vas.types';
// import * as Yup from 'yup';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   card?: PreferredByHniItem;
// }

// const EditUSACard = (props: Props) => {
//   const { onClose, open, card } = props;

//   const addReportSchema = Yup.object().shape({
//     title: Yup.string()
//       .required('Title is required')
//       .max(120, 'Title must be less than 120 characters'),
//     image: Yup.mixed().nonNullable().required('Image is required'),
//     points: Yup.array()
//       .of(
//         Yup.object().shape({
//           data: Yup.string()
//             .max(80, 'Point contains maximum 80 characters')
//             .required('Point is required'),
//           number: Yup.string().required('number is required'),
//         })
//       )
//       .required('Points is required'),
//   });

//   const defaultValues = {
//     title: card?.heading || '',
//     image: '',
//     points: card?.description || [],
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

//   const image = watch('image');

//   const handleFileChangePerm = (file: File | null) => {
//     setValue('image', file as any);
//   };
//   const onSubmit = handleSubmit(async (data) => {});

//   const points = watch('points');

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
//           <Typography variant="h5">Edit Why Immigration by Investment?</Typography>
//           <IconButton onClick={onClose}>
//             <Close />
//           </IconButton>
//         </Box>
//         <Divider />
//         <Stack sx={{ p: 3, gap: 2 }}>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
//             <Box sx={{ flex: 1 }}>
//               <RHFTextField fullWidth name="title" label="Title" maxLimitCharacters={80} />
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               {!image ? (
//                 <UploadFile
//                   uploadAs="JPG"
//                   maxFileSize={2}
//                   label="Upload Image"
//                   handleFileChange={handleFileChangePerm}
//                 />
//               ) : (
//                 <PreviewFile selectedFile={image as any} handleFileChange={handleFileChangePerm} />
//               )}
//             </Box>
//           </Box>
//           <Stack gap={2}>
//             {points.map((p, i) => (
//               <RHFTextField
//                 key={i}
//                 fullWidth
//                 name={`points.[${i}].data`}
//                 label={`Point ${i + 1}`}
//                 maxLimitCharacters={80}
//               />
//             ))}
//             <Button
//               onClick={() =>
//                 setValue('points', [
//                   ...points,
//                   { data: '', number: (points.length + 1).toLocaleString() },
//                 ])
//               }
//             >
//               Add Point
//             </Button>
//           </Stack>
//         </Stack>
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

// export default EditUSACard;
