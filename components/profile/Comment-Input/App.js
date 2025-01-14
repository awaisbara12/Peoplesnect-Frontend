import React, { Component, useState } from "react";
import Link from "next/link";


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0,50) : text}
      {text.length > 50?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "....Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

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
    this.props.state && this.props.state.split(" ").map(text => {
      texts.push(text + " ")
    })
    // console.log(this.props.state);
    // console.log(this.props.website);
    for (let i = 0; i < this.props.website.length; i++){
      for (let j=0; j< texts.length ; j++){
        if (this.props.website[i].tagable_type == "User")
        {
          // texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{'@'+this.props.website[i].user.first_name +" "+this.props.website[i].user.last_name}</Link></b>
          // texts[j+1]=<b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{this.props.website[i].user.last_name +" "}</Link></b>
          // texts[j+1]=" "

          let abc = [];
          let k;
          let fnln=this.props.website[i].user.first_name+" "+this.props.website[i].user.last_name ;
          let name=fnln.match(/\S+/g) || [];
          name.map(a => {
            abc.push(a + " ")
          })
          // console.log("page",abc);
          if(texts[j]  === '@'+abc[0]){
            for(k=1; k<abc.length; k++){
              if(texts[j+k]  != abc[k]){
                break;
              }
            }
          }
          if(k == abc.length){
            for(k=1; k<abc.length; k++){
              texts[j+k]  = "";
            }
            texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/User-Profile", query: this.props.website[i].user.id}}>{'@'+this.props.website[i].user.first_name +" "+this.props.website[i].user.last_name+" "}</Link></b>
          }

        }else if(this.props.website[i].tagable_type == "Page")
        {
          let abcd = [];
          let p;
          let page= this.props.website[i].page.name.match(/\S+/g) || [];
          page.map(a => {
            // console.log("aaaaa",a);
            abcd.push(a + " ")
          })
          // console.log("page",abcd);
          if(texts[j]  === '@'+abcd[0]){
            for(p=1; p<abcd.length; p++){
              // console.log("texts[j+p]",texts[j+p]);
              // console.log("abcd[p]",abcd[p]);
              if(texts[j+p]  != abcd[p]){
                break;
              }
            }
          }
          if(p == abcd.length){
            // console.log("<atch>",p);
            for(p=1; p<abcd.length; p++){
              texts[j+p]  = "";
            }
            texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/page-design/liked-pages", query: this.props.website[i].page.id}}>{'@'+this.props.website[i].page.name +" "}</Link></b>
          }
        }
        // else if(this.props.website[i].tagable_type == "Page" && texts[j]+texts[j+1] === '@'+this.props.website[i].page.name+" ")
        // {
        //   texts[j]= <b className="text-indigo-400"><Link href={{pathname: "/page-design/liked-pages", query: this.props.website[i].page.id}}>{'@'+this.props.website[i].page.name +" "}</Link></b>
        //   texts[j+1]=" "
        // }
      }
    }
    if(this.props.hashtags){
      for (let i = 0; i < this.props.hashtags.length; i++){
        for (let j=0; j< texts.length ; j++){
          if (this.props.hashtags[i].hashtag.data && texts[j]==this.props.hashtags[i].hashtag.data.attributes.name+" ")
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
    return <div>
      <ReadMore>{texts}</ReadMore>
      </div>;
  }
}

export default App;