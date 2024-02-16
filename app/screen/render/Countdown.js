import React, {useEffect, useState} from "react";

import {
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { Rating } from "react-native-elements";
import { Text } from "react-native-paper";

import styles from "../../style/style";
import functions from "../../../app/function/function";

import moment from "moment";

const image2 = require("../../../app/images/shopping_bag.png");
const image2_auction = require("../../../app/images/auction-buy.png");
const heart = require("../../../app/images/heart.png");
const heart_active = require("../../../app/images/heart-active.png");
const clock = require("../../../app/images/clock.png");

const minHeight = 50;

getCountDown = (endTime) => {
    var response = {};

    var dateCurrent = moment().unix();
    var dateEndBid = moment(endTime).unix();

    var time = dateEndBid - dateCurrent;
    var date = new Date(time * 1000);

    var day = Math.floor(time / 86400);
    var hours = Math.floor((time - day * 24 * 3600) / 3600);
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    response.day = day;
    response.hours = hours;
    response.minutes = minutes;
    response.seconds = seconds;

    return response
   }

Countdown = ({end, type}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          //console.log('This will run every second!');
          setCount((count) => count +1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    var text = getCountDown(end).day + 'd:' + getCountDown(end).hours + 'h :' + getCountDown(end).minutes +'m :' + getCountDown(end).seconds + 's';

    if(!type)
      return (
        <Text style={{ marginLeft: 10, color: '#3187EA' }}>{text}</Text>
      );
    else 
     return(
<Text style={styles.money2}>{text}</Text>  
     )
};

export default Countdown;