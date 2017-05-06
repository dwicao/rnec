import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';

export default class ExitConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  
    this.anima = new Animated.Value(0);

    this.handlePressBack = this.handlePressBack.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
  
  render() {
    const mantap = this.anima.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50],
    });

    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.hideModal}
        >
         <View style={styles.modalContainer}>
          <Animated.View style={{ transform: [{ translateX: mantap }] }}>
            <View style={styles.content}>
              <Text>Hello World!</Text>
              <TouchableOpacity onPress={this.hideModal}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
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
  modalContent: {
    width: 200,
  },
  content: {
    borderRadius: 360,
    backgroundColor: '#ccc',
  },
});

ExitConfirm.propTypes = {
  children: PropTypes.element.isRequired,
};