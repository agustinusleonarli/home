import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  BackHandler,
  Modal,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Background,
  Logo,
  User1,
  Vector1,
  Vector2,
  Key,
  BackgroundHome,
  Vector3,
  Kotak,
  Sayuran,
  Name,
  Packing,
  Picking,
  Cover,
  Back,
  Buncis,
  Logout,
  Center,
  ButtonKurang,
  ButtonTambah,
  ModalLogout,
} from "../../assets";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default class HomeScreen extends Component {
  componentWillUnmount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      name: "",
      token: "",
      data: "",
      warehouse_code: "",
      warehouse_name: "",
      id: "",
      type_name: "",
      idUsername: 0,
      show: false,
    };
  }
  render() {}
  getTokenID = (token, id) => {
    console.log("id home", id);
    console.log(`http://10.10.0.38:8083/v1/user/${id}`);

    console.log("id", id);
    axios
      .get(`http://10.10.0.38:8083/v1/user/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          embeds: "warehouse_id,helper_type_id",
        },
      })
      .then((response) => {
        const object = response.data.data;
        console.log("hasil response home");
        console.log(JSON.stringify(object));

        this.setState({
          isError: false,
          isLoading: false,
          name: object.name,
          warehouse_name: object.warehouse.warehouse_name,
          warehouse_code: object.warehouse.warehouse_code,
          id: object.helper_type.id,
        });
      })
      .catch((e) => {
        console.log("error home");
        console.log(e);
        this.setState({ isLoading: false, isError: true, data: "" });
      });
  };

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    console.log("homescreen");
    try {
      // let idUsername = parseInt(id)
      // console.log('idUsername', idUsername)
      idUsername = await AsyncStorage.getItem("id");
      console.log("idUsername: ", idUsername);
      const token = await AsyncStorage.getItem("token");
      console.log("idhome", parseInt(idUsername));
      console.log("tokenhome", token);
      if (idUsername !== null && token !== null) {
        console.log("Masuk ke if");
        this.getTokenID(token, idUsername);
      }
    } catch (e) {
      console.log("Tidak ada id token", e);
    }
  }
  //logout screen
  async removeItemValue() {
    try {
      // Mengahpus data kdari local storage
      await AsyncStorage.removeItem("token");
      console.log(this.props);
      this.props.navigation.navigate("Login");
    } catch (exception) {
      console.log(exception, "exception");
      alert("Gagal Menghapus Data");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoutHeader}>
          <View style={styles.viewLogout}>
            {/* onPress={() => this.removeItemValue()} */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 3,
                justifyContent: "space-around",
              }}
              onPress={() => {
                this.setState({ show: true });
              }}
            >
              <Image source={Logout} style={styles.logoutImg} />
              <Text style={{ alignSelf: "center" }}>Keluar</Text>
              <Modal transparent={true} visible={this.state.show}>
                <View style={styles.modalView}>
                  <View style={styles.modalPopUp}>
                    <View style={styles.logoutImage}>
                      <Image
                        source={ModalLogout}
                        style={styles.modalLogoutImg}
                      />
                      <Text style={styles.textLogout}>
                        Apakah Anda Yakin Keluar ?
                      </Text>
                    </View>
                    <View style={styles.yesOrno}>
                      <View
                        style={{
                          borderWidth: 1,
                          width: 99,
                          height: 40,
                          borderRadius: 100,
                        }}
                      >
                        <TouchableOpacity>
                          <Text style={{ alignSelf: "center" }}>Tidak</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          width: 99,
                          height: 40,
                          borderRadius: 100,
                        }}
                      >
                        <Text style={{ alignSelf: "center" }}>Ya</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: "100%", height: "40%", backgroundColor: "#C8E8DC" }}
        >
          <Text style={styles.textHeader}>S E L A M A T D A T A N G !</Text>
          <Image source={Sayuran} style={styles.sayuranCover} />
        </View>
        <View style={styles.center}>
          <Image source={Center} style={styles.centerCover} />
        </View>
        <View style={styles.coverNama}>
          <Image source={Cover} style={styles.cover} />
          <View style={{ height: 80, width: 200 }}>
            <Text style={styles.nameHelper}>
              {this.state.id} {this.state.name}
            </Text>
            <Text style={styles.nameWarehouse}>
              {this.state.warehouse_code} {this.state.warehouse_name}
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Packing")}
          >
            <Image source={Packing} style={styles.packing} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Picking")}
          > */}
          <Image source={Picking} style={styles.picking} />
          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoutHeader: {
    backgroundColor: "#C8E8DC",
    height: "9%",
    alignItems: "flex-end",
  },
  viewLogout: {
    width: 90,
    height: 30,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 15,
  },
  textHeader: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "OpenSans-Bold",
  },
  back: {
    marginTop: 5,
  },
  center: {
    alignSelf: "center",
  },
  centerCover: {
    marginTop: -18,
  },
  coverNama: {
    height: 80,
    borderRadius: 10,
    backgroundColor: "#EDF7F3",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  cover: {
    marginTop: 16,
    marginLeft: 18,
    marginBottom: 18,
  },
  nameHelper: {
    fontSize: 12,
    marginTop: 18,
    marginRight: 37,
    marginLeft: 13,
    flexDirection: "row",
  },
  nameWarehouse: {
    marginTop: 1,
    marginLeft: 14,
    fontSize: 10,
  },
  logoutImg: {
    alignSelf: "center",
  },
  bottom: {
    marginTop: 15,
    height: 180,
    marginRight: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  packing: {
    width: 150,
    height: 163,
  },
  picking: {
    width: 150,
    height: 163,
  },
  sayuranCover: {
    alignSelf: "center",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#000000aa",
    alignItems: "center",
  },
  modalPopUp: {
    backgroundColor: "#FFFFFF",
    width: 275,
    height: 329,
    borderRadius: 25,
    marginTop: "50%",
  },
  logoutImage: {
    width: 190,
    height: 170,
    marginTop: 40,
    borderWidth: 1,
    alignSelf: "center",
  },
  modalLogoutImg: {
    alignSelf: "center",
  },
  textLogout: {
    alignSelf: "center",
    marginTop: 18,
  },
  yesOrno: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 33,
  },
});
