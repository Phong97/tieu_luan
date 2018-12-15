import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';

// list of items
// const list = [
//   { id: 0, name: 'item1', selected: true, key: 'catogory' },
//   { id: 1, name: 'item2', selected: false, key: 'catogory' },
//   { id: 2, name: 'item3', selected: false, key: 'catogory' },
//   { id: 3, name: 'item4', selected: false, key: 'catogory' },
//   { id: 4, name: 'item5', selected: false, key: 'catogory' },
//   { id: 5, name: 'item6', selected: false, key: 'catogory' },
//   { id: 6, name: 'item7', selected: false, key: 'catogory' },
//   { id: 7, name: 'item8', selected: false, key: 'catogory' },
//   { id: 8, name: 'item9', selected: false, key: 'catogory' }
// ];

class NewPost extends React.PureComponent {
  state = {
    catogory: "item1",
    selected: 1
  }
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
  componentWillUnmount() {
    document.getElementById('new_post').remove();
  }
  handleChangeCatogory = (name, key) => {
    this.setState({ catogory: name, selected: key });
  }

  render() {
    const { catogory } = this.state;
    return (
      <div className="NewPost">
        <Helmet
          titleTemplate="New Post-Medium"
          defaultTitle="New Post-Medium"
        >
          <meta name="description" content="New Post-Medium" />
        </Helmet>
        <div class="grid">
          <div class="g-sm-1-1">
            <div>
              <div className="row">
                <div className="col-6">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {catogory}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("item 1", 1)}>item 1</button>
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("item 2", 2)}>item 2</button>
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("item 3", 3)}>item 3</button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <button id="save-button" type="button" class="btn btn-outline-primary">Save</button>
                </div>
              </div>
              <textarea type="text" class="editable editable--heading" data-placeholder="Title"></textarea>
              <textarea type="text" class="editable editable--subhead" data-placeholder="Description"></textarea>
              <input id="image" type="file" />
              <textarea name="" class="editable editable--content" data-placeholder="Tell your story..." id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
