import React from 'react'
import {DataTable, Column} from 'react-dtable'
import moment from 'moment'
import Request from 'superagent'
import _ from 'lodash'

class ApprovedReleases extends React.Component{
	
	
	constructor(props){
		super(props);	
		this.state = {data:[]};
	}
	
	componentWillMount(){
		
		Request.get('https://randomuser.me/api/?results=3').then((response)=>{
			debugger;
			this.setState({data:response.body.results});
			
		});
		

	}
	
	render(){
		
		return (
		<DataTable data={this.state.data}>
        <Column label="Username" field="login.username" />
        <Column
          label="Full Name"
          filter={filter => {
            return (
              <input
                className="form-control"
                onChange={e => {
                  const input = e.target.value;
                  filter({
                    fullName: row => {
                      const value = `${row.name.first} ${row.name.last}`;
                      return ~value.indexOf(input.trim());
                    }
                  });
                }}
              />
            );
          }}
          cell={row => (
            <span><strong>{row.name.first}</strong> {row.name.last}</span>
          )}
        />
        <Column
          field="gender"
          label="Gender"
          filter={filter => (
            <select
              name="gender"
              className="form-control"
              onChange={e => {
                const value = e.target.value;
                filter({
                  gender: row => {
                    if (value === "") return true;
                    return row.gender === value;
                  }
                });
              }}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        />
        <Column label="Email" field="email" />
        <Column label={false} cell={row => <button>Action</button>} />
      </DataTable>)
			}
}


export default ApprovedReleases