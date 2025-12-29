"use client";
import React from "react";

const SearchPopup = () => {
  return (
    <div>
      <div className="preloader text-white fs-6 text-uppercase overflow-hidden">
        {/* Tu peux ajouter un spinner ici si besoin */}
      </div>

      <div className="search-popup">
        <div className="search-popup-container">

          <form role="search" method="get" className="form-group" action="">
            <input
              type="search"
              id="search-form"
              className="form-control border-0 border-bottom"
              placeholder="Type and press enter"
              name="s"
            />
            <button
              type="submit"
              className="search-submit border-0 position-absolute bg-white"
              style={{ top: "15px", right: "15px" }}
            >
              <svg className="search" width="24" height="24">
                <use xlinkHref="#search" />
              </svg>
            </button>
          </form>

          <h5 className="cat-list-title">Browse Categories</h5>

          <ul className="cat-list">
            {[
              "Jackets",
              "T-shirts",
              "Handbags",
              "Accessories",
              "Cosmetics",
              "Dresses",
              "Jumpsuits",
            ].map((category) => (
              <li className="cat-list-item" key={category}>
                <a href="#" title={category}>
                  {category}
                </a>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
