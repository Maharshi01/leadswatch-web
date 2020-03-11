// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import "../Pagination/Pagination.css";
// import { log } from "util";

// const PaginationName = props => {
//   const [num, setNum] = useState(props.num ? props.num : [1]);
//   const [prev, setPrev] = useState(null);
//   const [next, setNext] = useState(2);
//   // const [styles,setStyles]=useState("DefaultColor")
//   const [start, setStart] = useState(0);
//   const [last, setLast] = useState(0);
//   useEffect(() => {
//     if (props.total > 0) setStart(1);
//     else setStart(0);
//     if (props.totalPages > 1) setLast(1 * props.limit);
//     else setLast(props.total);
//   }, [props.total, props.limit, props.totalPages]);
//   useEffect(() => {
//     setNum(props.num);
//   }, [props.num]);

//   return (
//     <div>
//       <Row>
//         <Col lg={6} xl={6}>
//         <div className="pagination_text">
//           <p>
//             Showing {start} to {last} of {props.total} entries
//           </p>
//           </div>
//         </Col>
//         <Col lg={6} xl={6}>
//           <Pagination
//             aria-label="Page navigation example"
//             style={{ float: "right" }}
//           >
//             {/* <PaginationItem disabled>
//                         <PaginationLink first href="#" />
//                         </PaginationItem> */}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   // ////console.log("prev",props.prev)

//                   props.prev != null && props.prev !== undefined
//                     ? props.getPublishersList(props.limit, props.prev)
//                     : //console.log(prev);
//                   if (props.prev != null && props.prev !== undefined) {
//                     setStart((props.prev - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.prev == 1)
//                       setLast(1 * props.limit);
//                     else if (props.prev == props.totalPages) {
//                       let count = props.prev * props.limit - props.total;
//                       setLast(props.prev * props.limit - count);
//                     } else setLast(props.prev * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Previous
//               </PaginationLink>
//             </PaginationItem>

//             {num.map(ele => (
//               <PaginationItem active={ele===props.currentPage}>
//                 <PaginationLink
//                   onClick={() => {
//                     props.getPublishersList(props.limit, ele);
//                     setStart((ele - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && ele == 1)
//                       setLast(1 * props.limit);
//                     else if (ele == props.totalPages) {
//                       let count = ele * props.limit - props.total;
//                       setLast(ele * props.limit - count);
//                     } else setLast(ele * props.limit);
//                   }}
//                   href="#"
//                 >
//                   {ele}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   //////console.log("next",props.next)

//                   props.next != null && props.next !== undefined
//                     ? props.getPublishersList(props.limit, props.next)
//                     : //console.log(next);
//                   if (props.next != null && props.next !== undefined) {
//                     setStart((props.next - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.next == 1)
//                       setLast(1 * props.limit);
//                     else if (props.next == props.totalPages) {
//                       let count = props.next * props.limit - props.total;
//                       setLast(props.next * props.limit - count);
//                     } else setLast(props.next * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Next
//               </PaginationLink>
//             </PaginationItem>

//             {/* <PaginationItem>
//                         <PaginationLink last href="#" />
//                         </PaginationItem> */}
//           </Pagination>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PaginationName;
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import "../Pagination/Pagination.css";
// import { log } from "util";

// const PaginationName = props => {
//   const [num, setNum] = useState(props.num ? props.num : [1]);
//   const [prev, setPrev] = useState(null);
//   const [next, setNext] = useState(2);
//   // const [styles,setStyles]=useState("DefaultColor")
//   const [start, setStart] = useState(0);
//   const [last, setLast] = useState(0);
//   useEffect(() => {
//     if (props.total > 0) setStart(1);
//     else setStart(0);
//     if (props.totalPages > 1) setLast(1 * props.limit);
//     else setLast(props.total);
//   }, [props.total, props.limit, props.totalPages]);
//   useEffect(() => {
//     setNum(props.num);
//   }, [props.num]);

//   return (
//     <div>
//       <Row>
//         <Col lg={6} xl={6}>
//         <div className="pagination_text">
//           <p>
//             Showing {start} to {last} of {props.total} entries
//           </p>
//           </div>
//         </Col>
//         <Col lg={6} xl={6}>
//           <Pagination
//             aria-label="Page navigation example"
//             style={{ float: "right" }}
//           >
//             {/* <PaginationItem disabled>
//                         <PaginationLink first href="#" />
//                         </PaginationItem> */}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   // ////console.log("prev",props.prev)

//                   props.prev != null && props.prev !== undefined
//                     ? props.getPublishersList(props.limit, props.prev)
//                     : //console.log(prev);
//                   if (props.prev != null && props.prev !== undefined) {
//                     setStart((props.prev - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.prev == 1)
//                       setLast(1 * props.limit);
//                     else if (props.prev == props.totalPages) {
//                       let count = props.prev * props.limit - props.total;
//                       setLast(props.prev * props.limit - count);
//                     } else setLast(props.prev * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Previous
//               </PaginationLink>
//             </PaginationItem>

//             {num.map(ele => (
//               <PaginationItem active={ele===props.currentPage}>
//                 <PaginationLink
//                   onClick={() => {
//                     props.getPublishersList(props.limit, ele);
//                     setStart((ele - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && ele == 1)
//                       setLast(1 * props.limit);
//                     else if (ele == props.totalPages) {
//                       let count = ele * props.limit - props.total;
//                       setLast(ele * props.limit - count);
//                     } else setLast(ele * props.limit);
//                   }}
//                   href="#"
//                 >
//                   {ele}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   //////console.log("next",props.next)

//                   props.next != null && props.next !== undefined
//                     ? props.getPublishersList(props.limit, props.next)
//                     : //console.log(next);
//                   if (props.next != null && props.next !== undefined) {
//                     setStart((props.next - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.next == 1)
//                       setLast(1 * props.limit);
//                     else if (props.next == props.totalPages) {
//                       let count = props.next * props.limit - props.total;
//                       setLast(props.next * props.limit - count);
//                     } else setLast(props.next * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Next
//               </PaginationLink>
//             </PaginationItem>

//             {/* <PaginationItem>
//                         <PaginationLink last href="#" />
//                         </PaginationItem> */}
//           </Pagination>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PaginationName;

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "reactstrap";
// import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import "../Pagination/Pagination.css";
// import { log } from "util";

// const PaginationName = props => {
//   const [num, setNum] = useState(props.num ? props.num : [1]);
//   const [prev, setPrev] = useState(null);
//   const [next, setNext] = useState(2);
//   // const [styles,setStyles]=useState("DefaultColor")
//   const [start, setStart] = useState(0);
//   const [last, setLast] = useState(0);
//   useEffect(() => {
//     if (props.total > 0) setStart(1);
//     else setStart(0);
//     if (props.totalPages > 1) setLast(1 * props.limit);
//     else setLast(props.total);
//   }, [props.total, props.limit, props.totalPages]);
//   useEffect(() => {
//     setNum(props.num);
//   }, [props.num]);

//   return (
//     <div>
//       <Row>
//         <Col lg={6} xl={6}>
//           <div className="pagination_text">
//             <p>
//               Showing {start} to {last} of {props.total} entries
//             </p>
//           </div>
//         </Col>
//         <Col lg={6} xl={6}>
//           <Pagination
//             aria-label="Page navigation example"
//             style={{ float: "right" }}
//           >
//             {/* <PaginationItem disabled>
//                         <PaginationLink first href="#" />
//                         </PaginationItem> */}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   // ////console.log("prev",props.prev)

//                   props.prev != null && props.prev !== undefined
//                     ? props.getPublishersList(props.limit, props.prev)
//                     : //console.log(prev);
//                   if (props.prev != null && props.prev !== undefined) {
//                     setStart((props.prev - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.prev == 1)
//                       setLast(1 * props.limit);
//                     else if (props.prev == props.totalPages) {
//                       let count = props.prev * props.limit - props.total;
//                       setLast(props.prev * props.limit - count);
//                     } else setLast(props.prev * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Previous
//               </PaginationLink>
//             </PaginationItem>
//             {num.map(ele => (
//               <PaginationItem active={true}>
//                 <PaginationLink
//                   onClick={() => {
//                     props.getPublishersList(props.limit, ele);
//                     setStart((ele - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && ele == 1)
//                       setLast(1 * props.limit);
//                     else if (ele == props.totalPages) {
//                       let count = ele * props.limit - props.total;
//                       setLast(ele * props.limit - count);
//                     } else setLast(ele * props.limit);
//                   }}
//                   href="#"
//                 >
//                   {ele}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => {
//                   //////console.log("next",props.next)

//                   props.next != null && props.next !== undefined
//                     ? props.getPublishersList(props.limit, props.next)
//                     : //console.log(next);
//                   if (props.next != null && props.next !== undefined) {
//                     setStart((props.next - 1) * props.limit + 1);
//                     if (props.totalPages > 1 && props.next == 1)
//                       setLast(1 * props.limit);
//                     else if (props.next == props.totalPages) {
//                       let count = props.next * props.limit - props.total;
//                       setLast(props.next * props.limit - count);
//                     } else setLast(props.next * props.limit);
//                   }
//                 }}
//                 href="#"
//               >
//                 Next
//               </PaginationLink>
//             </PaginationItem>

//             {/* <PaginationItem>
//                         <PaginationLink last href="#" />
//                         </PaginationItem> */}
//           </Pagination>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PaginationName;
import React, { useState, useEffect } from "react";
import { API_URL ,logoutidle} from '../../AppConfig'

import { Container, Row, Col } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../Pagination/Pagination.css";
import { log } from "util";

const PaginationName = props => {
  const [num, setNum] = useState(props.num ? props.num : [1]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(2);
  // const [styles,setStyles]=useState("DefaultColor")
  const [start, setStart] = useState(0);
  const [last, setLast] = useState(0);
  const [entries, showEntries] = useState(props.totalPages);
  //console.log("total pages",props.totalPages);
  //console.log("totalentreise",entries);

  useEffect(() => {
    if (props.total > 0) setStart(1);
    else setStart(0);
    if (props.totalPages > 1) setLast(1 * props.limit);
    else setLast(props.total);
  }, [props.total, props.limit, props.totalPages]);
  useEffect(() => {
    setNum(props.num);
  }, [props.num]);
  //console.log("in pagination ", props.limit);
  const Called = ele => {
    props.getPublishersList(props.limit, ele);
    setStart((ele - 1) * props.limit + 1);

    // if (props.prev != null && props.prev !== undefined) {
    //   setStart((props.prev - 1) * props.limit + 1);
    //   if (props.totalPages > 1 && props.prev == 1) setLast(1 * props.limit);
    //   else if (props.prev == props.totalPages) {
    //     let count = props.prev * props.limit - props.total;
    //     setLast(props.prev * props.limit - count);
    //   } else setLast(props.prev * props.limit);
    // }
  };
  //console.log("props.currentPage", props.currentPage);

  return (
    <div>
      {props.totalPages > 0 && (
        <div>
          <Row>
            <Col lg={6} xl={6}>
              {props.currentPage == 1 && props.limit < props.total && (
                <p className="pagination_text">
                  Showing 1 to {props.limit} of {props.total} entries
                </p>
              )}
              {props.currentPage != 1 &&
                props.currentPage < props.total / props.limit && (
                  <p className="pagination_text">
                    Showing {props.prev * props.limit + 1} to{" "}
                    {props.limit * props.currentPage} of {props.total} entries
                  </p>
                )}
              {/* {props.currentPage != 1 &&
            limit>props.total && (
              <p>
                Showing {props.prev * props.limit + 1} to{" "}
                {props.total} of {props.total} entries
              </p>
            )} */}
              {props.next == null && (
                <p className="pagination_text">
                  Showing {props.prev * props.limit + 1} to {props.total} of{" "}
                  {props.total} entries
                </p>
              )}
              {/* <div className="pagination_text">
            <p>
              Showing {start} to {last} of {props.total} entries
            </p>
          </div> */}
            </Col>
            <Col lg={6} xl={6}>
              <Pagination
                aria-label="Page navigation example"
                style={{ float: "right" }}
              >
                {/* <PaginationItem disabled>
                        <PaginationLink first href="#" />
                        </PaginationItem> */}
                {props.prev != null && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        // ////console.log("prev",props.prev)

                        props.prev != null && props.prev !== undefined
                          ? props.getPublishersList(props.limit, props.prev)
                          : console.log(prev);
                      }}
                      href="#"
                    >
                      Previous
                    </PaginationLink>
                  </PaginationItem>
                )}
                {props.prev != null && props.currentPage - 2 != 0 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        Called(props.prev - 1);
                      }}
                      href="#"
                    >
                      {props.prev - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {props.prev != null && props.currentPage - 1 != 0 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        Called(props.prev);
                      }}
                      href="#"
                    >
                      {props.prev}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem active={true}>
                  <PaginationLink
                    onClick={() => {
                      Called(props.currentPage);
                    }}
                    href="#"
                  >
                    {props.currentPage}
                  </PaginationLink>
                </PaginationItem>

                {props.next != null && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        Called(props.next);
                      }}
                      href="#"
                    >
                      {props.next}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {props.next != null && props.total / props.limit > props.next && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        Called(props.next + 1);
                      }}
                      href="#"
                    >
                      {props.next + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* {num.map(ele => (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    props.getPublishersList(props.limit, ele);
                    setStart((ele - 1) * props.limit + 1);
                    if (props.totalPages > 1 && ele == 1)
                      setLast(1 * props.limit);
                    else if (ele == props.totalPages) {
                      let count = ele * props.limit - props.total;
                      setLast(ele * props.limit - count);
                    } else setLast(ele * props.limit);
                  }}
                  href="#"
                >
                  {ele}
                </PaginationLink>
              </PaginationItem>
            ))} */}
                {props.next != null && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        //////console.log("next",props.next)

                        props.next != null && props.next !== undefined
                          ? props.getPublishersList(props.limit, props.next)
                          : console.log(next);
                      }}
                      href="#"
                    >
                      Next
                    </PaginationLink>
                  </PaginationItem>
                )}
                {/* <PaginationItem>
                        <PaginationLink last href="#" />
                        </PaginationItem> */}
              </Pagination>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PaginationName;
