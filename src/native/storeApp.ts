import { Capacitor } from '@capacitor/core';

/**
 * True inside the App Store / Google Play app. There, lopso.vn's sign-in and
 * PayOS bank transfer are not offered: the stores only allow their own
 * payment for unlocking content inside an app.
 */
export const IS_STORE_APP = Capacitor.isNativePlatform();
