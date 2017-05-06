import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import DefaultModal from './DefaultModal';

const DEVICES_WIDTH = Dimensions.get('window').width;
const DEVICES_HEIGHT = Dimensions.get('window').height;

export default class ExitConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalHeight: 0,
      modalWidth: 0
    };
  
    this.anima = new Animated.Value(0);

    this.handlePressBack = this.handlePressBack.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setModalSize = this.setModalSize.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handlePressBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handlePressBack);
  }

  handlePressBack() {
    this.openModal();
    return true;
  }

  openModal() {
    this.anima.setValue(0);
    this.setState({ modalVisible: true });
    Animated.spring(
      this.anima,
      {
        toValue: 1,
        duration: 2000,
      },
    ).start();
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  setModalSize(event) {
    const modalHeight = event.nativeEvent.layout.height;
    const modalWidth = event.nativeEvent.layout.width;
    this.setState({ modalHeight, modalWidth });
  }
  
  render() {
    const sideAnima = this.anima.interpolate({
      inputRange: [0, 1],
      outputRange: [0, (DEVICES_WIDTH - 200) / 2],
    });

    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <Text>{DEVICES_WIDTH} {JSON.stringify(this.state)}</Text>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}
        >
         <View style={styles.modalContainer}>
          <Animated.View style={{ transform: [{ translateX: sideAnima }] }}>
            <View onLayout={this.setModalSize}>
              {this.props.modal()}
            </View>
          </Animated.View>
         </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    borderRadius: 360,
    backgroundColor: '#ccc',
  },
});

ExitConfirm.defaultProps = {
  modal: () => <DefaultModal />,
}

ExitConfirm.propTypes = {
  children: PropTypes.element.isRequired,
  modal: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ])
};