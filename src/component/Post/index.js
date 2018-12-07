import React from 'react';
import './style.scss';
import { Helmet } from 'react-helmet';
import LRCard from '../LRCard';

class Post extends React.Component {
  render() {
    return (
      <div className="Post">
        <Helmet
          titleTemplate="Medium-Catogory Name"
          defaultTitle="Medium-Catogory Name"
        >
          <meta name="description" content="Post Name" />
        </Helmet>
        <div class="container">
          <h1 class="main-title font-weight-600">Every Overwatch League match is coming to Freecodecamp</h1>
          <div class="profile">
            <a>
              <img src="http://placehold.it/80x80" alt="" />
            </a>
            <span>Evan Freitas</span>
            <a class="button">Follow</a>
            <br /><span class="date">Jan 9</span>
          </div>
          <div class="main-image">
            <img class="main-overwatch-image" src="http://placehold.it/700x350" alt="" />
          </div>
          <div className="content-post">
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas tffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p> <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>
            <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p> <p>Nguyen thi thu truc hom nay nghi roi kia ta tas ta sakfldjasl;dfklas][dfk fskspdjfog sfdlkjf</p>

          </div>
          <div class="profile">
            <a>
              <img src="https://image.flaticon.com/icons/svg/511/511213.svg" alt="" />
            </a>
            <span>140 claps</span>
            <i class="far fa-bookmark" data-toggle="tooltip" data-placement="bottom" title="Bookmark this story to read later"></i>
          </div>
          <hr className="divider" />
          <div class="profile">
            <a>
              <img src="http://placehold.it/80x80" alt="" />
            </a>
            <span>Evan Freitas</span>
            <a class="button">Follow</a>
          </div>
          <div className="row other-post">
              <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4">
              <LRCard position="right" />
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
