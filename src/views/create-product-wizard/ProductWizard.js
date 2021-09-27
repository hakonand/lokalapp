import React, { useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Box,
  Divider,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';

import { PATH_DASHBOARD, PATH_DOCS } from '../../routes/paths';

import UploadMultiFile from '../../components/upload/UploadMultiFile';
import HeaderDashboard from '../../components/HeaderDashboard';

import firebase from '../../firebase/firebase';

import ProductInformation from './ProductInformation';
import GetCollections from './GetCollections';
import ProductShipping from './ProductShipping';
import GetVariants from './GetVariants';

const ProductWizard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // state for Productinformation.js

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const [productMainPicture, setProductMainPicture] = useState('');

  // state and fucntions for Uploading Images

  const [hasFile, setHasFile] = useState(0);
  const [files, setFiles] = useState([]);

  // from https://www.develrockment.at/blog/react-multiple-image-upload-component-for-firebase-storage/
  // or https://github.com/Develrockment/React-Multiple-Image-Upload-Firebase/blob/main/src/imagesDropzone.js

  const [imageList, setImageList] = useState([]);
  const [urlArray, setUrlArray] = useState([]);

  const changeImageField = (index, parameter, value) => {
    const newArray = [...imageList];
    newArray[index][parameter] = value;
    setImageList(newArray);
  };

  const handleDeleteImage = (index) => {
    files[index].storageRef
      .delete()
      .then(() => {
        const newArray = [...files];
        newArray.splice(index, 1);
        setFiles(newArray);
      })
      .catch((error) => {
        console.log('Error deleting file:', error);
      });
  };

  // state for Colors sizes and collections

  const [selectedTypeValue, setSelectedTypeValue] = React.useState('');
  const [selectedSubValue, setSelectedSubValue] = React.useState('');
  const [selectedMcValue, setSelectedMcValue] = React.useState('');

  const [colorInput, setColorInput] = useState();
  const [productColors, setProductColors] = useState([]);

  const [sizeInput, setSizeInput] = useState();
  const [productSizes, setProductSizes] = useState([]);

  const addNewColorToArray = () => {
    const newArray = [...productColors, colorInput];
    setProductColors(newArray);
    setColorInput('');
  };

  const deleteColorFromArray = (index) => {
    const newArray = [...productColors];
    newArray.splice(index, 1);
    setProductColors(newArray);
  };

  const addNewSizeToArray = () => {
    const newArray = [...productSizes, sizeInput];
    setProductSizes(newArray);
    setSizeInput('');
  };

  const deleteSizeFromArray = (index) => {
    const newArray = [...productSizes];
    newArray.splice(index, 1);
    setProductSizes(newArray);
  };

  // state for Shipping- Clickcollect - home Delivery'

  const [homeDeliveryDistance, setHomeDeliveryDistance] = useState();
  const [homeDeliveryPrice, setHomeDeliveryPrice] = useState();
  const [shippingPrice, setShippingPrice] = useState();

  const [freeShipping, setFreeShipping] = useState();
  const [freeHomeDelivery, setFreeHomeDelivery] = useState();

  const [shippingChecked, setShippingChecked] = useState(false);
  const [homeDeliveryChecked, setHomeDeliveryChecked] = useState(false);
  const [clickCollectChecked, setClickCollectChecked] = useState(true);

  // rest

  const consolelog = () => {
    console.log(imageList);
  };

  const handleComplete = () => {
    firebase
      .firestore()
      .collection('norway')
      .doc('bodø')
      .collection(selectedMcValue)
      .doc(selectedSubValue)
      .collection(selectedTypeValue)
      .doc()
      .set({
        productName,
        productPrice,
        productDescription,
        urlArray,
        productColors,
        productSizes,
        owner: 'merchantName',
        dateCreated: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    firebase
      .firestore()
      .collection('merchants')
      .doc('merchantID')
      .collection('products')
      .doc()
      .set({
        productName,
        productPrice,
        productDescription,
        urlArray,
        productColors,
        productSizes,
        owner: 'merchantName',
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        mainCathegory: selectedMcValue,
        subCathegory: selectedSubValue,
        typeCathegory: selectedTypeValue
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  /* eslint prefer-arrow-callback: 0 */

  useEffect(() => {
    imageList.forEach((file, index) => {
      if (file.status === 'CREATED') {
        changeImageField(index, 'status', 'UPLOADING');
        const uploadTask = file.storageRef.put(file.file);
        uploadTask.on(
          'state_changed',
          null,
          function error(err) {
            console.log('Error Image Upload:', err);
          },
          async function complete() {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            changeImageField(index, 'downloadURL', downloadURL);
            changeImageField(index, 'status', 'FINISH');
            const newArray = [...urlArray, downloadURL];
            setUrlArray(newArray);
            console.log(urlArray);
          }
        );
      }
    });
  });

  const DocStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.primary.main, 0.08)
        : theme.palette.primary.lighter
  }));

  return (
    <Container component="main">
      <HeaderDashboard
        heading="Create product"
        subheader="Fill in the required fields to create product"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.general.maindashboard },
          { name: 'Create Product' }
        ]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProductInformation
            productName={productName}
            setProductName={setProductName}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            productMainPicture={productMainPicture}
            setProductMainPicture={setProductMainPicture}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <GetCollections
            selectedMcValue={selectedMcValue}
            setSelectedMcValue={setSelectedMcValue}
            selectedSubValue={selectedSubValue}
            setSelectedSubValue={setSelectedSubValue}
            selectedTypeValue={selectedTypeValue}
            setSelectedTypeValue={setSelectedTypeValue}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Upload Images"
              subheader="Select and upload images from your device"
              titleTypographyProps={{ color: 'textPrimary' }}
            />
            <CardContent>
              <UploadMultiFile
                hasFile={hasFile}
                setHasFile={setHasFile}
                value={files}
                setImageList={setImageList}
                imageList={imageList}
                onChange={setFiles}
              />
            </CardContent>
          </Card>
        </Grid>
        <br />

        <Grid item xs={12} md={6}>
          <GetVariants
            productColors={productColors}
            colorInput={colorInput}
            setColorInput={setColorInput}
            addNewColorToArray={addNewColorToArray}
            deleteColorFromArray={deleteColorFromArray}
            sizeInput={sizeInput}
            setSizeInput={setSizeInput}
            addNewSizeToArray={addNewSizeToArray}
            productSizes={productSizes}
            deleteSizeFromArray={deleteSizeFromArray}
          />
        </Grid>
      </Grid>
      <br />

      <div>
        <ProductShipping
          homeDeliveryDistance={homeDeliveryDistance}
          setHomeDeliveryDistance={setHomeDeliveryDistance}
          homeDeliveryPrice={homeDeliveryPrice}
          setHomeDeliveryPrice={setHomeDeliveryPrice}
          shippingPrice={shippingPrice}
          setShippingPrice={setShippingPrice}
          shippingChecked={shippingChecked}
          setShippingChecked={setShippingChecked}
          homeDeliveryChecked={homeDeliveryChecked}
          setHomeDeliveryChecked={setHomeDeliveryChecked}
          clickCollectChecked={clickCollectChecked}
          setClickCollectChecked={setClickCollectChecked}
          setFreeShipping={setFreeShipping}
          freeShipping={freeShipping}
          setFreeHomeDelivery={setFreeHomeDelivery}
          freeHomeDelivery={freeHomeDelivery}
        />
      </div>

      <br />

      <Container component="main">
        <Paper
          square
          item
          elevation={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <br />

          <Button
            onClick={handleComplete}
            color="primary"
            variant="contained"
            size="large"
          >
            Complete & Save Product
          </Button>
        </Paper>
      </Container>
    </Container>
  );
};

export default ProductWizard;
