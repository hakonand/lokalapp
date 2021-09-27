import React, { useState } from 'react';

import CodeIcon from '@material-ui/icons/Code';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PaletteIcon from '@material-ui/icons/Palette';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import {
  Button,
  Grid,
  Divider,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader
} from '@material-ui/core';

const GetVariants = ({
  deleteSizeFromArray,
  productColors,
  colorInput,
  setColorInput,
  addNewColorToArray,
  deleteColorFromArray,
  sizeInput,
  setSizeInput,
  addNewSizeToArray,
  productSizes
}) => {
  const [isLoading, setIsLoading] = useState('');
  return (
    <Card>
      <CardHeader
        title="Colors & Sizes"
        subheader="Add colors & sizes for the product"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              value={colorInput}
              margin="normal"
              id="addColor"
              label="Write Color Name"
              name="productPrice"
              onChange={(e) => setColorInput(e.target.value)}
            />
            <br />
            <Button
              variant="outlined"
              color="primary"
              disabled={!colorInput}
              onClick={addNewColorToArray}
            >
              Add Color
            </Button>
          </Grid>

          {productColors.length > 0 ? (
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}
              >
                <List>
                  <ListSubheader
                    component="div"
                    id="added-colors"
                    color="primary"
                  >
                    Your added colors
                  </ListSubheader>
                  {productColors.map((productColor) => (
                    <ListItem margin="normal" key={productColor}>
                      <ListItemAvatar style={{ marginTop: 10 }}>
                        <ArrowRightOutlinedIcon size="small" />
                      </ListItemAvatar>
                      <ListItemText primary={productColor} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={deleteColorFromArray}
                        >
                          <HighlightOffIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          ) : (
            <div />
          )}
          <br />
        </Grid>
        <br />

        <Divider variant="middle" />
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            value={sizeInput}
            margin="normal"
            id="addSize"
            label="Write Size Name"
            name="productSize"
            onChange={(e) => setSizeInput(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            color="primary"
            disabled={!sizeInput}
            onClick={addNewSizeToArray}
          >
            Add Size
          </Button>
        </Grid>

        {productSizes.length > 0 ? (
          <Grid item xs={12} md={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start'
              }}
            >
              <List>
                <ListSubheader
                  component="div"
                  id="added-colors"
                  color="primary"
                >
                  Your added sizes
                </ListSubheader>
                {productSizes.map((productSize) => (
                  <ListItem margin="normal" key={productSize}>
                    <ListItemAvatar style={{ marginTop: 10 }}>
                      <ArrowRightOutlinedIcon size="small" />
                    </ListItemAvatar>
                    <ListItemText primary={productSize} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={deleteSizeFromArray}
                      >
                        <HighlightOffIcon color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        ) : (
          <div />
        )}
      </CardContent>
    </Card>
  );
};

export default GetVariants;
