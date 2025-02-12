import React, { useEffect, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import Image from "next/image";


const HashtagMentionInput = (props) => {
//     const [value, setValue] = useState("");
  //   const [selectedHashtags, setSelectedHashtags] = useState([]);
  // const [selectedMentions, setSelectedMentions] = useState([]);

  // const hashtag = [
  //   { id: 1, display: "#hashtag1" },
  //   { id: 2, display: "#hashtag2" },
  //   { id: 3, display: "#hashtag3" }
  // ];

  // const handleHashtagAdd = mention => {
  //   setSelectedHashtags([...selectedHashtags, mention.id]);
  // };

  // const handleMentionAdd = mention => {
  //   setSelectedMentions([...selectedMentions, mention.id]);
  // };
const [value, setValue] = useState(props.postText);
const [hashtags, setHashtags] = useState([]);
const [mentions, setMentions] = useState([]);


  const handleChange = event => {
    setValue(event.target.value);
    // console.log(event.target.value.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    props.setPostText(event.target.value);
    // const hashtagsArray = [];
    const mentionsArray = [];

    // const regex = /@\[.+?\]\(.+?\)/g;
    // const matches = event.target.value.match(regex);
    // const words = matches ? matches.map(match => match.trim()) : [];

    const regex = /@\[.+?\]\((.+?)\)/g;
    const words = [];
    let match;
    while ((match = regex.exec(event.target.value))) {
      words.push(match[1]);
    }


    // const words = event.target.value.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1");
    // words.forEach(word => {
    //   if (word.startsWith("#")) {
    //     hashtagsArray.push(word);
    //   } else if (word.startsWith("@")) {
    //     mentionsArray.push(word);
    //   }
    // });
    // console.log(words);

    // setHashtags(hashtagsArray);
    props.settags(words);
    // console.log(mentionsArray);
    // console.log(event.target.value);
    setMentions(words);
  };
  const renderHashtagSuggestion = (suggestion, search, highlightedDisplay) => (
    <div className="flex items-center mt-2 px-2 border-b">
      {/* <img src={suggestion.avatar} alt={suggestion.display} /> */}
      <span><b>{highlightedDisplay}</b></span>
    </div>
  );
  const renderMentionSuggestion = (suggestion, search, highlightedDisplay) => (
    <div className="flex gap-1 items-center mt-2 px-2 border-b pb-2">
      {suggestion && suggestion.avatar?(
        <img src={suggestion.avatar} className="w-7 h-7 rounded-full" />
      ):(
        <Image 
            src={ProfileAvatar} 
            width={28} 
            height={28} 
            alt="" />)}
      <span><b>{highlightedDisplay}</b></span>
    </div>
  );

  // console.log(hashtags);
  // console.log(mentions);

  return (
    <div>
      <MentionsInput 
      // className="w-{100%} mention-input resize-none border- text-base overflow-y-hidden outline-none focus:none focus:ring-0 m-6 "
      className="w-{100%} p-3 m-4"
      value={props.postText} onChange={handleChange}
      placeholder={"Your Comment"}
      allowSpaceInQuery={true}
      autoFocus={false}
    >
        <Mention
          trigger="#"
          data={props.hastags}
          markup="#[__display__]"
          renderSuggestion={renderHashtagSuggestion}
        />
        <Mention
          trigger="@"
          data={props.mentioned} 
          markup="@[__display__](__id__)"
          renderSuggestion={renderMentionSuggestion}
        />
      </MentionsInput>
     
    </div>
  );
};

export default HashtagMentionInput;
