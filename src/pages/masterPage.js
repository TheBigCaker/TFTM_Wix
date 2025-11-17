import { getUserSubscriptionTier } from 'backend/subscriptionChecker';

$w.onReady(async function () {
  await manageSiteWideAds();
});

async function manageSiteWideAds() {
  try {
    const subscriptionInfo = await getUserSubscriptionTier();
    
    if (subscriptionInfo.showAds) {
      enableAdSense();
    } else {
      disableAdSense();
    }
    
  } catch (error) {
    console.error('Error managing site-wide ads:', error);
    enableAdSense();
  }
}

function enableAdSense() {
  console.log('AdSense enabled for free tier user');
}

function disableAdSense() {
  console.log('AdSense disabled for paid subscriber');
}

export function onLogin(event) {
  manageSiteWideAds();
}

export function onLogout(event) {
  enableAdSense();
}
