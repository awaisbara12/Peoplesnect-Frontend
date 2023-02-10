import React, { Component } from "react";
import Link from "next/link";

class App extends Component {
  state = {
    text: this.props.state,
    website: "@Google"
  };
 

  render() {
    let texts = [];
    for (let i = 0; i < this.props.website.length; i++){  
      this.state.text.split(" ").indexOf(this.props.website[i].tagable_type == "User" ? '@'+this.props.website[i].user.first_name : '@'+this.props.website[i].page.name)!=-1?(
        this.state.text.split(" ").map(text => {
          if (this.props.website[i].tagable_type == "User" && text === '@'+this.props.website[i].user.first_name)
          {
            texts.push(<b><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{'@'+this.props.website[i].user.first_name +" "}</Link></b>)
            if(i<this.props.website.length - 1)
            {
              i++
            }
          }else if(this.props.website[i].tagable_type == "Page" && text === '@'+this.props.website[i].page.name)
          {
            texts.push(<b ><Link href={{pathname: "/page-design/liked-pages", query: this.props.website[i].page.id}}>{'@'+this.props.website[i].page.name +" "}</Link></b>)
            if(i<this.props.website.length - 1)
            {
              i++
            }
          }
          else
          {
            texts.push(text + " ")
          }
        })
      ):("")
    }
    // console.log(this.state.text.indexOf('@'+this.props.website[0].user.first_name))
    // console.log(i.user.first_name+" "+i.user.last_name)
    // if (this.state.text.indexOf(this.state.website)==0) {
    //   return (this.state.text.split(" ").map(text => {
    //     return text === "@Google" ? <b><Link href="/profile">{'@Google' +" "}</Link></b> : text + " ";
    //  })
    //   );
    // }
    return <div>{texts}</div>;
  }
}

export default App;