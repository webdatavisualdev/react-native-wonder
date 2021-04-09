import React from "react";
import { connect } from "react-redux";
import Screen from "src/views/components/screen";
import { Text, Strong, PrimaryButton } from "src/views/components/theme";
import { Dispatch } from "redux";
import moment from "moment-timezone";
import { View, StyleSheet } from "react-native";
import WonderAppState from "src/models/wonder-app-state";
import {
  AppointmentState,
  persistAppointmentData
} from "src/store/reducers/appointment";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { createAppointment } from "src/store/sagas/appointment";
import Avatar, { AvatarSize } from "src/views/components/theme/avatar";
import { Title } from "native-base";

const mapState = (state: WonderAppState) => ({
  appointment: state.appointment
});

const mapDispatch = (dispatch: Dispatch) => ({
  onConfirm: () => dispatch(createAppointment())
});

interface AppointmentConfirmProps {
  navigation: NavigationScreenProp<any, NavigationParams>;
  appointment: AppointmentState;
  onConfirm: Function;
}

class AppointmentConfirmScreen extends React.Component<AppointmentConfirmProps> {
  onComplete = () => {
    const { onConfirm } = this.props;
    onConfirm();
  }

  renderContent = () => {
    const { appointment } = this.props;
    const { match, activity, eventAt } = appointment;
    if (match && activity && eventAt) {
      const eventMoment = moment(eventAt);

      return (
        <View flex={1}>
          <Title>{match.first_name}</Title>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Avatar size={AvatarSize.md} circle />
          </View>
          <View style={styles.body}>
            <Text style={{ fontSize: 18 }}>
              Invite {match.first_name} to have a wonderful time at <Strong>{activity.name}</Strong> at{' '}
              {eventMoment.format('MMMM Do, [at] h:mma')}
            </Text>
          </View>
          <View style={styles.footer}>
            <PrimaryButton title="Confirm Wonder" onPress={this.onComplete} />
          </View>
        </View>
      );
    }
  }
  render() {
    return (
      <Screen>
        {this.renderContent()}
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(AppointmentConfirmScreen);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20
  },
  footer: {
    marginBottom: 10,
    paddingHorizontal: 20
  }
});