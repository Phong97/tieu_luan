import React from 'react';
import './style.scss';

class SignupForm extends React.Component {
  render() {
    return (
      <div className="modal fade" id="signup-form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle font-weight-600">Sign up</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4 font-weight-600">Email</div>
                <div className="col-8">
                  <input type="text" name="email" placeholder="Email" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
