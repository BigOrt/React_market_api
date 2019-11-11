import React from "react";
// import Dashboard from './main/dashboard/';
import Marketcap from './main/marketcap/';
// import Trades from './main/trades/idax/';

class Main extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.count = React.createRef();
  // }
  
  render() {
    // console.log(this.count.current++);
    return (
     <div>
       {/* <Dashboard /> */}
      <Marketcap />
      {/* <Trades /> */}
     </div>
    );
  }
}

export default Main;
