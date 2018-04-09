import React from 'react';
import "./style.css";
import axios from 'axios';


class Budget extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
    [name]: value
})
console.log(this.state);

    }

    handleSubmit(event) {
       const results = this.state.income - this.state.rent - this.state.utilities - this.state.food - this.state.insurance
        this.setState({
            result:results
        })
        event.preventDefault();
        console.log(results);
        axios.post(`localhost:3000/budget`, { results })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    
   
    
    render() {
    return (
        <div>
<h1>Hello World!</h1>
        <div className="container-fluid center-meh-boi">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-1">
                    <div className="box-of-stuff">
                         <form onSubmit={this.handleSubmit}>
                                <input className="form-control input-lg" type="text" id="income" placeholder="Monthly Income"  onChange={this.handleChange} name = "income" />
                                <input className="form-control input-lg" type="text" id="rent" placeholder="Rent"  onChange={this.handleChange} name = "rent" />
                                <input className="form-control input-lg" type="text" id="food" placeholder="Food"  onChange={this.handleChange} name = "food" />
                                <input className="form-control input-lg" type="text" id="utilities" placeholder="Utilities"  onChange={this.handleChange} name = "utilities" />
                                <input className="form-control input-lg" type="text" id="insurance" placeholder="Insurance"  onChange={this.handleChange} name = "insurance" />
                                <button type="submit" id="submit" className="btn btn-outline-secondary btn-lg">Submit</button>
                        </form>
                       
                            <button data-balloon="Whats up!" data-balloon-pos="up">Hover me!</button>
                        
      </div>
                </div>
                <div className="col-sm-4">
                    <div className="results">
                        <h1 className="title">Results</h1>
                        <span className="emoji">
                        </span>
                        <div id="results" className="results-data">
                            <p>Hit the submit button to see your results!</p>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

    )
}
}
export default Budget;
