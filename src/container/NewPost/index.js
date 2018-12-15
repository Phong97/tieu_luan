import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import axios from 'axios';

var db;
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];
class NewPost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      catogory: "INFORMATION",
      selected: 1,
      image: ""
    }

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

  onImageChange = (event) => {
    this.setState({image:event.target.value});
  }

  handleSave = (evt) => {
    const medium = document.getElementsByClassName('medium-editor-hidden');
    const title = medium[0].value;
    const description = medium[1].value;
    const content = medium[2].value;
    const { selected, image } = this.state;
    const user = localStorage.getItem('userid');
    const data = {
      title: title,
      des: description,
      content: content,
      view : 0,
      category:  selected,
      user: user,
      state: 1,
      img: image
    };

    axios.post('http://localhost:3001/post/upload', data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handledb() {
    var request = window.indexedDB.open("MyTestDatabase", 6);
    // var sel = this;
    request.onerror = function (event) {
      window.alert('index DB is wrong');
    };
    // nếu thành công
    request.onsuccess = function (event) {
      console.log("running onsuccess");
      db = event.target.result;
      addPerson();
    };

    request.onupgradeneeded = function (event) {
      window.alert('add data');
      var db = event.target.result;
      console.log("running onupgradeneeded");
      if (!db.objectStoreNames.contains("customers")) {
        var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
      }
    };
    function addPerson() {
      //Get a transaction
      //default for OS list is all, default for type is read
      var transaction = db.transaction(["customers"], "readwrite");
      transaction.oncomplete = function (event) {
        console.log("All done!");
        navigator.serviceWorker.ready
          .then(registration => {
            registration.sync.register('submit').then(() => {
              console.log('sync registered')
            });
          });
      };

      transaction.onerror = function (event) {
        // Don't forget to handle errors!
      };
      //Ask for the objectStore
      var objectStore = transaction.objectStore("customers");
      customerData.forEach(function (customer) {
        var request = objectStore.add(customer);
        request.onsuccess = function (event) {
          // event.target.result === customer.ssn;
        };
        request.onerror = function (event) {
          console.log("Error", event.target.error.name);
          //some type of error handler
        }
      })
    }
  }

  render() {
    const { catogory, image } = this.state;
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
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("INFORMATON", 1)}>INFORMATON</button>
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("ART", 2)}>ART</button>
                      <button class="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("TECH", 3)}>TECH</button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <button onClick={this.handleSave} id="save-button" type="button" class="btn btn-outline-primary">Save</button>
                </div>
              </div>
              <textarea type="text" class="editable editable--heading" data-placeholder="Title"></textarea>
              <textarea type="text" class="editable editable--subhead" data-placeholder="Description"></textarea>
              {image && <div><img src={image} className="img-title" alt="title"/></div>}
              <div><input onChange={this.onImageChange}  type="text" id="image" placeholder="Link Title Image"/></div>
              <textarea name="" class="editable editable--content" data-placeholder="Tell your story..." id="" cols="30" rows="10"></textarea>
              {/* <button id="save-button" type="button" class="btn btn-outline-primary" onClick={this.handledb}>Save2</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
