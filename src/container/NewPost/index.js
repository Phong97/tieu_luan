import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';

class NewPost extends React.PureComponent {
  componentDidMount() {
    const str = `var editor = new MediumEditor('.editable', {
      toolbar: {
          /* These are the default options for the toolbar,
             if nothing is passed this is what is used */
          allowMultiParagraphSelection: true,
          buttons: ['bold', 'italic', 'underline', 'orderedlist', 'anchor', 'quote'],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          align: 'center',
          sticky: false,
          updateOnEmptySelection: false
      }
  });`;
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = str;
    script.id = 'new_post';
    document.body.appendChild(script);
  }
  componentWillUnmount (){
    document.getElementById('new_post').remove();
  }

  render() {
    return (
      <div className="NewPost">
        <div class="grid">
          <div class="g-sm-1-1">
            <div class="">
              <textarea type="text" class="editable editable--heading" data-placeholder="Title"></textarea>
              <textarea type="text" class="editable editable--subhead" data-placeholder="Description"></textarea>
              <textarea name="" class="editable editable--content" data-placeholder="Tell your story..." id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
