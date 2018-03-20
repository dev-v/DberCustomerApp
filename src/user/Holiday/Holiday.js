import React from 'react';
import {withNavigation} from 'react-navigation';
import Button from "../../components/Form/Button";
import Calendars from "../../components/Form/Calendars";
import Card from "../../components/Layout/Card";
import IconButton from "../../components/Icon/IconButton";
import {IconSource} from "../../components/Icon/Icon";
import Container from "../../components/Layout/Container";
import Modals from "../../components/Modal/Modals";


class Holiday extends React.Component {

  state = {
    buttonDisabled: true,
    markedDates: ['2018-01-01', '2018-02-01', '2018-02-25'],
  }

  onChange = (selectedDays, isNotChange) => {
    this.selectedDays = selectedDays;
    this.setState({buttonDisabled: isNotChange});
  }

  submit = () => {
  };

  render() {
    const {buttonDisabled, markedDates} = this.state;
    return (
        <Container>
          <Card style={{flex: 1}} title={`我的休假（${markedDates.length}/90）`}
                extra={<IconButton name='info' source={IconSource.Feather} text={'说明'} onPress={() => {
                  Modals.alert('休假期间不会进行懒惰惩罚！');
                }}/>}>
            <Calendars markedDates={markedDates} onChange={this.onChange}/>
          </Card>
          <Button disabled={buttonDisabled} onPress={this.submit}>休假提交</Button>
        </Container>
    );
  }
}

export default withNavigation(Holiday);
