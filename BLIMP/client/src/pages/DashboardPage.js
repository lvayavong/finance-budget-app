import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { List, ListItem } from 'material-ui/List';
import { withUser } from '../services/withUser';

class DashboardPage extends Component {
    state = {
        budgetItems: null,
        fetchedBudget: false
    }
    componentDidMount() {
        // only try loading budgetItems if the user is logged in.
        if (!this.props.user) {
            return;
        }
        this.loadUser();
    }

    loadUser = () => {
        axios.get(`/api/budget/${this.props.user.id}`)
            .then(res => {
                let budgetItems = res.data;
                budgetItems.results = res.data.income - res.data.rent - res.data.utilities - res.data.food - res.data.insurance;
                this.setState({ budgetItems, fetchedBudget: true });
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        axios.post('/api/budget', { id: this.props.user.id, budgetItems: this.state })
            .then(res => this.loadUser())
            .catch(err => console.log(err));
    };

    render() {
        const { user } = this.props; // get the user prop from props

        return (
            <Fragment>
                {user ? <div>Welcome back, {user.username}!</div> : <div>Hey! I don't recognize you! Register and log in using the link above</div>
                }
                {user && !this.state.fetchedBudget
                    && <div>Hold on, looking for your budgetItems...</div>
                }

                <div className="container-fluid center-meh-boi">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-1">
                            <div className="box-of-stuff">
                                <form onSubmit={this.handleFormSubmit}>
                                    <input className="form-control input-lg" type="text" id="income" placeholder="Monthly Income" onChange={this.handleInputChange} name="income" />
                                    <input className="form-control input-lg" type="text" id="rent" placeholder="Rent" onChange={this.handleInputChange} name="rent" />
                                    <input className="form-control input-lg" type="text" id="food" placeholder="Food" onChange={this.handleInputChange} name="food" />
                                    <input className="form-control input-lg" type="text" id="utilities" placeholder="Utilities" onChange={this.handleInputChange} name="utilities" />
                                    <input className="form-control input-lg" type="text" id="insurance" placeholder="Insurance" onChange={this.handleInputChange} name="insurance" />
                                    <button type="submit" id="submit" className="btn btn-outline-secondary btn-lg">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="results">
                                <h1 className="title">Results</h1>
                                <span className="emoji">
                                </span>
                                <div id="results" className="results-data">
                                    {user && this.state.budgetItems
                                        && <List>
                                            <ListItem key="income" primaryText="Income: " secondaryText={this.state.budgetItems.income} />
                                            <ListItem key="rent" primaryText="Rent: " secondaryText={this.state.budgetItems.rent} />
                                            <ListItem key="food" primaryText="Food: " secondaryText={this.state.budgetItems.food} />
                                            <ListItem key="utilities" primaryText="Utilities: " secondaryText={this.state.budgetItems.utilities} />
                                            <ListItem key="insurance" primaryText="Insurance: " secondaryText={this.state.budgetItems.insurance} />
                                            <ListItem key="results" primaryText="Results: " secondaryText={this.state.budgetItems.results} />
                                        </List>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
export default withUser(DashboardPage);