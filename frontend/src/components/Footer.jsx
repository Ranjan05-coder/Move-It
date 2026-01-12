import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container-centered">
        <div className="row">
          <div className="col-md-3">
            <h6>Move It</h6>
            <p style={{color:'#999'}}>Moving made simple — packing, loading, transport, delivery.</p>
          </div>

          <div className="col-md-3">
            <h6>Section</h6>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Section</h6>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>About</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6>Section</h6>
            <ul className="list-unstyled">
              <li>Contact</li>
              <li>Careers</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <small>© {new Date().getFullYear()} Move It</small>
        </div>
      </div>
    </footer>
  );
}
