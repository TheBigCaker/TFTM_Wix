import { getUserSubscriptionTier } from 'backend/subscriptionChecker';

$w.onReady(async function () {
  await initializeAdDisplay();
});

async function initializeAdDisplay() {
  try {
    const subscriptionInfo = await getUserSubscriptionTier();
    
    console.log('Subscription tier:', subscriptionInfo.tier);
    console.log('Show ads:', subscriptionInfo.showAds);
    
    if (subscriptionInfo.showAds) {
      showAdSenseAds();
    } else {
      hideAdSenseAds();
    }
    
    updateUIForSubscriptionTier(subscriptionInfo);
    
  } catch (error) {
    console.error('Error initializing ad display:', error);
    showAdSenseAds();
  }
}

function showAdSenseAds() {
  const adElements = [
    '#adsenseTop',
    '#adsenseSidebar', 
    '#adsenseBottom',
    '#adsenseHeader',
    '#adsenseFooter'
  ];
  
  adElements.forEach(elementId => {
    try {
      if ($w(elementId)) {
        $w(elementId).expand();
        $w(elementId).show();
      }
    } catch (e) {
      console.log(`Ad element ${elementId} not found on this page`);
    }
  });
}

function hideAdSenseAds() {
  const adElements = [
    '#adsenseTop',
    '#adsenseSidebar',
    '#adsenseBottom',
    '#adsenseHeader',
    '#adsenseFooter'
  ];
  
  adElements.forEach(elementId => {
    try {
      if ($w(elementId)) {
        $w(elementId).collapse();
        $w(elementId).hide();
      }
    } catch (e) {
      console.log(`Ad element ${elementId} not found on this page`);
    }
  });
}

function updateUIForSubscriptionTier(subscriptionInfo) {
  try {
    if ($w('#subscriptionBadge')) {
      if (subscriptionInfo.tier === 'pro') {
        $w('#subscriptionBadge').text = 'PRO MEMBER';
        $w('#subscriptionBadge').show();
      } else if (subscriptionInfo.tier === 'education') {
        $w('#subscriptionBadge').text = 'EDUCATION MEMBER';
        $w('#subscriptionBadge').show();
      } else {
        $w('#subscriptionBadge').hide();
      }
    }
    
    if ($w('#upgradeButton')) {
      if (subscriptionInfo.tier === 'free') {
        $w('#upgradeButton').show();
      } else {
        $w('#upgradeButton').hide();
      }
    }
    
  } catch (e) {
    console.log('Optional UI elements not found:', e.message);
  }
}
