import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';

class HomePage extends Component {
  state = {
    budgetItems: null
  }
  componentDidMount() {
    // only try loading budgetItems if the user is logged in.
    if (!this.props.user) {
      return;
    }

    axios.get('/api/budget')
      .then(res => {
        this.setState({
          budgetItems: res.data
        });
      })
      .catch(err => {
        // if we got an error, we'll just log it and set budgetItems to an empty array
        console.log(err);
        this.setState({
          budgetItems: []
        });
      });
  }
  render() {
    const { user } = this.props; // get the user prop from props
    const { budgetItems } = this.state; // get budgetItems from state

    return (
      <Fragment>
        {user && budgetItems &&
          <div>
            Welcome back, {user.username}!
          <List>
           {budgetItems.map((s, i) => <ListItem key={i} primaryText={s} />)}
          </List>
          </div>
        }
        {user && !budgetItems &&
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
