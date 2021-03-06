import Color from 'color';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ModalProps, Modal, View, Image } from 'react-native';

import theme from 'src/assets/styles/theme';
import { Text, PrimaryButton, OutlineButton } from '../theme';
import Avatar, { AvatarSize } from '../theme/avatar';

import Images from 'src/assets/images';
import Proposal from 'src/models/proposal';
import User from 'src/models/user';

function lighten(color: string, value: number) {
  return Color(color).fade(value).toString();
}

interface FoundMatchModalProps extends ModalProps {
  proposal: Proposal;
  currentUser: User;
  onSuccess: Function;
}

const textGradient = [theme.colors.cottonCandyBlue, theme.colors.cottonCandyPink];
const gradient = [lighten(theme.colors.primaryLight, 0.1), lighten(theme.colors.primary, 0.1)];
class FoundMatchModal extends React.Component<FoundMatchModalProps> {
  static defaultProps = {
    visible: false
  };

  getCandidateImage = () => {
    const { candidate } = this.props.proposal;
    if (candidate.images && candidate.images.length) {
      return candidate.images[0].url;
    }
    return null;
  }

  getCurrentUserImage = () => {
    const { currentUser } = this.props;
    if (currentUser.images && currentUser.images.length) {
      return currentUser.images[0].url;
    }
    return null;
  }

  renderModalContent = () => {
    const { proposal, onRequestClose, onSuccess } = this.props;

    if (proposal && proposal.candidate) {
      return (
        <LinearGradient
          style={styles.container}
          colors={gradient}
        >
          <View style={styles.textContainer} flex={3}>
            <Text style={[styles.txt]}>{proposal.candidate.first_name} thinks</Text>
            {/* <LinearGradient colors={text}> */}
            <Text style={[styles.txt, styles.wonderfulTxt]}>YOU'RE WONDERFUL</Text>
            {/* </LinearGradient> */}
            <Text style={[styles.txt]}>Tell {proposal.candidate.first_name} you think they are wonderful too!</Text>
            <View style={styles.row}>
              <Avatar
                size={AvatarSize.md}
                uri={this.getCurrentUserImage()}
                circle
              />
              <Image source={Images.LogoIcon} style={{ width: 50, height: 50 }} />
              <Avatar
                size={AvatarSize.md}
                uri={this.getCandidateImage()}
                circle
              />
            </View>
          </View>
          <View flex={1}>
            <PrimaryButton
              title="Send Message"
              onPress={() => onSuccess(proposal)}
            />
            <View style={styles.spacer} />
            <OutlineButton
              title="Keep Wonder&apos;N"
              onPress={onRequestClose}
            />
          </View>
        </LinearGradient>
      );
    }
    return null;
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        {...this.props}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}

export default FoundMatchModal;

const styles = StyleSheet.create({
  spacer: { height: 10 },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1
  },
  textContainer: {
    justifyContent: 'center'
  },
  wonderfulTxt: {
    fontSize: 24
  },
  txt: {
    textAlign: 'center',
    color: '#FFF'
  },
  row: {
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
