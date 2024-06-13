// import { yupResolver } from '@hookform/resolvers/yup';
// import Close from '@mui/icons-material/Close';
// import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import { useForm } from 'react-hook-form';
// import { RHFTextField } from 'src/components/hook-form';
// import FormProvider from 'src/components/hook-form/form-provider';
// import { CriteriaDatum } from 'src/types/unverise/vas.types';
// import * as Yup from 'yup';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   card?: CriteriaDatum;
// }

// const EditCriteriaDetails = (props: Props) => {
//   const { onClose, open, card } = props;

//   const addReportSchema = Yup.object().shape({
//     description: Yup.string()
//       .required('Description is required')
//       .max(63, 'Description must be less than 63 characters'),
//     criteria: Yup.array()
//       .of(
//         Yup.object().shape({
//           heading: Yup.string()
//             .max(34, 'Heading contains maximum 34 characters')
//             .required('Heading is required'),
//           data: Yup.string()
//             .max(10, 'Data contains maximum 10 characters')
//             .required('Data is required'),
//         })
//       )
//       .required('criteria is required'),
//   });

//   const defaultValues = {
//     description: card?.description || '',
//     criteria: card?.card_data || [],
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

//   const criteria = watch('criteria');

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
//           <Typography variant="h5">Edit Criteria Details?</Typography>
//           <IconButton onClick={onClose}>
//             <Close />
//           </IconButton>
//         </Box>
//         <Divider />
//         <Stack sx={{ p: 3, gap: 2 }}>
//           <Stack gap={2}>
//             {criteria.map((p, i) => (
//               <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                 <Box sx={{ flex: 1 }}>
//                   <RHFTextField
//                     key={i}
//                     fullWidth
//                     name={`criteria.[${i}].heading`}
//                     label="Heading"
//                     maxLimitCharacters={34}
//                   />
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                   <RHFTextField
//                     key={i}
//                     fullWidth
//                     name={`criteria.[${i}].data`}
//                     label="Data"
//                     maxLimitCharacters={10}
//                   />
//                 </Box>
//               </Box>
//             ))}
//             <RHFTextField
//               name="description"
//               label="Description"
//               multiline
//               rows={3}
//               maxLimitCharacters={63}
//             />
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

// export default EditCriteriaDetails;
