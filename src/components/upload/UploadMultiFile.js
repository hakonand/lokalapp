import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import fileFill from '@iconify/icons-eva/file-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';

// material

import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  Button,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';

// utils

import { fData } from '../../utils/formatNumber';
import firebase from '../../firebase/firebase';

//

import { MIconButton } from '../@material-extend';
import { varFadeInRight } from '../animate';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    flexDirection: 'row'
  }
}));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.array,
  onChange: PropTypes.func,
  sx: PropTypes.object
};

export default function UploadMultiFile({
  hasFile,
  changeImageField,
  setImageList,
  imageList,
  setHasFile,
  caption,
  error = false,
  value: files,
  onChange: setFiles,
  sx,
  ...other
}) {
  const onDropTwo = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newImages = Array.from(acceptedFiles).map((file) => ({
        file,
        fileName: file.name,
        status: 'CREATED',
        storageRef: firebase.storage().ref().child(file.name),
        downloadURL: '',
        description: ''
      }));

      setImageList((prevState) => [...prevState, ...newImages]);
      console.log(imageList);
    }
    console.log(imageList);
  };

  const handleRemoveAll = () => {
    //   setImageList([]);

    console.log(files);
    console.log('------------------------');

    console.log(imageList);
  };

  const handleRemoveFile = (file, index) => {
    firebase
      .storage()
      .ref()
      .child(file.fileName)
      .delete()
      .then(() => {
        const newFiles = [...imageList];
        newFiles.splice(newFiles.indexOf(file), 1);
        setImageList(newFiles);
      })
      .catch((error) => {
        console.log('Error deleting file:', error);
      });
  };

  const consolelog = () => {
    console.log(files);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    maxFiles: 2,
    onDrop: onDropTwo
  });

  return (
    <Box sx={{ width: '100%', ...sx }} {...other}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          })
        }}
      >
        <input {...getInputProps()} />

        <Box
          component="img"
          alt="select file"
          src="/static/illustrations/illustration_upload.svg"
          sx={{ height: 160 }}
        />

        <Box
          sx={{
            p: 3,
            ml: { md: 2 }
          }}
        >
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          {caption ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {caption}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Drop files here or click&nbsp;
              <Link underline="always">browse</Link>&nbsp;through your device
            </Typography>
          )}
        </Box>
      </DropZoneStyle>

      <List disablePadding sx={{ ...(hasFile && { my: 5 }) }}>
        <AnimatePresence>
          {imageList.map((file) => (
            <ListItem
              key={file.fileName}
              component={motion.div}
              {...varFadeInRight}
              sx={{
                my: 1,
                py: 0.5,
                px: 2,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
                bgcolor: 'background.paper'
              }}
            >
              <ListItemIcon>
                <Icon icon={fileFill} width={32} height={32} />
              </ListItemIcon>
              <ListItemText
                primary={file.fileName}
                secondary={fData(file.size)}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
              <ListItemSecondaryAction>
                <MIconButton
                  edge="end"
                  size="small"
                  onClick={() => handleRemoveFile(file)}
                >
                  <Icon icon={closeFill} />
                </MIconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </AnimatePresence>
      </List>

      {imageList.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            '& > *': { ml: 1.5 }
          }}
        >
          <Button onClick={handleRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
          <Button variant="contained" onClick={consolelog}>
            Upload files
          </Button>
        </Box>
      ) : (
        <div />
      )}
    </Box>
  );
}
