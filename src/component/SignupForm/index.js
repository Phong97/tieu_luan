import React from 'react';
import './style.scss';

class SignupForm extends React.Component {
  render() {
    return (
      <div class="modal fade" id="signup-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle font-weight-600">Sign up</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div class="col-4 font-weight-600">Email</div>
                <div class="col-8">
                  <input type="text" name="email" placeholder="Email" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
