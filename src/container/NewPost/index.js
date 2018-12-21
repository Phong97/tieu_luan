import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import axios from 'axios';

var db;
var selectedcategory='';
var urlimage='';
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catogory: "INFORMATION",
      selected: 1,
      img: "",
      category: "",
      title: "",
      des: "",
      content: "",
      edit: false
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
    const id = window.location.href.split('/')[5];
    if (id) {
      axios.post('http://localhost:3001/post/load_post', { id }).then(res => {
        const data = res.data[0][0];
        if (data) {
          let img = data.img;
          // let title = data.title.replace('<p>', '');
          // title = title.replace('</p>', '');
          // let des = data.des.replace('<p>', '');
          // des = des.replace('</p>', '');
          // let content = data.content.replace('<p>', '');
          // content = content.replace('</p>', '<br />');
          let title = data.title;
          let des = data.des;
          let content = data.content;
          let category = "INFORMATION";
          let selected = 1;
          if (data.category === 1) {
            category = "INFORMATION";
            selected = 1;
          } else if (data.category === 2) {
            category = "ART";
            selected = 2;
          } if (data.category === 3) {
            category = "TECH";
            selected = 3;
          }
          this.setState({ img, title, des, content, category, selected, edit: true });
          const medium = document.getElementsByClassName('medium-editor-hidden');
          medium[0].value = title;
          medium[1].value = des;
          medium[2].value = content;
          title = data.title.replace('<p>', '');
          title = title.replace('</p>', '');
          des = data.des.replace('<p>', '');
          des = des.replace('</p>', '');
          content = data.content.replace('<p>', '');
          content = content.replace('</p>', '<br />');
          document.getElementsByClassName('editable--heading')[0].innerHTML = this.state.title;
          document.getElementsByClassName('editable--subhead')[0].innerHTML = this.state.des;
          document.getElementsByClassName('editable--content')[0].innerHTML = this.state.content;
        } else {
          alert('Post not found');
          window.location.assign('/');
        }
      })
    }
  }
  componentWillUnmount() {
    document.getElementById('new_post').remove();
  }

  handleChangeCatogory = (name, key) => {
    this.setState({ catogory: name, selected: key });
  }

  onImageChange = (event) => {
    this.setState({ img: event.target.value });
  }

  handleSave = (evt) => {
    const medium = document.getElementsByClassName('medium-editor-hidden');
    const title = medium[0].value;
    const description = medium[1].value;
    let content = medium[2].value;
    content = content.replace('<p className="">&lt;img', '<p className=""><img');
    content = content.replace('&lt;<br>', '><br>');
    const { selected, img, edit } = this.state;
    const user = localStorage.getItem('userid');
    const data = {
      title: title,
      des: description,
      content: content,
      category: selected,
      img: img
    };
    if (edit) {
      data.id = window.location.href.split('/')[5];
      console.log(data.id);
      axios.post('http://localhost:3001/post/update', data)
        .then(response => {
          alert('Update Post Successful!');
          window.location.assign('/user');
        })
        .catch(error => {
          alert('Update Post Error!')
        });
    } else {
      data.view = 0;
      data.state = 0;
      data.user = user;
      axios.post('http://localhost:3001/post/upload', data)
        .then(response => {
          alert('Create Post Successful!');
          window.location.assign('/user');
        })
        .catch(error => {
          alert('Create Post Error!')
        });
    }
  }
  handledb() {
    var request = window.indexedDB.open("PostDatabase", 6);
    // var sel = this;
    request.onerror = function (event) {
      window.alert('index DB is wrong');
    };
    // nếu thành công
    request.onsuccess = function (event) {
      console.log("running onsuccess");
      db = event.target.result;
      addPost();
    };

    request.onupgradeneeded = function (event) {
      window.alert('add data');
      var db = event.target.result;
      console.log("running onupgradeneeded");
      if (!db.objectStoreNames.contains("posts")) {
        var objectStore = db.createObjectStore("posts", { keyPath: "id" });
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("des", "des", { unique: false });
        objectStore.createIndex("content", "content", { unique: true });
        objectStore.createIndex("view", "", { unique: true });
        objectStore.createIndex("category", "category", { unique: true });
        objectStore.createIndex("user", "user", { unique: true });
        objectStore.createIndex("state", "state", { unique: true });
        objectStore.createIndex("img", "img", { unique: true });
      }
    };
    function addPost() {
      const medium = document.getElementsByClassName('medium-editor-hidden');
      const title = medium[0].value;
      const description = medium[1].value;
      const content = medium[2].value;
      const selected= selectedcategory;
      const image=urlimage;
      const user = localStorage.getItem('userid');
      const data = {
        id:"1",
        title: title,
        des: description,
        content: content,
        view : 0,
        category:  selected,
        user: user,
        state: 1,
        img: image
      };

      //Get a transaction
      //default for OS list is all, default for type is read
      var transaction = db.transaction(["posts"], "readwrite");
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
      var objectStore = transaction.objectStore("posts");
        var requestdelete=objectStore.clear();
        requestdelete.onsuccess=function(event){
            window.alert('Xoa thanh cong');
        }
        requestdelete.onerror=function(){
            window.alert('xoa that bai');
        }
        var request = objectStore.add(data);
        request.onsuccess = function (event) {
          // event.target.result === customer.ssn;
        };
        request.onerror = function (event) {
          console.log("Error", event.target.error.name);
          //some type of error handler
        }
    }
  }
  // componentDidUpdate() {
  //   const medium = document.getElementsByClassName('medium-editor-hidden');
  //   document.getElementsByClassName('editable--heading')[0].innerHTML = this.state.title;
  //   document.getElementsByClassName('editable--subhead')[0].innerHTML = this.state.des;
  //   document.getElementsByClassName('editable--content')[0].innerHTML = this.state.content;
  // }
  render() {
    const { catogory, img, title, des, content } = this.state;
    return (
      <div className="NewPost">
        <Helmet
          titleTemplate="New Post-Medium"
          defaultTitle="New Post-Medium"
        >
          <meta name="description" content="New Post-Medium" />
        </Helmet>
        <div className="grid">
          <div className="g-sm-1-1">
            <div>
              <div className="row">
                <div className="col-6">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {catogory}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <button className="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("INFORMATON", 1)}>INFORMATON</button>
                      <button className="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("ART", 2)}>ART</button>
                      <button className="dropdown-item" type="button" onClick={() => this.handleChangeCatogory("TECH", 3)}>TECH</button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <button onClick={this.handleSave} id="save-button" type="button" className="btn btn-outline-primary">Save</button>
                  <button id="save-button" type="button" className="btn btn-outline-primary" onClick={this.handledb}>Save2</button>
                </div>
              </div>
              <textarea value={title} id="title" type="text" className="editable editable--heading" data-placeholder="Title">{title}</textarea>
              <textarea type="text" className="editable editable--subhead" data-placeholder="Description">{des}</textarea>
              {img && <div><img src={img} className="img-title" alt="title" /></div>}
              <div><input value={img} onChange={this.onImageChange} type="text" id="image" placeholder="Link Title Image" /></div>
              <textarea name="" className="editable editable--content" data-placeholder="Tell your story..." id="" cols="30" rows="10">{content}</textarea>
             
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
