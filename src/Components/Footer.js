import React from 'react'
import image2 from './VintageColorfulRetroVibesTypographicProductBrandLogo.png'
const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5">
  <div className="container">
    <div className="row">
      {/* Logo and Address */}
      <div className="col-md-4 mb-4">
        <div className="mb-3 d-flex align-items-center">
          <img src={image2} alt="Logo" width="40" height="40" className="me-2" style={{borderRadius:'25px'}} />
          <div >
            <h5 className="mb-0">Groovo </h5>
          </div>
        </div>
        <p>Ernakulam South,<br />DE 19958, Kochi Kerala</p>
      </div>

      {/* Company Links */}
      <div className="col-md-4 mb-4">
        <h5>Company</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-decoration-none text-danger">About Us</a></li>
          <li><a href="#" className="text-decoration-none text-danger">Services</a></li>
          <li><a href="#" className="text-decoration-none text-danger">Blog</a></li>
          <li><a href="#" className="text-decoration-none text-danger">Contact Us</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="col-md-4 mb-4">
        <h5>Newsletter</h5>
        <p>Signup to our newsletter to get new information, promotion and insight for free.</p>
        <input type="email" className="form-control mb-2" placeholder="Enter your email" />
        <button className="btn btn-secondary w-100">
          <i className="bi bi-envelope me-2"></i> Sign Up
        </button>
      </div>
    </div>

    <hr />

    <div className="d-flex justify-content-between flex-wrap small">
      <div>
        <a href="#" className="text-danger text-decoration-none me-3">Term of Use</a>
        <a href="#" className="text-danger text-decoration-none">Privacy policy</a>
      </div>
      <div className="text-muted">
        Copyright © 2023 Groovo, All rights reserved.
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer
