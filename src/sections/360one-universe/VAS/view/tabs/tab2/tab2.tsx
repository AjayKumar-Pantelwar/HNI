// import {
//   Box,
//   Card,
//   CardMedia,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   Stack,
//   Typography,
// } from '@mui/material';

// import DeleteIcon from 'src/assets/icons/delete-icon';
// import EditIcon from 'src/assets/icons/edit-icon';
// import { useBoolean } from 'src/hooks/use-boolean';

// import { PreferredByHniItem, VASData } from 'src/types/unverise/vas.types';
// import EditTitle from '../../edit-title';
// import EditUSACard from './edit-usa-card';
// import EditWhyImmegrationModal from './edit-why-immigration-modal';

// // import { Tab1TableRow } from './table-row';

// const TABLE_HEAD = [
//   { id: 'image', label: 'Image' },
//   { id: 'title', label: 'Title' },
//   { id: 'video_name', label: 'Video Name' },
//   { id: 'edit', label: 'Actions', width: 80 },
// ];

// interface Props {
//   data: VASData;
// }

// const VASTab2 = (props: Props) => {
//   const { data } = props;

//   const immigrationEdit = useBoolean();
//   const editTitle = useBoolean();

//   return (
//     <Stack sx={{ m: 3, gap: 3, minHeight: '100%' }}>
//       <Stack sx={{ gap: 2 }}>
//         <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//           <Typography variant="h5">{data?.product_label}</Typography>
//           <IconButton onClick={() => editTitle.onTrue()}>
//             <EditIcon />
//           </IconButton>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
//             <img src="/logo/360logo.svg" alt="360One" width={40} height={40} />
//           </Box>
//           <Box
//             sx={{
//               border: '1px solid',
//               borderColor: 'divider',
//               borderRadius: 1,
//               display: 'flex',
//               alignItems: 'end',
//               gap: 1,
//               flex: 1,
//             }}
//           >
//             <List component={Stack} sx={{ flex: 1 }}>
//               {data?.why_immigration?.items?.map((c, i) => (
//                 <ListItem key={i}>
//                   <ListItemIcon sx={{ fontSize: 20 }}>*</ListItemIcon>
//                   <Typography>{c}</Typography>
//                 </ListItem>
//               ))}
//             </List>
//             <IconButton onClick={() => immigrationEdit.onTrue()}>
//               <EditIcon />
//             </IconButton>
//           </Box>
//         </Box>
//       </Stack>
//       <Grid container spacing={3}>
//         {data?.preferred_by_hni?.items?.map((c, i) => (
//           <HNICard key={i} item={c} />
//         ))}
//       </Grid>
//       <EditWhyImmegrationModal
//         open={immigrationEdit.value}
//         onClose={immigrationEdit.onFalse}
//         card={data?.why_immigration?.items}
//       />
//       <EditTitle
//         open={editTitle.value}
//         onClose={editTitle.onFalse}
//         title={data?.product_label || ''}
//       />
//     </Stack>
//   );
// };

// export default VASTab2;

// interface CardProps {
//   item: PreferredByHniItem;
// }

// export const HNICard = (props: CardProps) => {
//   const { item } = props;
//   const editCard = useBoolean();
//   return (
//     <Grid item xs={12} md={6}>
//       <Card
//         sx={{
//           boxShadow: 'none',
//           display: 'flex',
//           minHeight: '300px',
//           border: '1px solid',
//           borderColor: 'divider',
//           borderRadius: 1,
//           flexBasis: '30%',
//         }}
//       >
//         <CardMedia sx={{ minHeight: 300, minWidth: 70 }} image={item.image} title={item.heading} />
//         <Box sx={{ display: 'flex', alignItems: 'start' }}>
//           <Stack sx={{ gap: 3, flex: 1, p: 2 }}>
//             <Typography variant="h6">{item.heading}</Typography>
//             <List component={Stack} sx={{ flex: 1 }}>
//               {item?.description?.map((c, i) => (
//                 <ListItem key={i}>
//                   <ListItemIcon
//                     sx={{ height: 10, width: 10, borderRadius: '50%', bgcolor: 'divider' }}
//                   />
//                   <Typography>{c.data}</Typography>
//                 </ListItem>
//               ))}
//             </List>
//           </Stack>
//         </Box>
//         <Stack sx={{ justifyContent: 'space-between' }}>
//           <IconButton onClick={() => editCard.onTrue()}>
//             <EditIcon />
//           </IconButton>
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Stack>
//       </Card>
//       <EditUSACard open={editCard.value} onClose={editCard.onFalse} card={item} />
//     </Grid>
//   );
// };
