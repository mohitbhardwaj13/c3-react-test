import React, { Component } from "react";

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
  }

  componentDidMount(){
    // fetch users from the api endpoint for showing in the listing
    fetch('https://reqres.in/api/users?page=1&per_page=10')
    .then( response => response.json() )
    .then( data => {
      const curUsersList = this.state.users;
      // append received users to the existing users' list
      const updatedUsersList = [...curUsersList, ...data.data];
      const uniqueUsersList = this.removeDuplicates( updatedUsersList );

      // update users' list in the state
      this.setState({
        users: uniqueUsersList
      });
    }).catch( err => {
      console.error( err );
    });
  }//componentDidMount()

  render() {
    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <ul id="users-listing">
          {this.state.users.map( (user, index) => {
            return (
              <li key={user.id}>
                <img src={user.avatar} alt={user.first_name + ' ' + user.last_name} width="80" height="80" />
                <label>{user.first_name + ' ' + user.last_name}</label>
                <p>{user.id}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }//render()

  removeDuplicates( users ){
    // this function removes duplicates users from given users' list
    // duplicates are counted based on id being same

    const idsArray =[];
    const uniqueUsersList = [];
    users.forEach( user => {
      const curId = user.id

      // pushed to unique users' list if this name wasn't encountered before
      if( ! idsArray.includes( curId ) ){
        idsArray.push( curId );
        uniqueUsersList.push( user );
      }
    });//forEach()
    return uniqueUsersList;
  }//removeDuplicates()
}
