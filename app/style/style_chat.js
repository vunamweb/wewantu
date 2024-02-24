import { StyleSheet, Dimensions } from 'react-native';

const{width} = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b5ec',
  },
  inputContainer: {
    width: 250,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: "center"
  },
  messageContainer: {
    width: '90%',
    //minWidth: 100,
    //minHeight: 30,
    marginTop: 20,
    //marginLeft: 5,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#3F3F3F',
  },
  messageContainerOwn: {
    width: '90%',
    //minWidth: 100,
    //minHeight: 30,
    marginTop: 20,
    marginLeft: '10%',
    paddingLeft: 20,
    paddingTop: 5,
    paddingRight: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#898166',
  },
  typingUser: {
    width: 60,
    //minWidth: 100,
    //minHeight: 30,
    marginTop: 20,
    marginBottom: 20,
    padding: 0,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#3F3F3F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainerNoBorder: {
    width: width,
    marginLeft: 0,
    backgroundColor: 'red',
  },
  buttonContainer: {
    borderRadius: 30,
    width: 250,
    marginBottom: 20
  },
  registerContainer: {
    flexDirection: "row",
  },
  registerClick: {
    marginLeft: 5,
    color: '#fff'
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    //paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerInputChat: {
position: 'absolute',
bottom: 0
  },

  bgAvatar: {
    flex: 2
  },
  avatar: {
    width: width * 15 / 100,
    height: width * 15 / 100,
    borderRadius: width * 10 / 100,
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center'

  },
  name: {
    //fontWeight: 'bold',
    color: 'white',
    //fontSize: 16,
    paddingBottom: 3
  },
  bgSeen: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarSeen: {
    width: width * 5 / 100,
    height: width * 5 / 100,
    borderRadius: width * 2.5 / 100,
  },
  selfView: {
    width: 200,
    height: 150,
  },
  remoteView: {
    width: 200,
    height: 150,
  },
});
