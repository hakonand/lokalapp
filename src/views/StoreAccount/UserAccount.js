import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import { useDispatch, useSelector } from 'react-redux';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import starOutline from '@iconify/icons-eva/star-outline';

// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';
// redux
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications
} from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';

import AccountGeneral from './AccountGeneral';
import AccountBilling from './AccountBilling';
import AccountBonusProgram from './AccountBonusProgram';

import AccountSocialLinks from './AccountSocialLinks';

import AccountNotifications from './AccountNotifications';
import AccountChangePassword from './AccountChangePassword';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('general');

  const [displayName, setDisplayName] = useState('DisplayName');
  const [displayEmail, setDisplayEmail] = useState('DisplayEmail');
  const [displayCountry, setDisplayCountry] = useState('DisplayCountry');
  const [displayRegion, setDisplayRegion] = useState('DisplayRegion');
  const [displayCity, setDisplayCity] = useState('DisplayCity');
  const [displayAddress, setDisplayAddress] = useState('DisplayAddress');
  const [displayPhone, setDisplayPhone] = useState('DisplayPhone');
  const [displayAbout, setDisplayAbout] = useState('DisplayAbout');
  const [displayZip, setDisplayZip] = useState('DisplayZip');
  const [makeChange, setMakeChange] = useState(false);

  const [facebookLink, setFacebookLink] = useState('FacebookLink');
  const [instagramLink, setInstagramLink] = useState('InstagramLink');
  const [messengerLink, setMessengerLink] = useState('MessengerLink');

  const dispatch = useDispatch();
  const {
    cards,
    invoices,
    myProfile,
    addressBook,
    notifications
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <AccountGeneral
          displayName={displayName}
          displayEmail={displayEmail}
          displayCountry={displayCountry}
          displayRegion={displayRegion}
          displayCity={displayCity}
          displayAddress={displayAddress}
          displayPhone={displayPhone}
          displayAbout={displayAbout}
          displayZip={displayZip}
          setDisplayName={setDisplayName}
          setDisplayEmail={setDisplayEmail}
          setDisplayCountry={setDisplayCountry}
          setDisplayRegion={setDisplayRegion}
          setDisplayCity={setDisplayCity}
          setDisplayAddress={setDisplayAddress}
          setDisplayPhone={setDisplayPhone}
          setDisplayAbout={setDisplayAbout}
          setDisplayZip={setDisplayZip}
          makeChange={makeChange}
          setMakeChange={setMakeChange}
        />
      )
    },

    {
      value: 'social_links',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: (
        <AccountSocialLinks
          myProfile={myProfile}
          makeChange={makeChange}
          setMakeChange={setMakeChange}
          facebookLink={facebookLink}
          instagramLink={instagramLink}
          messengerLink={messengerLink}
          setFacebookLink={setFacebookLink}
          setInstagramLink={setInstagramLink}
          setMessengerLink={setMessengerLink}
        />
      )
    },

    {
      value: 'bonus_program',
      icon: <Icon icon={starOutline} width={20} height={20} />,
      component: (
        <AccountBonusProgram
          myProfile={myProfile}
          makeChange={makeChange}
          setMakeChange={setMakeChange}
          facebookLink={facebookLink}
          instagramLink={instagramLink}
          messengerLink={messengerLink}
          setFacebookLink={setFacebookLink}
          setInstagramLink={setInstagramLink}
          setMessengerLink={setMessengerLink}
        />
      )
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="General Settings">
      <Container>
        <HeaderDashboard
          heading="General Settings"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.maindashboard },
            { name: 'Account Settings' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              setDisableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
