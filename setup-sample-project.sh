#!/bin/bash

# add ios and android platforms to the project
cordova platform add ios
cordova platform add android

# add the Little Postman Cordova SDK / plugin
cordova plugin add https://github.com/littlepostman/sdk-client-cordova.git

# move the GCMIntentService to the correct location
mv platforms/android/src/com/littlepostman/cordova/plugin/GCMIntentService.java platforms/android/src/com/littlepostman/salesapp
sed -i "" -e 's/package com.littlepostman.cordova.plugin;/package com.littlepostman.salesapp;/g' platforms/android/src/com/littlepostman/salesapp/GCMIntentService.java

# some info on next steps
echo ""
echo "Next steps"
echo "1. Follow the setup steps for setting up iOS and GCM push notification services on push.littlepostman.com"
echo "2. Add the client authentication key from push.littlepostman.com to www/js/index.js"
echo "3. Add the client authentication key from push.littlepostman.com to platforms/android/assets/littlepostman.xml"
echo "4. Add the GCM Sender ID / Project ID generated in step 1 to platforms/android/assets/littlepostman.xml"
echo "5. Update the code signing information in the iOS Xcode project to use the push-enabled Provisioning Profile"
