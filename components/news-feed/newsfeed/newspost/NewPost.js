import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import { SEARCH_MULTIPLE } from '../../../../pages/config';
const Draft = require('draft-js');

let mentions = [];
let a = [];

const mention = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  // const [mention,setmention] = useState([]);
  fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'friends', {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        let awa = [];

        for (let i = 0; i < result.data.length; i++) {
          awa[i] = {
            name: '@' + result.data[i].first_name + " " + result.data[i].last_name,
            link: 'Friends-Profile?' + result.data[i].id,
            avatar: result.data[i].display_photo_url,
            id: result.data[i].id,
            type: 'User'
          }
        }
        a = awa;
      }
    })
    .catch((err) => console.log(err));
};

const mentionpages = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  // const [mention,setmention] = useState([]);
  fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'pages', {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        let awa = [];

        for (let i = 0; i < result.data.length; i++) {
          awa[i] = {
            name: '@' + result.data[i].name,
            link: 'Liked-Pages?' + result.data[i].id,
            avatar: result.data[i].display_photo_url,
            id: result.data[i].id,
            type: 'Page'
          }
        }
        mentions = [...a, ...awa]
        // console.log(mentions);
      }
    })
    .catch((err) => console.log(err));
};

export default class SimpleMentionEditor extends Component {

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      positionSuggestions: (settings) => {
        return {
          left: settings.decoratorRect.left + 'px',
          bottom: settings.decoratorRect.bottom - 120 + 'px',
          display: 'block',
          transform: 'scale(1) translateY(-100%)',
          transformOrigin: '1em 0% 0px',
          transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)'
        };
      }
    });
  }

  state = {
    editorState: Draft.EditorState.createWithContent(emptyContentState),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });

    mention();
    mentionpages();
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (this.props.results == 0) {
      this.props.setPostText(raw.blocks[0].text);
    }
    else {
      console.log(raw.blocks[0].text);
      this.setState({
        editorState: Draft.EditorState.createWithContent(emptyContentState)
      });
      this.props.setresults(0);
    }
    console.log(raw.blocks[0].text);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention);
      }
    }
    this.props.settags(mentionedUsers);
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    const styles = {
      root: {
        cursor: 'text',
        padding: 16,
        width: "100%",
        marginBottom: '2em',
        color: 'gray'
      }
    }

    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <>
        <div onClick={this.focus} style={styles.root}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            value={this.props.PostText}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
            className="w-full pt-0 resize-none border-0 px-0 text-base overflow-y-hidden outline-none focus:outline focus:ring-0"
            placeholder="Start a post?"
          />
          <div style={{ visibility: this.state.suggestions.length ? 'visible' : 'visible' }}>
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={this.state.suggestions}
              onAddMention={this.onAddMention}
            />
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render;

const emptyContentState = Draft.convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});