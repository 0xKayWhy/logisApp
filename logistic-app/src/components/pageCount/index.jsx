import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Row, Col } from "react-bootstrap";

export const PageCount = ({currentPage,setCurrentPage}) => {
  const {filtered, } = useContext(UserContext);


  //load the previou pages onClick
  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage - 1 < 0) return;
    setCurrentPage((prevState) => prevState - 1);
  };

  //load the next page onClick
  const handleNext = (e) => {
    e.preventDefault();
    const maxPage = filtered[filtered.length - 1].page;
    if (currentPage + 2 > maxPage) {
      return;
    }
    setCurrentPage((prevState) => prevState + 1);
  };

  return (
    <div className="sticky__footer">
      <Row className={currentPage >= 0 ?? "collapse"}>
        <Col  xs={4} md={5} className="text-end">
          <i onClick={handlePrevious} className="bx bx-chevron-left bx-sm hover__button"></i>
        </Col>
        <Col xs={4} md={1} className="text-center align-self-start">
          {currentPage + 1}
        </Col>
        <Col  xs={4} md={5}>
          <i  onClick={handleNext} className="bx bx-chevron-right bx-sm hover__button"></i>
        </Col>
      </Row>
    </div>
  );
};
