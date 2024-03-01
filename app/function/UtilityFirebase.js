import firebase from "@react-native-firebase/app";

import "@react-native-firebase/auth";
import "@react-native-firebase/database";
import "@react-native-firebase/messaging";

import { Notifications } from "react-native-notifications";

class UtilityFirebase {
  constructor(context) {
    this.context = context;
    //this.listenChildRef = this.listenChildRef.bind(context);
  }

  getToken = () => {
    //const fcmToken =  messaging().getToken();
    //return fcmToken;
    //console.log('token: ' + fcmToken);
    return firebase.messaging().getToken();
  };

  hasPermission = () => {
    return firebase.messaging().hasPermission();
  };

  requestPermission = () => {
    firebase.messaging().requestPermission();
  };

  onNotification = (callback) => {
    firebase.notifications().onNotification((notification) => {
      callback(notification);
    });
  };

  onNotificationOpened = (callback) => {
    /*firebase.notifications().onNotificationOpened(notification => {
            callback(notification);
        });*/
    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        callback(notification);
        //console.log(`Notification opened: ${notification.payload}`);
        completion();
      }
    );
  };

  onReceiveMessage = (callback) => {
    firebase.messaging().onMessage((message) => {
      callback(message);
    });
  };

  displayNotification = (notification) => {
    firebase.notifications().displayNotification(notification);
  };

  getUserId = () => {
    return firebase.auth().currentUser.uid;
  };

  getUer = () => {
    return firebase.auth().currentUser;
  };

  onAuthStateChanged = (callback) => {
    firebase.auth().onAuthStateChanged((user) => {
      callback(user);
    });
  };

  authAnonymously = (callback) => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        callback();
      });
  };

  signInWithEmailAndPassword = (email, password, callback) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        callback(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  signOut = (callback) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        callback();
      });
  };

  createUserWithEmailAndPassword = (email, password, callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        callback(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setData = (ref, value, callback) => {
    firebase
      .database()
      .ref(ref)
      .set(value)
      .then((complete) => {
        callback(complete);
      });
  };

  setDataNew = (ref, value) => {
    return firebase
      .database()
      .ref(ref)
      .set(value);
  };

  getData = (ref, callback) => {
    firebase
      .database()
      .ref(ref)
      .once()
      .then((snapshot) => {
        callback(snapshot.val());
      });
  };

  getDataNew = (ref) => {
    return firebase
      .database()
      .ref(ref)
      .once("value");
  };

  getLastMessage = (ref, orderBy) => {
    return firebase
      .database()
      .ref(ref)
      .orderByChild(orderBy)
      .limitToLast(1)
      .once("value");
  };

  deleteRef = (ref) => {
    firebase
      .database()
      .ref(ref)
      .remove()
      .then(() => null);
  };

  listenRef = (ref, callback) => {
    firebase
      .database()
      .ref(ref)
      .on("value", (dataSnapshot) => {
        callback(dataSnapshot.val());
      });
  };

  listenChildRef = (ref, callback) => {
    callback = callback.bind(this.context);

    return firebase
      .database()
      .ref(ref)
      .on("child_added", (dataSnapshot) => {
        callback(dataSnapshot);
      });
    // return firebase.database().ref(ref)
    //     .limitToLast(3)
    //     .on("child_added", dataSnapshot => {
    //         callback(dataSnapshot);
    //     });
  };

  getInitialNotification = (callback) => {
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
          callback(notification);
        }
      });
  };

  pushref = (ref, value, callback) => {
    return firebase
      .database()
      .ref(ref)
      .push(value, (error) => {
        callback(error);
      });
  };
}

const utilityFirebase = UtilityFirebase;
export default UtilityFirebase;
