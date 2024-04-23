import { AsyncStorage } from "react-native";

import network from "../network/network";

import { decode as atob, encode as btoa } from "base-64";

import firebase from "./UtilityFirebase";

class Functions {
  getIndex = (data) => {
    var index = data.index != undefined ? data.index : 0;

    return index;
  };

  getData = (data) => {
    var data = data.data != undefined ? data.data : [];

    return data;
  };

  getLabelWorkat = (data, id) => {
    let str = null;

    data.map((item, index) => {
      let result = item.id.localeCompare(id);

      if (result == 0) str = item.label;
    });

    return str;
  };

  getCountNotification = () => {
    let count = 0;

    global.notification.map((item, index) => {
      if (!item.data.read) count = count + 1;
    });

    return count;
  };

  gotoScreen = (navigation, screen) => {
    navigation.navigate(screen);
  };

  backScreen = (navigation) => {
    navigation.goBack(null);
  };

  gotoScreenWithParam = (data, navigation, screen) => {
    navigation.navigate(screen, {
      data: data,
    });
  };

  gotoScreenProduct = (cat, id, navigation, screen) => {
    if (cat == "yahoo_auction") screen = "ProductDaugiaScreen";

    navigation.navigate(screen, {
      cat: cat,
      id: id,
    });
  };

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  compareObjects = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  getDataAsyncStorage = async (str) => {
    /*var data;

    await AsyncStorage.getItem(str).then((response) => {
      data = response

      return data;
    });

    return data;*/
    return await AsyncStorage.getItem(str);
  };

  setDataAsyncStorage = async (str, value) => {
    return await AsyncStorage.setItem(str, value);
  };

  saveDataUser = async (
    responseData,
    component,
    userName = null,
    passWord = null
  ) => {
    try {
      global.commonData.user = responseData;

      if (component.switch != undefined) {
        global.commonData.switch = component.switch[0];
        global.commonData.loginUser = userName;
        global.commonData.loginPassword = passWord;
      }

      await AsyncStorage.setItem("data", JSON.stringify(global.commonData));
    } catch (error) {
      console.log(error);
    }
  };

  getDataUser = async () => {
    var data;

    try {
      await AsyncStorage.getItem("data").then((response) => {
        data = response;
      });

      return data;
      //console.log(JSON.stringify(obj));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getListFavorite = async (component) => {
    var data;

    try {
      await AsyncStorage.getItem("listFavorite").then((response) => {
        data = response;
        component.setState({ ListFavorite: response });
      });

      return data;
      //console.log(JSON.stringify(obj));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getCart = async () => {
    var data;

    try {
      await AsyncStorage.getItem("cart").then((response) => {
        data = response;
      });

      return data;
      //console.log(JSON.stringify(obj));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  setCart = async () => {
    let url = global.urlRoot + global.urlCart;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = (responseData) => {
      try {
        AsyncStorage.setItem("cart", JSON.stringify(responseData.data));
      } catch (error) {
        console.log(error);
      }
    };

    //component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  addCart = async (product, cat, component) => {
    this.addProductTocart(product.code, cat, 1, component);
  };

  addBuyNowShop = async (product, cat, component) => {
    let url = global.urlRoot + global.urlDeleteAllCart;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};
    body.do = true;

    body = JSON.stringify(body);

    callback = async (responseData) => {
      functions.addProductTocartBuyNow(product.code, cat, 1, component);
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPATCH_HEADER(url, body, token, callback);
  };

  convertShopToID = (shop) => {
    switch (shop) {
      case "amazon":
        return "amz";
        break;

      case "rakuten":
        return "rkt";
        break;

      case "mercari":
        return "mcr";
        break;

      default:
        return "ys";
    }
  };

  convertIDToShop = (id) => {
    switch (id) {
      case "amz":
        return "amazon";
        break;

      case "rkt":
        return "rakuten";
        break;

      case "mcr":
        return "mercari";
        break;

      default:
        return "yahoo";
    }
  };

  convertShopToPopularItem = (shop) => {
    switch (shop) {
      case "amazon":
        return "AMZ";
        break;

      case "rakuten":
        return "RKT";
        break;

      case "mercari":
        return "MCR";
        break;

      default:
        return "YS";
    }
  };

  login = (userName, passWord, component) => {
    let borderColor = "#3f3f3f";

    let url = global.urlRootWewantu + global.urlLogin;

    const base64Credentials = btoa(`${userName}:${passWord}`);

    var token = "Basic " + base64Credentials + "";

    let body = {};
    body = null; //JSON.stringify(body);

    var callback = (responseData) => {
      if (responseData.error != undefined) {
        switch (responseData.error.status) {
          case 409:
            component.setState({ errorMessage: "The user is ready to log in" });
            component.setState({ ActivityIndicator: false });

            break;

          default:
            component.setState({ errorMessage: "Wrong UserName or Password" });
            component.setState({ ActivityIndicator: false });
        }
      } else {
        functions.saveDataUser(responseData, component, userName, passWord);

        component.setState({ ActivityIndicator: false });
        functions.gotoScreen(component.props.navigation, "HomeScreen");
      }
    };

    if (userName == "") {
      component.setState({
        colorBorderUserName: "red",
        errorMessage: global.emailEmpty,
      });
      return;
    } /*else if (!this.validateEmail(userName)) {
      component.setState({ colorBorderUserName: "red" });
      component.setState({ errorMessage: global.emailNotCorrect });
      return;
    }*/ else if (
      userName != ""
    ) {
      component.setState({
        colorBorderUserName: borderColor,
        errorMessage: "",
      });
    }

    if (passWord == "") {
      component.setState({
        colorBorderPassWord: "red",
        errorMessage: global.passWordEmpty,
      });
      return;
    } else {
      component.setState({
        colorBorderPassWord: borderColor,
        errorMessage: "",
      });
    }

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, body, token, callback);
  };

  register = (data, component) => {
    let url = global.urlRootWewantu + global.urlRegister;

    const base64Credentials = btoa(`${"a"}:${"b"}`);

    var token = "Basic " + base64Credentials + "";

    let body = {};
    body.mail = data.mail;
    body.password = data.password;
    body.prename = data.firstName;
    body.lastname = data.lastName;
    body.mobile_phone_number = data.mobile;
    body.titel = "Prof";
    body.firebase_token = data.firebase_token;

    body = JSON.stringify(body);

    var callback = (responseData) => {
      if (responseData.status == 201)
        component.setState({ display2: "flex", ActivityIndicator: false });
      else component.setState({ display1: "flex", ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER_1(url, body, token, callback);
  };

  logout = async (navigation) => {
    let url = global.urlRootWewantu + global.urlLogout;

    const userId = global.commonData.user.user_id;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let body = null;

    var callback = async (responseData) => {
      if (true) {
        global.commonData.user = null;

        await AsyncStorage.setItem("data", JSON.stringify(global.commonData));

        functions.gotoScreen(navigation, "LoginScreen");
      } else {
        global.commonData.user = null;

        await AsyncStorage.setItem("data", JSON.stringify(global.commonData));

        functions.gotoScreen(navigation, "LoginScreen");
      }
    };

    network.fetchDELETE_HEADER(url, body, token, callback, userId);
  };

  register_ = (
    name,
    passWord,
    confirmPassword,
    phone,
    email,
    ID,
    component
  ) => {
    let url = global.urlRoot + global.urlRegistration;

    let body = {};
    body.Username = ID;
    body.Password = passWord;
    body.Email = email;
    body.Name = name;
    body.Phone = phone;
    body = JSON.stringify(body);

    var callback = (responseData) => {
      component.setState({ ActivityIndicator: false });
      functions.gotoScreen(component.props.navigation, "ConfirmScreen");
    };

    if (email == "") {
      component.setState({ colorBorderEmail: "red" });
      component.setState({ errorMessage: global.emailEmpty });

      component.gotoTop();
      return;
    } else if (!this.validateEmail(email)) {
      component.setState({ colorBorderEmail: "red" });
      component.setState({ errorMessage: global.emailNotCorrect });

      component.gotoTop();
      return;
    } else {
      component.setState({ colorBorderEmail: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    if (name == "") {
      component.setState({ colorBorderName: "red" });
      component.setState({ errorMessage: global.nameEmpty });

      component.gotoTop();
      return;
    } else {
      component.setState({ colorBorderName: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    if (phone == "") {
      component.setState({ colorBorderPhone: "red" });
      component.setState({ errorMessage: global.phoneEmpty });

      component.gotoTop();
      return;
    } else {
      component.setState({ colorBorderPhone: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    if (ID == "") {
      component.setState({ colorBorderID: "red" });
      component.setState({ errorMessage: global.idEmpty });
      return;
    } else {
      component.setState({ colorBorderid: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    if (passWord == "") {
      component.setState({ colorBorderPassWord: "red" });
      component.setState({ errorMessage: global.passWordEmpty });

      component.gotoTop();
      return;
    } else {
      component.setState({ colorBorderPassWord: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    if (confirmPassword == "") {
      component.setState({ colorBorderConfirmPassWord: "red" });
      component.setState({ errorMessage: global.confirmPassword });

      component.gotoTop();
      return;
    } else if (confirmPassword != passWord) {
      component.setState({ colorBorderConfirmPassWord: "red" });
      component.setState({ errorMessage: global.wrongPassword });

      component.gotoTop();
      return;
    } else {
      component.setState({ colorBorderConfirmPassWord: "#E6E8EC" });
      component.setState({ errorMessage: "" });
    }

    component.setState({ ActivityIndicator: true });
    component.gotoTop();

    network.fetchPOST(url, body, callback);
  };

  getDateByint = () => {
    // Get the current date
    const currentDate = new Date();

    // Get the timestamp in milliseconds
    const timestamp = currentDate.getTime();

    // Convert the timestamp to seconds
    const currentSeconds = Math.floor(timestamp / 1000);

    return currentSeconds;
  };

  upload = async (component, uri, type, file1, file2, file3, comeback = 0) => {
    let url = global.urlRootWewantu + global.urlUpload;

    var datauser = await this.getDataUser();
    let token = null;

    let nameFile = "";
    let nameFile_1 = "";
    let typeFile = null;
    let user_id = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    let dateCurent = this.getDateByint().toString();

    switch (type) {
      case "doc":
        nameFile = dateCurent + "_" + "doc.doc";
        nameFile_1 = nameFile;

        nameFile = file1 + ";" + nameFile + ";" + file3 + ";" + user_id;

        typeFile = "image/jpeg";
        break;

      case "video":
        nameFile = dateCurent + "_" + "video.mp4";
        nameFile_1 = nameFile;

        nameFile = file1 + ";" + file2 + ";" + nameFile + ";" + user_id;

        typeFile = "video/mp4";
        break;

      default:
        nameFile = dateCurent + "_" + "img.jpg";
        nameFile_1 = nameFile;

        nameFile = nameFile + ";" + file2 + ";" + file3 + ";" + user_id;

        typeFile = "image/jpeg";
    }

    const data = new FormData();

    data.append("media", {
      name: nameFile,
      type: typeFile,
      uri: uri,
    });

    var callback = async (responseData) => {
      nameFile_1 = nameFile_1.replace("doc.doc", "img.jpg");

      let media = component.state.media;

      if (comeback == 1) {
        global.uploadDocument.state.media.file_video = nameFile_1;
        global.uploadDocument.state.diplayTypeCamera = false;

        this.gotoScreenWithParam(
          null,
          global.uploadDocument.props.navigation,
          "UploadDocument"
        );
      } else if (type == "img") {
        media.file_img = nameFile_1;

        try {
          global.home.state.media.file_img = nameFile_1;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          callback: 0,
        });
      } else if (type == "doc") {
        media.file_doc = nameFile_1;

        try {
          global.home.state.media.file_doc = nameFile_1;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          callback: 1,
        });
      } else {
        media.file_video = nameFile_1;

        try {
          global.home.state.media.file_video = nameFile_1;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          callback: 2,
        });
      }

      return;
    };

    if (comeback != 1) {
      let statusUpload = component.state.statusUpload;
      statusUpload.status = null;

      component.setState({
        ActivityIndicator: true,
        statusUpload: statusUpload,
      });
    }
    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  deleteMedia = async (component, type) => {
    let url = global.urlRootWewantu + global.urlMediaUpdate;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    let nameFile = type + ";" + user_id;

    const data = new FormData();

    data.append("file", nameFile);

    var callback = async (responseData) => {
      let media = component.state.media;

      if (type == 0) {
        media.file_img = null;

        try {
          global.home.state.media.file_img = null;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          //callback: 0,
        });
      } else if (type == 1) {
        media.file_doc = null;

        try {
          global.home.state.media.file_doc = null;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          //callback: 1,
        });
      } else {
        media.file_video = null;

        try {
          global.home.state.media.file_video = null;
        } catch (error) {
          console.log(error);
        }

        component.setState({
          ActivityIndicator: false,
          statusUpload: responseData,
          media: media,
          //callback: 2,
        });
      }

      return;
    };

    let statusUpload = component.state.statusUpload;
    statusUpload.status = null;

    component.setState({ ActivityIndicator: true, statusUpload: statusUpload });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  updateUserDriveLicense = async (component, driveLicenses) => {
    let url = global.urlRootWewantu + global.urlUpdateUserDriveLicense;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("user_id", user_id);
    data.append("drive_licenses", driveLicenses);

    var callback = async (responseData) => {
      component.setState({
        ActivityIndicator: false,
      });

      return;
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  insertUserLanguage = async (component, language_id, level, dataReturn) => {
    let url = global.urlRootWewantu + global.urlInsertUserLanguage;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("user_id", user_id);
    data.append("language_id", language_id);
    data.append("level", level);

    var callback = async (responseData) => {
      dataReturn = dataReturn + ";" + language_id;

      component.setState({
        ActivityIndicator: false,
      });

      this.gotoScreenWithParam(
        dataReturn,
        component.props.navigation,
        "PersonalData_4"
      );
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  insertAndUpdateUserProfile = async (
    component,
    dataJob,
    userJobprofile,
    jobprofile_id,
    position
  ) => {
    let url = global.urlRootWewantu + global.urlInsertJobProfile;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("user_id", user_id);
    data.append("job_id", dataJob.job);
    data.append("desired_salary", dataJob.gross_year);
    data.append("desired_weekly_hours", dataJob.week_hour);
    data.append("desired_working_days_per_week", dataJob.day_per_week);
    data.append("desired_holiday_days_per_year", dataJob.day_per_year);
    data.append("desired_work_at_home_id", dataJob.work_home);
    data.append("desired_work_at_weekend_id", dataJob.work_weekend);
    data.append("desired_work_at_night_id", dataJob.work_night);
    data.append("postalcode", dataJob.distance1);
    data.append("nationwide", 24);
    data.append("max_distance", dataJob.distance);
    data.append("ambitions_id", dataJob.intres);
    data.append("jobprofile_id", jobprofile_id);

    var callback = async (responseData) => {
      // if insert
      if (jobprofile_id == -1) {
        userJobprofile[0].job_search_profile_id = responseData.joprofile_id;

        global.userJobprofile = userJobprofile;
        global.jobprofile.state.userJobprofile = userJobprofile;
      } else {
        // update
        userJobprofile[position] = dataJob;
        userJobprofile[position].job_search_profile_id = jobprofile_id;
      }

      component.setState({
        userJobprofile: userJobprofile,
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER(url, data, token, callback);
  };

  deleteUserLanguage = async (component, language_id) => {
    let url = global.urlRootWewantu + global.urlUserDeleteLanguages;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("user_id", user_id);
    data.append("language_id", language_id);

    var callback = async (responseData) => {
      component.setState({
        ActivityIndicator: false,
        visible1: false,
      });
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  deleteUserJobProfile = async (component, jobProfile_id) => {
    let url = global.urlRootWewantu + global.urlUserDeleteJobprofile;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("jobprofile_id", jobProfile_id);

    var callback = async (responseData) => {
      component.setState({
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  activeAuction = async (component) => {
    let url = global.urlRoot + global.urlAuction;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};
    body.active = true;
    body = JSON.stringify(body);

    callback = (responseData) => {
      component.setState({ activeAuction: true, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, body, token, callback);
  };

  changePass = (oldPass, newPass, token, component) => {
    let url = global.urlRoot + global.urlChangePassword;

    let body = {};
    body.oPassword = oldPass;
    body.Password = newPass;
    body = JSON.stringify(body);

    callback = async (responseData) => {
      if (responseData.data == null) {
        component.setState({ messageError: global.updateUserNotOk });
        //component.setState({ messageSuccess: global.updateUserOk });
        component.setState({ ActivityIndicator: false });
      } else {
        component.setState({ messageSuccess: global.updateUserOk });
        component.setState({ ActivityIndicator: false });
      }
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPATCH_HEADER(url, body, token, callback);
  };

  getListAddress = async (component) => {
    let url = global.urlRoot + global.urlAddAdress;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      component.setState({ listAddress: responseData });
      component.setState({ ActivityIndicator: false });
    };

    //component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getText = async (component) => {
    let url = global.urlRootWewantu + global.language;

    const username = global.userWeantu;
    const password = global.passwordWeantu;

    const base64Credentials = btoa(`${username}:${password}`);

    var token = "Basic " + base64Credentials + "";

    var body = null;

    var datauser = await this.getDataUser();

    var callback = async (responseData) => {
      global.commonData = {};

      global.commonData.languages = JSON.parse(responseData);

      await functions.setDataAsyncStorage(
        "data",
        JSON.stringify(global.commonData)
      );

      component.setState({ text: responseData });
    };

    if (datauser == null) network.fetchPOST_HEADER(url, body, token, callback);
    else {
      try {
        global.commonData = JSON.parse(datauser);
        component.setState({ text: global.commonData.languages });
      } catch (error) {
        global.commonData = {};
        console.log(error);
      }
    }
  };

  getListJob = async (component, refersh) => {
    var listJobAPI,
      listJoBlike,
      routers = [];
    var datauser = await this.getDataUser();

    try {
      datauser = JSON.parse(datauser);

      listJobAPI = datauser.listJbobAPI;
      listJoBlike =
        datauser.listJoBlike != undefined ? datauser.listJoBlike : [];
    } catch (error) {
      listJobAPI = undefined;
      listJoBlike = [];
    }

    let url = global.urlJobAuthencation;

    const client_id = global.jobClient_id;
    const client_secret = global.jobClient_secret;

    var body = new URLSearchParams();

    body.append("grant_type", "client_credentials");
    body.append("client_id", client_id);
    body.append("client_secret", client_secret);

    /*body.grant_type = 'client_credentials';
    body.client_id = client_id;
    body.client_secret = client_secret;*/

    body = body.toString();

    var callback = async (responseData) => {
      var callback1 = async (responseData) => {
        responseData.stellenangebote.map((item, index) => {
          let router = { key: index + 1, title: "JOB" };

          routers.push(router);
        });

        global.commonData.listJbobAPI = responseData.stellenangebote;

        await functions.setDataAsyncStorage(
          "data",
          JSON.stringify(global.commonData)
        );

        component.setState({
          jobsList: responseData.stellenangebote,
          listJoBlike: listJoBlike,
          routes: routers,
          ActivityIndicator: false,
        });
      };

      global.commonData.tokenJob = responseData.access_token;

      let url = global.urlRootJob + global.job;

      let token = "Bearer " + global.commonData.tokenJob;

      network.fetchGET_HEADER(url, null, token, callback1);
    };

    // if not save litbob in local
    if (listJobAPI == undefined || refersh) {
      component.setState({ ActivityIndicator: true });
      network.fetchPOSTUrlEncoded(url, body, callback);
    } else {
      // if ready save listjob in local
      listJobAPI.map((item, index) => {
        let router = { key: index + 1, title: "JOB" };

        routers.push(router);
      });

      component.setState({
        jobsList: listJobAPI,
        listJoBlike: listJoBlike,
        routes: routers,
      });
    }
  };

  insertChat = async (
    component,
    user_id_from,
    user_id_to,
    message,
    notification = false
  ) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {
      listJobAPI = undefined;
      listJoBlike = [];
    }

    let url = global.urlRootWewantu + global.urlInsertChat;

    let body = {};
    let data;

    body.user_id_from = user_id_from;
    body.user_id_to = user_id_to;
    body.message = message;
    if (global.commonData.user.user_id == user_id_from)
      body.id_room = user_id_to + "_" + user_id_from;
    else body.id_room = user_id_from + "_" + user_id_to;

    data = JSON.stringify(body);

    var callback = async (responseData) => {
      if (notification) {
        await AsyncStorage.setItem("notification", user_id_from);
      }
    };

    network.fetchPOST_HEADER(url, data, token, callback);
  };

  insertAdress = async (dataAddress) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {
      listJobAPI = undefined;
      listJoBlike = [];
    }

    let url = global.urlRootWewantu + urlInsertaddress;

    let body = {};
    let data;

    body.city = dataAddress.city;
    body.postal_code = dataAddress.postal_code;
    body.street = dataAddress.street;
    body.house_number = dataAddress.house_number;
    body.address_addition = dataAddress.address_addition;
    body.year_birthday = dataAddress.year_birthday;
    body.state = null;
    body.country = dataAddress.country;

    data = JSON.stringify(body);

    var callback = async (responseData) => {
      datauser.user.another.street = dataAddress.street;
      datauser.user.another.house_number = dataAddress.house_number;
      datauser.user.another.address_addition = dataAddress.address_addition;
      datauser.user.another.postal_code = dataAddress.postal_code;
      datauser.user.another.city = dataAddress.city;
      datauser.user.another.year_birthday = dataAddress.year_birthday;

      global.commonData.user.another = datauser.user.another;

      await AsyncStorage.setItem("data", JSON.stringify(datauser));

      // add address_id to user
      data = {};

      data.user_id = user_id;
      data.address_id = responseData.address_id;

      this.updateUser(this, data, 3);
    };

    network.fetchPOST_HEADER(url, data, token, callback);
  };

  insertUserEducation = async (component, dataEducation) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlInsertEducational;

    let body = {};
    let data;

    body.user_id = user_id;
    body.company = dataEducation.name;
    body.educational_stage_type_id = dataEducation.educationstage_id;
    body.institute = dataEducation.job;
    body.job_id = dataEducation.job_id;

    data = JSON.stringify(body);

    var callback = async (responseData) => {
      // id return of education
      dataEducation.id = responseData.educational_stage_id;

      try {
        // update state
        global.reviewTraining.state.trainning.push(dataEducation);

        const strAsyncStorage = global.trainning;

        // update local
        await this.setDataAsyncStorage(
          strAsyncStorage,
          JSON.stringify(global.reviewTraining.state.trainning)
        );
      } catch (error) {
        console.log(error);
      }

      this.gotoScreenWithParam(
        null,
        component.props.navigation,
        "ReviewTrainingUniversity"
      );
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, data, token, callback);
  };

  updateUser = async (component, dataAnother, step = 1) => {
    var datauser = await this.getDataUser();

    let token = null,
      user_id;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlUpdateUser;

    var data;

    try {
      data = JSON.stringify(dataAnother);
    } catch (error) {}

    var callback = async (responseData) => {
      try {
        // update user on step 1
        if (step == 1) {
          datauser.user.another.sex = component.index;
          datauser.user.another.title = component.state.title;
          datauser.user.another.prename = component.state.firstName;
          datauser.user.another.lastname = component.state.lastName;
        }
        // update user on step 2
        else if (step == 2) {
          datauser.user.another.mail = component.state.email;
          datauser.user.another.mobile_phone_number = component.state.mobile;
          datauser.user.another.cell_number = dataAnother.cell_number;
        } else if (step == 4) {
          datauser.user.another.moment = dataAnother.moment_id;
        } else if (step == 5) {
          datauser.user.another.job_id_1 = dataAnother.job_id;
          datauser.user.another.work_experience_id =
            dataAnother.work_experience_id;
        } else if (step == 6) {
          datauser.user.another.drive_license = dataAnother.drive_license;
          datauser.user.another.passenger_transport =
            dataAnother.passenger_transport;
        } else if (step == 7) {
          datauser.user.another.hobbies = dataAnother.hobbies;
        } else {
          // update address for user
          datauser.user.another.address_id = dataAnother.address_id;
          global.commonData.user.another.address_id = dataAnother.address_id;
        }

        await AsyncStorage.setItem("data", JSON.stringify(datauser));
      } catch (error) {
        console.log(error);
      }
    };

    network.fetchPUT_HEADER(url, data, token, callback);
  };

  updateTokenUser = async (component, dataAnother) => {
    var datauser = await this.getDataUser();

    let token = null,
      user_id;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlUpdateUser;

    var data;

    try {
      data = JSON.stringify(dataAnother);
    } catch (error) {}

    var callback = async (responseData) => {
      console.log("callback");
    };

    network.fetchPUT_HEADER(url, data, token, callback);
  };

  updateAdress = async (dataAddress) => {
    var datauser = await this.getDataUser();

    let token = null,
      user_id;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlUpdateaddress;

    let body = {};
    let data;

    body.city = dataAddress.city;
    body.postal_code = dataAddress.postal_code;
    body.street = dataAddress.street;
    body.house_number = dataAddress.house_number;
    body.address_addition = dataAddress.address_addition;
    body.year_birthday = dataAddress.year_birthday;
    body.state = null;
    body.country = dataAddress.country;
    body.address_id = global.commonData.user.another.address_id;

    data = JSON.stringify(body);

    var callback = async (responseData) => {
      try {
        datauser.user.another.street = dataAddress.street;
        datauser.user.another.house_number = dataAddress.house_number;
        datauser.user.another.address_addition = dataAddress.address_addition;
        datauser.user.another.postal_code = dataAddress.postal_code;
        datauser.user.another.city = dataAddress.city;
        datauser.user.another.year_birthday = dataAddress.year_birthday;

        global.commonData.user.another = datauser.user.another;

        await AsyncStorage.setItem("data", JSON.stringify(datauser));
      } catch (error) {
        console.log(error);
      }
    };

    network.fetchPUT_HEADER(url, data, token, callback);
  };

  updateUserEducation = async (
    component,
    education_id,
    dataEducation,
    position
  ) => {
    let url = global.urlRootWewantu + global.urlUpdateUserEducatation;

    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;

      user_id = datauser.user.user_id;
    } catch (error) {
      console.log(error);
    }

    const data = new FormData();

    data.append("institute", dataEducation.job);
    data.append("job_id", dataEducation.job_id);
    data.append("company", dataEducation.name);
    data.append("education_id", education_id);

    var callback = async (responseData) => {
      try {
        global.reviewTraining.state.trainning[position] = dataEducation;

        const strAsyncStorage = global.trainning;

        // update local
        await this.setDataAsyncStorage(
          strAsyncStorage,
          JSON.stringify(global.reviewTraining.state.trainning)
        );

        this.gotoScreenWithParam(
          null,
          component.props.navigation,
          "ReviewTrainingUniversity"
        );
      } catch (error) {
        console.log(error);
      }

      component.setState({
        ActivityIndicator: false,
      });

      return;
    };

    component.setState({ ActivityIndicator: true });

    network.fetchPOST_HEADER_Upload(url, data, token, callback);
  };

  getListUser = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {
      listJobAPI = undefined;
      listJoBlike = [];
    }

    let url = global.urlRootWewantu + global.urlUser;

    var callback = async (responseData) => {
      var callback1 = async (responseData1) => {
        component.setState({
          userList: responseData,
          chatList: responseData1,
          ActivityIndicator: false,
        });
      };

      let url = global.urlRootWewantu + global.urlChat;
      network.fetchGET_HEADER(url, null, token, callback1);
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListMessage = async (component, from_user_id, to_user_id) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {
      listJobAPI = undefined;
      listJoBlike = [];
    }

    let url = global.urlRootWewantu + global.urlChat;

    var callback = async (responseData) => {
      let mesages = [];

      responseData.map((item, index) => {
        if (
          (item.user_id_from == from_user_id ||
            item.user_id_from == to_user_id) &&
          (item.user_id_to == from_user_id || item.user_id_to == to_user_id)
        ) {
          var obj = {};

          obj.dateTime = item.create_at;
          obj.fromUser = item.user_id_from;
          obj.message = item.message;

          mesages.push(obj);
        }
      });

      component.setState({ data: mesages, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListMedia = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlMedia;

    var callback = async (responseData) => {
      var obj = null;

      responseData.map((item, index) => {
        if (item.user_id == datauser.user.user_id) {
          obj = {};

          obj.file_img = item.file_img;
          obj.file_doc = item.file_doc != "null" ? item.file_doc : null;
          obj.file_video = item.file_video != "null" ? item.file_video : null;
        }
      });

      if (obj == null) {
        obj = {};

        obj.file_img = null;
        obj.file_doc = null;
        obj.file_video = null;
      }

      component.setState({ media: obj, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListWAH = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlWorkathome;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.id = item.desired_work_at_home_id;
        obj.label = item.value;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ data1: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListMoment = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlMoment;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.label = item.text;
        obj.id = item.moment_id;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ moment: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListWorkExpericence = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlWorkExpericence;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.label = item.value;
        obj.id = item.work_experience_id;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ workExperience: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListEducationalStageTypes = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlEducationalStageTypes;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.id = item.educational_stage_type_id;
        obj.label = item.educational_stage;

        data.push(obj);
      });

      component.setState({
        EducationalStageTypes: data,
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListWAN = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlWorkatnight;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.id = item.desired_work_at_night_id;
        obj.label = item.value;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ data2: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListWWK = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlWorkatweekend;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.id = item.desired_work_at_weekend_id;
        obj.label = item.value;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ data3: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListAmbitiion = async (component) => {
    var datauser = await this.getDataUser();
    let token = null;

    try {
      datauser = JSON.parse(datauser);

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlAmbition;

    var callback = async (responseData) => {
      var data = [];

      responseData.map((item, index) => {
        obj = {};

        obj.id = item.ambitions_id;
        obj.label = item.ambition;
        obj.require = false;

        data.push(obj);
      });

      component.setState({ data4: data, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListDriveLiense = async (component) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlDriveLicense;

    var callback = async (responseData) => {
      let listDiveLicense = [];

      responseData.map((item, index) => {
        listDiveLicense[index] = {};

        listDiveLicense[index].id = item.driver_license_id;
        listDiveLicense[index].name = item.driver_license;
      });

      let url = global.urlRootWewantu + global.urlUserDriveLicense;
      url = url.replace("{user_id}", user_id);

      var callback1 = async (responseData) => {
        let userDriveLicense = [];

        responseData.map((item, index) => {
          userDriveLicense.push(item.driver_license_id);
        });

        component.setState({
          listDiveLicense: listDiveLicense,
          userDriveLicense: userDriveLicense,
          ActivityIndicator: false,
        });
      };

      network.fetchGET_HEADER(url, null, token, callback1);
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListUserLanguages = async (component) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlUserLanguages;
    url = url.replace("{user_id}", user_id);

    var callback = async (responseData) => {
      let userLanguages = [];

      responseData.map((item, index) => {
        userLanguages[index] = {};

        userLanguages[index].id = item.language.language_id;
        userLanguages[index].name = item.language.language;
        userLanguages[index].level = item.level;
      });

      component.setState({
        ActivityIndicator: false,
        userLanguages: userLanguages,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getUser = async (component, dataUser) => {
    let token, user_id;

    try {
      user_id = dataUser.user.user_id;

      token = dataUser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlGetUser;
    url = url.replace("{user_id}", user_id);

    var callback = async (responseData) => {
      try {
        dataUser.user.another = {};

        dataUser.user.another.mail = responseData[0].mail;
        dataUser.user.another.prename = responseData[0].prename;
        dataUser.user.another.lastname = responseData[0].lastname;
        dataUser.user.another.sex = responseData[0].sex;
        dataUser.user.another.address_id = responseData[0].address_id;
        dataUser.user.another.mobile_phone_number =
          responseData[0].mobile_phone_number;
        dataUser.user.another.street = responseData[0].street;
        dataUser.user.another.house_number = responseData[0].house_number;
        dataUser.user.another.address_addition =
          responseData[0].address_addition;
        dataUser.user.another.postal_code = responseData[0].postal_code;
        dataUser.user.another.city = responseData[0].city;
        dataUser.user.another.year_birthday = responseData[0].year_birthday;
        dataUser.user.another.address_id = responseData[0].address_id;
        dataUser.user.another.hobbies = responseData[0].hobbies;

        global.commonData.user.another = dataUser.user.another;

        await AsyncStorage.setItem("data", JSON.stringify(dataUser));
      } catch (error) {
        console.log(error);
      }

      component.setState({
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getJobProfileEdit = (userJobProfile, jobprofile_id) => {
    var editUser = null;

    try {
      userJobProfile.map((item, index) => {
        if (item.job_search_profile_id == jobprofile_id) editUser = item;
      });
    } catch (error) {
      console.log(error);
    }

    return editUser;
  };

  getListUserJobprofiles = async (component) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlGetJobProfile;
    url = url.replace("{user_id}", user_id);

    var callback = async (responseData) => {
      let userJobprofile = [];

      responseData.map((item, index) => {
        userJobprofile[index] = {};

        try {
          userJobprofile[index].job_search_profile_id =
            item.job_search_profile_id;
          userJobprofile[index].job = item.job_id;
          userJobprofile[index].week_hour = item.desired_weekly_hours;
          userJobprofile[index].gross_year = item.desired_salary;
          userJobprofile[index].day_per_year =
            item.desired_holiday_days_per_year;
          userJobprofile[index].day_per_week =
            item.desired_working_days_per_week;
          userJobprofile[index].work_home =
            item.desired_work_at_home.desired_work_at_home_id;
          userJobprofile[index].work_weekend =
            item.desired_work_at_weekend.desired_work_at_weekend_id;
          userJobprofile[index].work_night =
            item.desired_work_at_night.desired_work_at_night_id;
          userJobprofile[index].distance = item.max_distance;
          userJobprofile[index].distance1 = 0;
          userJobprofile[index].intres = item.ambitions.ambitions_id;
        } catch (error) {
          console.log(error);
        }
      });

      global.userJobprofile = userJobprofile;

      component.setState({
        ActivityIndicator: false,
        userJobprofile: userJobprofile,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getListUserEducation = async (component) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlGetUserEducatation;
    url = url.replace("{user_id}", user_id);

    var callback = async (responseData) => {
      let userEducations = [];

      responseData.map((item, index) => {
        userEducations[index] = {};

        try {
          userEducations[index].type = null;
          userEducations[index].educationstage_id =
            item.educational_stage_type.educational_stage_type_id;
          userEducations[index].id = item.educational_stage_id;
          userEducations[index].job = item.institute;
          userEducations[index].job_id = item.job_id;
          userEducations[index].name = item.company;
        } catch (error) {
          console.log(error);
        }
      });

      const strAsyncStorage = global.trainning;

      await this.setDataAsyncStorage(
        strAsyncStorage,
        JSON.stringify(userEducations)
      );

      component.setState({
        ActivityIndicator: false,
        trainning: userEducations,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  deleteEducation = async (component, education_id, callBack = false) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlDeleteUserEducatation;
    url = url.replace("{education_id}", education_id);

    var callback = async (responseData) => {
      component.setState({
        ActivityIndicator: false,
      });

      // if delete from add education, then comeback
      if (callBack)
        this.gotoScreenWithParam(
          null,
          component.props.navigation,
          "ReviewTrainingUniversity"
        );
    };

    component.setState({ ActivityIndicator: true });
    network.fetchDELETE_HEADER(url, null, token, callback, null);
  };

  getListLanguages = async (component) => {
    var datauser = await this.getDataUser();
    let token = null,
      user_id = null;

    try {
      datauser = JSON.parse(datauser);

      user_id = datauser.user.user_id;

      token = datauser.user.session_secret;
      token = "Bearer " + token;
    } catch (error) {}

    let url = global.urlRootWewantu + global.urlLanguage;

    var callback = async (responseData) => {
      let listLanguages = [];

      responseData.map((item, index) => {
        listLanguages[index] = {};

        listLanguages[index].id = item.language_id;
        listLanguages[index].name = item.language;
      });

      component.setState({
        languageServer: listLanguages,
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  getDetailJob = async (component, id) => {
    let base64ID = btoa(id);

    callback = async (responseData) => {
      component.setState({
        detailJob: responseData,
        ActivityIndicatorModal: false,
      });
    };

    let url = global.urlRootJob + global.detailJob;
    url = url.replace("{id}", base64ID);

    let token = "Bearer " + global.commonData.tokenJob;

    component.setState({ ActivityIndicatorModal: true });
    network.fetchGET_HEADER(url, null, token, callback);
  };

  updateListLikeJob = async (index, component) => {
    var exixt = false,
      listJobAPI,
      listJoBlike;

    var datauser = await this.getDataUser();

    try {
      datauser = JSON.parse(datauser);

      listJobAPI = datauser.listJbobAPI;
      listJoBlike =
        datauser.listJoBlike != undefined ? datauser.listJoBlike : [];

      let position = this.checkJobIntoListLike(listJobAPI[index], listJoBlike);

      if (position > -1) listJoBlike.splice(position, 1);
      else listJoBlike.push(listJobAPI[index]);

      global.commonData.listJoBlike = listJoBlike;

      await functions.setDataAsyncStorage(
        "data",
        JSON.stringify(global.commonData)
      );

      component.setState({ listJoBlike: listJoBlike });
    } catch (error) {
      console.log(error);
    }
  };

  updateListConfirmJob = async (index, component) => {
    var exixt = false,
      listJobAPI,
      listJoBConfirm;

    var datauser = await this.getDataUser();

    try {
      datauser = JSON.parse(datauser);

      listJobAPI = datauser.listJbobAPI;
      listJoBConfirm =
        datauser.listJoBConfirm != undefined ? datauser.listJoBConfirm : [];

      let position = this.checkJobIntoListLike(
        listJobAPI[index],
        listJoBConfirm
      );

      if (position > -1) listJoBConfirm.splice(position, 1);
      else listJoBConfirm.push(listJobAPI[index]);

      global.commonData.listJoBConfirm = listJoBConfirm;

      await functions.setDataAsyncStorage(
        "data",
        JSON.stringify(global.commonData)
      );

      //component.setState({ listJoBConfirm: listJoBConfirm });
    } catch (error) {
      console.log(error);
    }
  };

  checkJobIntoListLike = (job, listJobLike) => {
    var position = -1;

    listJobLike.map((item, index) => {
      if (JSON.stringify(job) == JSON.stringify(item)) position = index;
    });

    return position;
  };

  shallowEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  getTextLanguage = async (component, index) => {
    let url =
      index == 0
        ? global.urlRootWewantu + global.language
        : global.urlRootWewantu + global.language_1;

    const username = global.userWeantu;
    const password = global.passwordWeantu;

    const base64Credentials = btoa(`${username}:${password}`);

    var token = "Basic " + base64Credentials + "";

    var body = null;

    var callback = async (responseData) => {
      global.commonData.languages = JSON.parse(responseData);

      await functions.setDataAsyncStorage(
        "data",
        JSON.stringify(global.commonData)
      );

      component.setState({ text: responseData });
    };

    //component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, body, token, callback);
  };

  getFaq = async (component, language) => {
    let url = global.urlRootWewantu + global.faq;

    const username = global.userWeantu;
    const password = global.passwordWeantu;

    const base64Credentials = btoa(`${username}:${password}`);

    var token = "Basic " + base64Credentials + "";

    var body = null;

    var callback = async (responseData) => {
      var faqs = [];

      /*responseData.map((item, index) = {
        item.hj 
      })*/
      component.setState({ faqs: responseData, ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getJobs = async (component) => {
    let url = global.urlRootWewantu + global.jobs;

    const username = global.userWeantu;
    const password = global.passwordWeantu;

    const base64Credentials = btoa(`${username}:${password}`);

    var token = "Basic " + base64Credentials + "";

    var body = null;
    /*var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;*/

    var callback = async (responseData) => {
      global.data = JSON.parse(responseData);

      component.setState({
        jobs: JSON.parse(responseData),
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, body, token, callback);
  };

  getListPopularProduct = async (component, shop) => {
    let url = global.urlRoot + global.urlPopularProduct;
    url = url.replace(":shop", shop);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      component.setState({
        dataProductSlider: responseData.data.items,
        shop: shop,
      });
      component.setState({ ActivityIndicator3: false });
    };

    component.setState({ ActivityIndicator3: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getListService = async (component, service) => {
    let url = global.urlRoot + global.urlService;
    url = url.replace("{cat}", service);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      var data = responseData.data;
      var cat_id = data[0].catid;
      var cat_name = data[0].ten;

      functions.getListProductByTag(
        component,
        service,
        cat_id,
        cat_name,
        responseData.data
      );
    };

    //component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getListProductByTagClick = async (
    component,
    cat,
    cat_id,
    cat_name,
    listService
  ) => {
    //if (cat == "yahoo_auction") cat = "yahoo";

    let url =
      cat != "yahoo_auction"
        ? global.urlRoot + global.urlProductByTag
        : global.urlRoot + global.urlProductByTagAuction;

    url = url.replace("{cat}", cat);
    url = url.replace("{cat_id}", cat_id);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    var callback = async (responseData) => {
      component.setState({
        listProductByTag: responseData.data,
        service: cat_name,
        listService: listService,
      });
      component.setState({ ActivityIndicator4: false });
    };

    component.setState({ ActivityIndicator4: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getListProductByTag = async (
    component,
    cat,
    cat_id,
    cat_name,
    listService
  ) => {
    //if (cat == "yahoo_auction") cat = "yahoo";

    let url =
      cat != "yahoo_auction"
        ? global.urlRoot + global.urlProductByTag
        : global.urlRoot + global.urlProductByTagAuction;
    url = url.replace("{cat}", cat);
    url = url.replace("{cat_id}", cat_id);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      /*functions.getPopularItem(
        component,
        responseData,
        cat_name,
        listService,
        cat
      );*/
      component.setState({
        listProductByTag: responseData.data,
        listService: listService,
        service: cat_name,
        //ActivityIndicator3: false,
        ActivityIndicator4: false,
      });
    };

    network.fetchGET_HEADER(url, body, token, callback);
  };

  getListProductByTagFilter = async (component, cat, cat_id, filter, price) => {
    //if (cat == "yahoo_auction") cat = "yahoo";

    let url =
      cat != "yahoo_auction"
        ? global.urlRoot + global.urlProductByTag
        : global.urlRoot + global.urlProductByTagAuction;
    url = url.replace("{cat}", cat);
    url = url.replace("{cat_id}", cat_id);
    url = url + "&condition=" + filter + "";
    if (price > 0) url = url + "&max=" + Math.round(price) + "";

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      component.setState({
        listProductByTag: responseData.data,
        //ActivityIndicator3: false,
        ActivityIndicator: false,
      });
    };

    component.setState({ ActivityIndicator: true, visibleFilter: false });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  getPopularItem = async (component, shop) => {
    let url = global.urlRoot + global.urlPopularItem;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      var data = responseData.data;
      var listPopularItem = [];
      var count;
      var service = functions.convertShopToPopularItem(shop);

      for (count = 0; count < data.length; count++) {
        switch (service) {
          case "AMZ":
            listPopularItem.push(data[count].AMZ);
            break;

          case "RKT":
            listPopularItem.push(data[count].RKT);
            break;

          case "MCR":
            listPopularItem.push(data[count].MCR);
            break;

          default:
            listPopularItem.push(data[count].YA);
        }
      }

      /*functions.getPopularName(
        component,
        responseDataBefore,
        cat_name,
        listService,
        listPopularItem
      );*/
      component.setState({
        listPopularItem: listPopularItem,
        ActivityIndicator1: false,
      });
    };

    network.fetchGET_HEADER(url, body, token, callback);
  };

  getPopularName = async (component) => {
    let url = global.urlRoot + global.urlPopularName;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      component.setState({
        listPopularName: responseData.data,
        ActivityIndicator2: false,
      });
    };

    network.fetchGET_HEADER(url, body, token, callback);
  };

  getProduct = async (component, cat, id) => {
    var productSimilar1 = [];
    var productSimilar2 = [];

    let url =
      cat != "yahoo_auction"
        ? global.urlRoot + global.urlProduct
        : global.urlRoot + global.urlProductAuction;
    url = url.replace("{cat}", cat);
    url = url.replace("{id}", id);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    var count;

    let body = {};

    callback = async (responseData) => {
      if (responseData.data.recommend != undefined) {
        var similarProduct = responseData.data.recommend;

        for (
          count = 0;
          count < Math.round(similarProduct.length / 2);
          count++
        ) {
          productSimilar1.push(similarProduct[count]);
        }

        for (
          count = Math.round(similarProduct.length / 2);
          count < similarProduct.length;
          count++
        ) {
          productSimilar2.push(similarProduct[count]);
        }
      }

      component.setState({
        product: responseData.data,
        productSimilar1: productSimilar1,
        productSimilar2: productSimilar2,
      });
      component.setState({ ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  gotoCart = async (component) => {
    var cart = await this.getCart();
    cart = JSON.parse(cart);

    var countCart = cart.length;

    this.gotoScreenWithParam(
      countCart,
      component.props.navigation,
      "CartScreen"
    );
  };

  updateCart = async (component) => {
    var dataProductCart = component.state.dataProductSlider;
    var removeList = [];
    var updateList = [];
    var count;

    for (count = 0; count < dataProductCart.length; count++) {
      if (dataProductCart[count].check == false)
        removeList.push(dataProductCart[count]);
      else updateList.push(dataProductCart[count]);
    }

    let url = global.urlRoot + global.urlRemoveCart;
    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {
      Items: [],
    };

    for (count = 0; count < removeList.length; count++) {
      body.Items.push(removeList[count]._id);
    }

    body = JSON.stringify(body);

    callback = async (responseData) => {
      for (count = 0; count < updateList.length; count++)
        functions.updateQuantityCart(updateList[count]);

      functions.gotoScreenWithParam(
        JSON.stringify(dataProductCart),
        component.props.navigation,
        "PaymentScreen"
      );
    };

    network.fetchPATCH_HEADER(url, body, token, callback);
  };

  updateQuantityCart = async (product) => {
    let url = global.urlRoot + global.urlUpdateCart;
    url = url.replace(":id", product._id);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    callback = async (responseData) => {
      return;
    };

    let body = {};
    body.Quantity = product.Quantity;

    var data = JSON.stringify(body);

    network.fetchPATCH_HEADER(url, data, token, callback);
  };

  prepareAddOrder = async (cart, component) => {
    var count;

    cart = JSON.parse(cart);

    component.setState({ ActivityIndicator: true });

    for (count = 0; count < cart.length; count++) {
      if (cart[count].check == undefined || cart[count].check)
        await this.addOrder(cart[count], component);
    }

    component.setState({ ActivityIndicator: false, visible: true });
  };

  sendSMS = async (component, mobile, pin) => {
    let url = global.urlSendSMS;

    const username = global.userSMS;
    const password = global.passwordSMS;

    const base64Credentials = btoa(`${username}:${password}`);

    var token = "Basic " + base64Credentials + "";

    let body = {};
    let data;

    body.messages = [];
    body.messages[0] = {};
    body.messages[0].body = pin;
    body.messages[0].to = mobile;
    body.messages[0].from = global.fromSMS;

    data = JSON.stringify(body);

    callback = async (responseData) => {
      component.setState({ ActivityIndicator: false });
    };

    component.setState({ ActivityIndicator: true });
    network.fetchPOST_HEADER(url, data, token, callback);
  };

  getCurrentDateTime = () => {
    // Create a new Date object
    var currentDate = new Date();

    // Get the current date components
    var year = currentDate.getFullYear();
    var month = this.padZero(currentDate.getMonth() + 1);
    var date = this.padZero(currentDate.getDate());

    // Get the current time components
    var hours = this.padZero(currentDate.getHours());
    var minutes = this.padZero(currentDate.getMinutes());
    var seconds = this.padZero(currentDate.getSeconds());

    // Return the formatted date and time
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  padZero = (num) => {
    return (num < 10 ? "0" : "") + num;
  };

  pushMessage = (idUser, idGroup, message, context) => {
    var ref = "messages/" + idGroup;

    var value = {
      dateTime: this.getCurrentDateTime(),
      fromUser: idUser,
      message: message,
    };

    var callback = (error) => {
      console.log("push");
    };

    new firebase(context).pushref(ref, value, callback);
  };

  deleteBid = async (component, id) => {
    var orderList = [];
    var count;

    let url = global.urlRoot + global.deleteBid;
    url = url.replace(":id", id);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};
    let data;

    data = JSON.stringify(body);

    callback = (responseData) => {
      if (responseData.success) {
        for (count = 0; count < component.state.orderList.length; count++) {
          if (component.state.orderList[count]._id != id)
            orderList.push(component.state.orderList[count]);
        }
        component.setState({
          orderList: orderList,
          ActivityIndicator: false,
          visible: false,
        });
      }
    };

    component.setState({ ActivityIndicator: true });
    network.fetchDELETE_HEADER(url, data, token, callback);
  };

  deleteFavorite = async (component, product) => {
    var orderList = [];
    var count;

    let url = global.urlRoot + global.removefavorite;
    url = url.replace(":id", product);

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};
    let data;

    data = JSON.stringify(body);

    callback = (responseData) => {
      var listFavorite = component.state.ListFavorite;

      if (responseData.success) {
        for (count = 0; count < listFavorite.length; count++) {
          if (listFavorite[count]._id == product) listFavorite.splice(count, 1);
        }

        component.setState({
          ActivityIndicator3: false,
          ListFavorite: listFavorite,
        });
      }
    };

    component.setState({ ActivityIndicator3: true });
    network.fetchDELETE_HEADER(url, data, token, callback);
  };

  getListFavorite = async (component) => {
    let url = global.urlRoot + global.urlListFavorite;

    var datauser = await this.getDataUser();
    datauser = JSON.parse(datauser);
    var token = datauser.token;

    let body = {};

    callback = async (responseData) => {
      try {
        await AsyncStorage.setItem(
          "listFavorite",
          JSON.stringify(responseData.data)
        );
      } catch (error) {
        console.log(error);
      }

      component.setState({
        ListFavorite: responseData.data,
        ActivityIndicator3: false,
      });
    };

    component.setState({ ActivityIndicator3: true });
    network.fetchGET_HEADER(url, body, token, callback);
  };

  logout___ = async (component) => {
    try {
      await AsyncStorage.setItem("dataPersonal", "");
    } catch (error) {
      console.log(error);
    }

    functions.gotoScreen(component.props.navigation, "LoginScreen");
  };

  convertMoney = (number) => {
    //return number;
    number = number != undefined ? number : 0;

    var number = number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    number = number.replace("$", "");
    number = number.replace(".00", "");

    return number;
  };

  formatTitle = (title) => {
    /*var count;

     if(title.length < 15) {
        for(count = title.length; count < 15; count++)
          title = title + 'les';
     }*/

    return title.substr(0, 15);
  };
}

const functions = new Functions();
export default functions;
