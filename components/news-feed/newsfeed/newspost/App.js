import React, { Component } from "react";
import Link from "next/link";

class App extends Component {
  state = {
    text: this.props.state,
    website: "@Google"
  };
 

  render() {
    // let texts = [];
    // for (let i = 0; i < this.props.website.length; i++){  
    //   this.state.text.split(" ").indexOf(this.props.website[i].tagable_type == "User" ? '@'+this.props.website[i].user.first_name : '@'+this.props.website[i].page.name)!=-1?(
    //     this.state.text.split(" ").map(text => {
    //       if (this.props.website[i].tagable_type == "User" && text === '@'+this.props.website[i].user.first_name)
    //       {
    //         texts.push(<b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{'@'+this.props.website[i].user.first_name +" "}</Link></b>)
    //         if(i<this.props.website.length - 1)
    //         {
    //           i++
    //         }
    //       }else if(this.props.website[i].tagable_type == "Page" && text === '@'+this.props.website[i].page.name)
    //       {
    //         texts.push(<b className="text-indigo-400"><Link href={{pathname: "/page-design/liked-pages", query: this.props.website[i].page.id}}>{'@'+this.props.website[i].page.name +" "}</Link></b>)
    //         if(i<this.props.website.length - 1)
    //         {
    //           i++
    //         }
    //       }
    //       else
    //       {
    //         texts.push(text + " ")
    //       }
    //     })
    //   ):("")
    // }
    // if(this.props.hashtags){
    //   let co =0
    //   for (let i = 0; i < this.props.hashtags.length; i++){
    //     if  (texts.length>0){
    //       texts.map(t =>{
    //         if (texts[co]==this.props.hashtags[i].hashtag.data.attributes.name+" ")
    //         {
    //           texts[co]=<b className="text-indigo-400"><Link href={{pathname: "/hashtag-design/hashtags-show", query: this.props.hashtags[i].hashtag.data.attributes.id}}>{this.props.hashtags[i].hashtag.data.attributes.name+" "}</Link></b>
    //           if(i<this.props.hashtags.length - 1)
    //           {
    //             i++
    //           }
              
    //         }
            
    //         co++
    //         })
            
    //     }else{
    //       this.state.text.split(" ").map(text => {
    //         if (text === this.props.hashtags[i].hashtag.data.attributes.name)
    //         {
    //           texts.push(<b className="text-indigo-400"><Link href={{pathname: "/hashtag-design/hashtags-show", query: this.props.hashtags[i].hashtag.data.attributes.id}}>{this.props.hashtags[i].hashtag.data.attributes.name+ " "}</Link></b>)
    //           if(i<this.props.hashtags.length - 1)
    //           {
    //             i++
    //           }
    //         }
    //         else
    //         {
    //           texts.push(text + " ")
    //         }
    //         console.log("texts tg",text)
           
    //       })
    //     } 
    //   }
    // }

    let texts = [];
    this.state.text.split(" ").map(text => {
      texts.push(text + " ")
    })
    for (let i = 0; i < this.props.website.length; i++){
      for (let j=0; j< texts.length ; j++){
        if (this.props.website[i].tagable_type == "User" && texts[j] === '@'+this.props.website[i].user.first_name+" ")
        {
          texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{'@'+this.props.website[i].user.first_name +" "}</Link></b>
          // texts[j+1]=<b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{this.props.website[i].user.last_name +" "}</Link></b>

        }else if(this.props.website[i].tagable_type == "Page" && texts[j] === '@'+this.props.website[i].page.name+" ")
        {
          texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/page-design/liked-pages", query: this.props.website[i].page.id}}>{'@'+this.props.website[i].page.name +" "}</Link></b>
        }
      }
    }
    if(this.props.hashtags){
      for (let i = 0; i < this.props.hashtags.length; i++){
        for (let j=0; j< texts.length ; j++){
          if (texts[j]==this.props.hashtags[i].hashtag.data.attributes.name+" ")
          {
            texts[j]=<u><i className="text-indigo-400"><Link href={{pathname: "/hashtag-design/hashtags-show", query: this.props.hashtags[i].hashtag.data.attributes.id}}>{this.props.hashtags[i].hashtag.data.attributes.name+" "}</Link></i></u>
          }
        }
      }
    }


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