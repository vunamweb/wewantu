import React from "react";

import {
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { Rating } from "react-native-elements";
import { Text } from "react-native-paper";

import styles from "../../style/style";
import functions from "../../../app/function/function";

import Countdown from "./Countdown";

const image2 = require("../../../app/images/shopping_bag.png");
const image2_auction = require("../../../app/images/auction-buy.png");
const heart = require("../../../app/images/heart.png");
const heart_active = require("../../../app/images/heart-active.png");
const clock = require("../../../app/images/clock.png");

const minHeight = 50;

Auction = ({ item, index, parent }) => {
    if (index % 2 == 0)
    return (
      <View style={{ width: "50%", marginTop: 20 }}>
        <View style={{ paddingRight: 5, width: "100%" }}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: "white",
              width: "100%",
              padding: 10,
            }}
          >
            <View style={{ padding: 0 }}>
              <Image
                style={{ width: "100%", height: 128, marginTop: 20 }}
                source={{
                  uri: item.Image != undefined ? item.Image : item.image,
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 0, right: 5 }}
                onPress={() =>
                  parent.addRemoveFavorite(
                    item.code != undefined ? item.code : item.ID
                  )
                }
              >
                <View>
                  {parent.checkFavorite(
                    item.code != undefined ? item.code : item.ID
                  ) ? (
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={heart_active}
                    />
                  ) : (
                    <Image source={heart} />
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 30 }}>
              {item.code != undefined ? 
              <View/> : 
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Image style={{ width: 16, height: 16 }} source={clock}/>
                <Countdown type={false} end={item.End}/>
                </View>
              }
                <TouchableOpacity
                  onPress={() =>
                    functions.gotoScreenProduct(
                      parent.props.navigation.state.params.itemId,
                      item.code != undefined ? item.code : item.ID,
                      parent.props.navigation,
                      "ProductScreen"
                    )
                  }
                >
                  <Text
                    style={{
                      color: "#23262F",
                      fontSize: 16,
                      minHeight: minHeight,
                    }}
                  >
                    {item.title != undefined
                      ? item.title.substr(0, 15)
                      : item.Title.substr(0, 15)}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{ color: "#23262F", fontSize: 12, marginTop: 5 }}
                >
                  Từ {parent.props.navigation.state.params.itemId}
                </Text>
                <Rating
                  imageSize={15}
                  readonly
                  startingValue={0}
                  style={styles.rating}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={[
                        { color: "#D63F5C", fontSize: 16 },
                        styles.fontBold,
                      ]}
                    >
                      {item.price != undefined
                        ? functions.convertMoney(item.price)
                        : functions.convertMoney(item.Price)}{" "}
                      ¥
                    </Text>
                    <Text style={{ fontSize: 12, color: "#777E90" }}>
                      {item.priceVN != undefined
                        ? functions.convertMoney(item.priceVN)
                        : functions.convertMoney(item.PriceVN)}{" "}
                      VND
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      functions.gotoScreenProduct(
                        parent.props.navigation.state.params.itemId,
                        item.code != undefined ? item.code : item.ID,
                        parent.props.navigation,
                        "ProductScreen"
                      )
                    }
                  >
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={
                        item.code != undefined ? image2 : image2_auction
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  else
    return (
      <View style={{ width: "50%", marginTop: 20 }}>
        <View style={{ paddingLeft: 5, width: "100%" }}>
          <View
            style={{
              borderRadius: 30,
              backgroundColor: "white",
              width: "100%",
              padding: 10,
            }}
          >
            <View style={{ padding: 0 }}>
              <Image
                style={{ width: "100%", height: 128, marginTop: 20 }}
                source={{
                  uri: item.Image != undefined ? item.Image : item.image,
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 0, right: 5 }}
                onPress={() => parent.addRemoveFavorite(item.code)}
              >
                <View>
                  {parent.checkFavorite(item.code) ? (
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={heart_active}
                    />
                  ) : (
                    <Image source={heart} />
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 30 }}>
              {item.code != undefined ? 
              <View/> : 
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Image style={{ width: 16, height: 16 }} source={clock}/>
                <Countdown end={item.End}/>
                </View>
              }
                <TouchableOpacity
                  onPress={() =>
                    functions.gotoScreenProduct(
                      parent.props.navigation.state.params.itemId,
                      item.code != undefined ? item.code : item.ID,
                      parent.props.navigation,
                      "ProductScreen"
                    )
                  }
                >
                  <Text
                    style={{
                      color: "#23262F",
                      fontSize: 16,
                      minHeight: minHeight,
                    }}
                  >
                    {item.title != undefined
                      ? item.title.substr(0, 15)
                      : item.Title.substr(0, 15)}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{ color: "#23262F", fontSize: 12, marginTop: 5 }}
                >
                  Từ {parent.props.navigation.state.params.itemId}
                </Text>
                <Rating
                  imageSize={15}
                  readonly
                  startingValue={0}
                  style={styles.rating}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={[
                        { color: "#D63F5C", fontSize: 16 },
                        styles.fontBold,
                      ]}
                    >
                      {item.price != undefined
                        ? functions.convertMoney(item.price)
                        : functions.convertMoney(item.Price)}{" "}
                      ¥
                    </Text>
                    <Text style={{ fontSize: 12, color: "#777E90" }}>
                      {item.priceVN != undefined
                        ? functions.convertMoney(item.priceVN)
                        : functions.convertMoney(item.PriceVN)}{" "}
                      VND
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Image
                      style={{ width: 32, height: 32 }}
                      source={
                        item.code != undefined ? image2 : image2_auction
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
};

export default Auction;