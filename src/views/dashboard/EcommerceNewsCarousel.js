import Slider from 'react-slick';
import { merge } from 'lodash';

import ReactApexChart from 'react-apexcharts';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  CardContent,
  Typography,
  Divider,
  LinearProgress
} from '@material-ui/core';
// utils
import { mockImgProduct } from '../../utils/mockImages';
//
import { CarouselControlsPaging1 } from '../../components/carousel';
import { BaseOptionChart } from '../../components/charts';
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: 200,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: 200 },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    //    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: 72,
    alignContent: 'center',
    position: 'relative !important',
    top: `calc(${200 - 72}px) !important`
  }
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

// NextFeature.propTypes = {
//   item: PropTypes.object
// };

const NextFeature = ({ item }) => {
  const {
    header,
    title,
    progressbar,
    description,
    chart,
    chartType,
    chartData,
    chartOptions,
    bottomText,
    description2,
    description3,
    bottomButton,
    bottomButtonText,
    buttonAction
  } = item;
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          News & Notices
        </Typography>

        <Typography
          gutterBottom
          variant="h4"
          sx={{ color: 'grey.800', marginTop: theme.spacing(1) }}
        >
          {header}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>

        {progressbar ? <LinearProgress /> : <div />}
        {chart ? (
          <ChartWrapperStyle dir="ltr">
            <ReactApexChart
              type={chartType}
              series={chartData}
              options={chartOptions}
              height={200}
            />
          </ChartWrapperStyle>
        ) : (
          <div />
        )}
        <br />

        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description2}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description3}
        </Typography>

        {bottomButton ? (
          <Button
            variant="contained"
            sx={{ margin: theme.spacing(1) }}
            onClick={buttonAction}
          >
            {bottomButtonText}
          </Button>
        ) : (
          <div />
        )}

        <Divider />
        <Typography variant="caption">{bottomText}</Typography>
      </Box>
    </Card>
  );
};

export default function EcommerceNewsCarousel() {
  const theme = useTheme();

  const buttonClick = () => {
    console.log('asshole');
  };

  const settings = {
    speed: 1000,
    autoplaySpeed: 6000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({ color: 'primary.main' })
  };

  const chartOptions1 = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.lighter],
    labels: ['Progress'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' }
  });

  const NEWS = [
    {
      chart: true,
      chartType: 'radialBar',
      chartData: [25],
      chartOptions: chartOptions1,
      description:
        'We are working on a Social Media Assistant that will help you set a strategy and post content regularly to increase following and increase conversion',
      bottomText: 'The next feature in progress'
    },
    {
      header: ' Need help? Have some feedback?',
      chart: false,

      description:
        'We would love to be a sparring partner for your ecommerce actions. ',

      description2:
        'If you have some feedback for our product please dont hesitate to let us know. We would greatly appreciate it',
      description3: 'You can reach us by clicking here',

      bottomText: 'A small reminder',
      bottomButton: true,
      bottomButtonText: 'Contact Us',
      buttonAction: buttonClick
    }
  ];

  return (
    <Card>
      <Slider {...settings}>
        {NEWS.map((item) => (
          <NextFeature key={item.title} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
