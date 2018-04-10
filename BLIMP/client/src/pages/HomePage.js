import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';

class HomePage extends Component {
  state = {
    budgetItems: []
  }
  componentDidMount() {
    // only try loading budgetItems if the user is logged in.
    if (!this.props.user) {
      return;
    }

    axios.get('/api/budget')
      .then(res => {
        console.log(res.data);
        
        this.setState({
          budgetItems: {
          income: res.data.income || 0,
          rent: res.data.rent ||  0,
          food: res.data.food ||  0,
          utilities: res.data.utilities || 0,
          insurance: res.data.insurance || 0,
          results: res.data.results || 0
        }});
      })
      .catch(err => {
        // if we got an error, we'll just log it and set budgetItems to an empty array
        console.log(err);
      });
  }
  render() {
    const { user } = this.props; // get the user prop from props
    const bItems = this.state.budgetItems; // get budgetItems from state
    console.log(bItems);

    return (
      <Fragment>
        {user &&
          <div>
            Welcome back, {user.username}!
          <List>
            {bItems.map((s, i) => <ListItem key={i} primaryText={s} />)}
          </List>
          </div>
        }
        {user && !bItems &&
          <div>Hold on, looking for your budgetItems...</div>
        }
        {!user &&
          <div>Hey! I don't recognize you! Register and log in using the link above</div>
        }
      </Fragment>
    );
  }
}

// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(HomePage);
