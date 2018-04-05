import React from 'react';


const Budget = (props) => { 
    
    
    return (
        <div>
<h1>Hello World!</h1>
        <div className="container-fluid center-meh-boi">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-1">
                    <div className="box-of-stuff">
                        <form>
                            <input className="form-control input-lg" type="text" id="income" placeholder="Monthly Income" />
                            <input className="form-control input-lg" type="text" id="rent" placeholder="Rent" />
                            <input className="form-control input-lg" type="text" id="food" placeholder="Food" />
                            <input className="form-control input-lg" type="text" id="utilities" placeholder="Utilities" />
                            <input className="form-control input-lg" type="text" id="insurance" placeholder="Insurance" />
                        </form>
                        <button type="button" id="submit" className="btn btn-outline-secondary btn-lg">Submit</button>
                        
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
export default Budget;
