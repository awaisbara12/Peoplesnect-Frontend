import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: this.handleImage,
      },
    },
  };

  handleChange = (value) => {
    this.setState({ text: value });
    this.props.setEditorHtml(value);
  };

  handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        // Simulate an upload to a server and get the image URL
        // Replace this with your actual image upload logic
        const imageURL = 'https://example.com/image.jpg';

        const range = this.quill.getSelection(true);
        this.quill.insertEmbed(range.index, 'image', imageURL, 'user');
      }
    };
  };

  render() {
    return (
      <div>
        <ReactQuill
          value={this.props.editorHtml}
          onChange={this.handleChange}
          modules={this.modules}
          ref={(el) => (this.quill = el)} // This sets up the Quill instance reference
        />
      </div>
    );
  }
}

export default MyEditor;
